package services

import (
	"LaMigraInk/backend/config"
	"LaMigraInk/backend/models"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

func CreateNewGiftCard(value float32) (string, error) {
	query := "INSERT INTO giftcards (code, value, status) VALUES ($1, $2, $3)"

	code := uuid.NewString()
	status := "active"

	_, err := config.DB.Exec(query, code, value, status)
	return code, err
}

func UseGiftCard(code string) (float32, error) {
    var value float32

    query := "SELECT value FROM giftcards WHERE code = $1 AND status = 'active'"
    err := config.DB.QueryRow(query, code).Scan(&value)
    if err != nil {
        if err == sql.ErrNoRows {
            return 0, fmt.Errorf("gift card not found or inactive")
        }
        return 0, fmt.Errorf("error querying gift card: %v", err)
    }

    // Deactivates the gift card after using it
    if err := disableGiftCard(code); err != nil {
        return 0, fmt.Errorf("failed to disable gift card: %v", err)
    }

    return value, nil
}

func disableGiftCard(code string) error {
	query := "UPDATE giftcards SET status = 'disabled' WHERE code = $1;"

	_, err := config.DB.Exec(query, code)
	if err != nil {
		return fmt.Errorf("error disabling gift card: %v", err)
	}
	return nil
}

func ProcessGiftCardCreationAndSendEmail(request models.GiftcardRequest) error {
	code, err := CreateNewGiftCard(request.Value)
	if err != nil {
		return fmt.Errorf("Error creating gift card: %v", err)
	}

	giftcard := models.Giftcard{
		Code:           code,
		CustomerName:   request.RecipientName,  // Adicionando o nome do destinatário
		Value:          request.Value,
		Status:         "active",
	}

	err = SendGiftCardEmail(request, giftcard.Code)  // Envia o gift card por e-mail
	if err != nil {
		return fmt.Errorf("Error sending gift card via email: %v", err)
	}

	return nil
}

func ListGiftCards(offset int, limit int) ([]models.Giftcard, error) {
	query := `
		SELECT customer_name, value, code, status
		FROM giftcards
		ORDER BY created_at DESC
		OFFSET $1 LIMIT $2;
	`

	rows, err := config.DB.Query(query, offset, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var giftCards []models.Giftcard
	for rows.Next() {
		var gc models.Giftcard
		if err := rows.Scan(&gc.CustomerName, &gc.Value, &gc.Code, &gc.Status); err != nil {
			return nil, err
		}
		giftCards = append(giftCards, gc)
	}
	return giftCards, nil
}