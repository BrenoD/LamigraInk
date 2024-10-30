// package handlers

// import (
// 	"LaMigraInk/backend/models"
// 	"LaMigraInk/backend/services"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// )

// func CreateNewGiftCardHandler(c *gin.Context){
// 	var json  models.Giftcard
// 	if err := c.ShouldBindJSON(&json); err != nil {
//         c.JSON(400, gin.H{"error": err.Error()})
//         return
//     }

// 	code, err := services.CreateNewGiftCard(json.Value)
// 	if err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	json.Code = code

// 	c.JSON(http.StatusOK, gin.H{
// 		"giftcard_Code": json.Code,
// 	})
// }

//

// func UseGiftCardHandler(c *gin.Context) {
// 	// Estrutura para receber o JSON de entrada (com o código do giftcard)
// 	var request struct {
// 		Code string `json:"code" binding:"required"`
// 	}

// 	// Tenta vincular o JSON do corpo da requisição ao request
// 	if err := c.ShouldBindJSON(&request); err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Chama o serviço para usar o gift card
// 	value, err := services.UseGiftCard(request.Code)
// 	if err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

//		// Retorna o valor do gift card e uma mensagem de sucesso
//		c.JSON(http.StatusOK, gin.H{
//			"value": value,
//			"message": "Gift card successfully used",
//		})
//	}
package handlers

import (
	"LaMigraInk/backend/models"
	"LaMigraInk/backend/services"
	// "encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/paymentintent"
)

// Novo handler para criar um Payment Intent no Stripe
func CreatePaymentIntentHandler(c *gin.Context) {
	var request models.GiftcardRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Definir parâmetros para o PaymentIntent
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(request.Value * 100)), // Converte o valor do giftcard em centavos
		Currency: stripe.String("usd"),
	}

	// Cria o PaymentIntent no Stripe
	intent, err := paymentintent.New(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating payment intent: %v", err)})
		return
	}

	// Retorna o client_secret ao frontend para confirmação de pagamento
	c.JSON(http.StatusOK, gin.H{"client_secret": intent.ClientSecret})
}

func ProcessGiftCardCreationAndSendEmailHandler(c *gin.Context){

	var request models.GiftcardRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := services.ProcessGiftCardCreationAndSendEmail(request)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Gift card successfully sended!",
	})
}
