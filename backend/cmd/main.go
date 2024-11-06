package main

import (
	"LaMigraInk/backend/config"
	"LaMigraInk/backend/handlers"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode
	if os.Getenv("RAILWAY_ENVIRONMENT") != "" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize Stripe key
	config.InitStripe()

	// Log environment variables (sem valores sensíveis)
	log.Printf("Environment: %s", os.Getenv("RAILWAY_ENVIRONMENT"))
	log.Printf("Database URL exists: %v", os.Getenv("DATABASE_URL") != "")
	log.Printf("Database Host: %s", os.Getenv("PGHOST"))
	log.Printf("Database Port: %s", os.Getenv("PGPORT"))
	log.Printf("Database Name: %s", os.Getenv("PGDATABASE"))
	log.Printf("Using SSL Mode: %v", os.Getenv("RAILWAY_ENVIRONMENT") != "")

	// Open database connection
	if err := config.OpenConn(); err != nil {
		log.Fatalf("Error opening database connection: %v", err)
	}

	// Adicione o check de conexão
	config.CheckDBConnection()

	defer config.CloseConn()

	// Initialize database
	if err := config.InitializeDatabase(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	router := gin.Default()

	// Configure CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{
		"https://lamigra-ink.vercel.app",
		"http://localhost:3000",
	}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"X-Requested-With",
	}
	corsConfig.AllowCredentials = true
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.MaxAge = 12 * 60 * 60 // 12 horas em segundos

	router.Use(cors.New(corsConfig))

	// Middleware personalizado para adicionar headers CORS em todas as respostas
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "https://lamigra-ink.vercel.app")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Requested-With")
		c.Header("Access-Control-Allow-Credentials", "true")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		
		c.Next()
	})

	// Routes
	router.POST("/gift-card", handlers.ProcessGiftCardCreationAndSendEmailHandler)
	router.POST("/create-payment-intent", handlers.CreatePaymentIntentHandler)
	router.GET("/ws", func(c *gin.Context) {
		handlers.HandleConnections(c.Writer, c.Request)
	})

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	// Get port from environment variable
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
