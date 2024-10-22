package services

import (
	"LaMigraInk/backend/models"
	"fmt"
	"net/smtp"
	"os"

)

func SendGiftCardEmail(request models.GiftcardRequest, code string) error {

	// Autenticação de email
	from := os.Getenv("EMAIL_SENDER")          // Remetente do email
	password := os.Getenv("EMAIL_APP_PASSWORD") // Senha de app (Google App Password)

	if from == "" || password == "" {
		return fmt.Errorf("As variáveis de ambiente EMAIL_SENDER ou EMAIL_APP_PASSWORD não estão definidas")
	}

	// Informações do servidor SMTP
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Destinatário
	to := request.Email

	// Assunto e corpo do email
	subject := "Seu Gift Card de R$%.2f da La MiGra Ink!"
	body := fmt.Sprintf(`
		Olá %s,

		Obrigado por escolher a La MiGra Ink! Estamos felizes em te enviar um gift card no valor de R$%.2f.

		Seu código de gift card é: %s

		Para utilizar seu gift card, basta aplicar este código no checkout ao fazer sua próxima compra.

		Aproveite!

		Atenciosamente,
		Equipe La MiGra Ink
	`, request.RecipientName, request.Value, code)

	// Mensagem formatada para envio
	message := fmt.Sprintf("Subject: %s\n\n%s", fmt.Sprintf(subject, request.Value), body)

	// Configuração de autenticação
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Envio do email
	err := smtp.SendMail(
		smtpHost+":"+smtpPort,
		auth,
		from,
		[]string{to},
		[]byte(message),
	)
	if err != nil {
		return fmt.Errorf("Erro ao enviar email: %v", err)
	}

	return nil
}