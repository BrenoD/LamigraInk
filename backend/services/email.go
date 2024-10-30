package services

import (
	"LaMigraInk/backend/models"
	"fmt"
	"net/smtp"
	"os"
)

func SendGiftCardEmail(request models.GiftcardRequest, code string) error {
	// Email authentication
	from := os.Getenv("EMAIL_SENDER")          // Email sender
	password := os.Getenv("EMAIL_APP_PASSWORD") // App password (Google App Password)

	if from == "" || password == "" {
		return fmt.Errorf("Environment variables EMAIL_SENDER or EMAIL_APP_PASSWORD are not set")
	}

	// SMTP server information
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Recipient
	to := request.Email

	// Subject and email body
	subject := "Your La MiGra Ink Gift Card worth £%.2f!"
	body := fmt.Sprintf(`
		Hello %s,

		Thank you for choosing La MiGra Ink! We're happy to send you a gift card worth £%.2f.

		Your gift card code is: %s

		To use your gift card, simply apply this code at checkout when making your next purchase.

		Enjoy!

		Best regards,
		La MiGra Ink Team
	`, request.RecipientName, request.Value, code)

	// Formatted message for sending
	message := fmt.Sprintf("Subject: %s\n\n%s", fmt.Sprintf(subject, request.Value), body)

	// Authentication configuration
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Send email
	err := smtp.SendMail(
		smtpHost+":"+smtpPort,
		auth,
		from,
		[]string{to},
		[]byte(message),
	)
	if err != nil {
		return fmt.Errorf("Error sending email: %v", err)
	}

	return nil
}