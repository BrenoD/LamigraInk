package main

import (
	"LaMigraInk/backend/config"
	"LaMigraInk/backend/handlers"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Initialize Stripe key
	config.InitStripe()

	// Open database connection
	if err := config.OpenConn(); err != nil {
		log.Fatalf("Error opening database connection: %v", err)
	}
	defer func() {
		if err := config.CloseConn(); err != nil {
			log.Printf("Error closing database connection: %v", err)
		}
	}()

	// Initialize database (create tables if they don't exist)
	if err := config.InitializeDatabase(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize Gin router
	router := gin.Default()

	// Configure CORS to allow requests from other domains
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Allow only local frontend
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}

	router.Use(cors.New(config))

	// Gift card routes
	router.POST("/gift-card", handlers.ProcessGiftCardCreationAndSendEmailHandler)
	// router.POST("/use-giftcard", handlers.UseGiftCardHandler)

	// Route to create Payment Intent in Stripe
	router.POST("/create-payment-intent", handlers.CreatePaymentIntentHandler)

	// WebSocket route for /ws
	router.GET("/ws", func(c *gin.Context) {
		handlers.HandleConnections(c.Writer, c.Request) // Call WebSocket handler
	})

	// Route to list active chats (GET)
	router.GET("/active-chats", func(c *gin.Context) {
		activeChatList := []string{}
		for roomID := range handlers.ActiveChats {
			activeChatList = append(activeChatList, roomID)
		}
		c.JSON(200, activeChatList)
	})

	// Route to register active chats (POST)
	router.POST("/active-chats", func(c *gin.Context) {
		var request struct {
			RoomID string `json:"roomId"`
		}
		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		handlers.RegisterActiveChat(request.RoomID)
		c.JSON(200, gin.H{"status": "Chat registered as active"})
	})

	// Start server on port 8080
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
