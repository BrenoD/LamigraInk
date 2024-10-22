package services

import (
	"database/sql"
	"log"
	"time"
)

type Message struct {
	MessageID int
	RoomID    int
	SenderID  int
	Content   string
	SentAt    time.Time
}

// Função para salvar mensagem no banco de dados
func SaveMessage(db *sql.DB, roomID, senderID int, content string) error {
	_, err := db.Exec(`
		INSERT INTO Messages (RoomID, SenderID, Content) 
		VALUES ($1, $2, $3)`, roomID, senderID, content)

	if err != nil {
		log.Println("Erro ao salvar mensagem:", err)
		return err
	}

	return nil
}

// Função para buscar mensagens por sala
func GetMessagesByRoom(db *sql.DB, roomID int) ([]Message, error) {
	rows, err := db.Query(`
		SELECT MessageID, RoomID, SenderID, Content, SentAt 
		FROM Messages WHERE RoomID = $1 ORDER BY SentAt ASC`, roomID)

	if err != nil {
		log.Println("Erro ao buscar mensagens:", err)
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var msg Message
		err := rows.Scan(&msg.MessageID, &msg.RoomID, &msg.SenderID, &msg.Content, &msg.SentAt)
		if err != nil {
			log.Println("Erro ao ler mensagem:", err)
			continue
		}
		messages = append(messages, msg)
	}
	return messages, nil
}
