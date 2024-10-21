package handlers

import (
	"LaMigraInk/backend/models"
	"LaMigraInk/backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateNewGiftCardHandler(c *gin.Context){
	var json  models.Giftcard
	if err := c.ShouldBindJSON(&json); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

	code, err := services.CreateNewGiftCard(json.Value)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	json.Code = code 


	c.JSON(http.StatusOK, gin.H{
		"giftcard_Code": json.Code,
	})
}

func UseGiftCardHandler(c *gin.Context) {
	// Estrutura para receber o JSON de entrada (com o código do giftcard)
	var request struct {
		Code string `json:"code" binding:"required"`
	}

	// Tenta vincular o JSON do corpo da requisição ao request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Chama o serviço para usar o gift card
	value, err := services.UseGiftCard(request.Code)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Retorna o valor do gift card e uma mensagem de sucesso
	c.JSON(http.StatusOK, gin.H{
		"value": value,
		"message": "Gift card successfully used",
	})
}
