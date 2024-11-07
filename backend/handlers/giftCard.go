package handlers

import (
	"LaMigraInk/backend/models"
	"LaMigraInk/backend/services"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/paymentintent"
)

// Handler para criar um novo gift card
func CreateNewGiftCardHandler(c *gin.Context) {
	var request models.GiftcardRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Cria o gift card no serviço
	code, err := services.CreateNewGiftCard(request.Value)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating gift card: %v", err)})
		return
	}

	// Retorna o código do gift card criado
	c.JSON(http.StatusOK, gin.H{
		"giftcard_Code": code,
	})
}

func ListGiftCardsHandler(c *gin.Context) {
	// Parse o número da página a partir dos parâmetros de consulta
	pageStr := c.Query("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1 // Define a página padrão como 1, caso seja inválida
	}

	// Define o número de itens por página
	const pageSize = 10
	offset := (page - 1) * pageSize

	// Chama o serviço para obter os gift cards
	giftCards, err := services.ListGiftCards(offset, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch gift cards"})
		return
	}

	c.JSON(http.StatusOK, giftCards)
}

// Handler para criar um Payment Intent no Stripe
func CreatePaymentIntentHandler(c *gin.Context) {
	var request models.GiftcardRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(request.Value * 100)),
		Currency: stripe.String("gbp"),
	}

	// Adiciona o artista como metadado
	params.AddMetadata("artist", request.Artist)

	intent, err := paymentintent.New(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating payment intent: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"client_secret": intent.ClientSecret})
}


// Handler para processar a criação do gift card e envio de email
func ProcessGiftCardCreationAndSendEmailHandler(c *gin.Context) {
	var request models.GiftcardRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := services.ProcessGiftCardCreationAndSendEmail(request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error sending gift card via email: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Gift card successfully sent!",
	})
}
