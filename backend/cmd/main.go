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
    // Abre a conexão com o banco de dados
    if err := config.OpenConn(); err != nil {
        log.Fatalf("Erro ao abrir a conexão com o banco de dados: %v", err)
    }
    defer func() {
        if err := config.CloseConn(); err != nil {
            log.Printf("Erro ao fechar a conexão com o banco de dados: %v", err)
        }
    }()

    // Inicializa o router do Gin
    router := gin.Default()

    // Configura o CORS para permitir requisições de outros domínios
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"} // Permite apenas o frontend local
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}

    router.Use(cors.New(config))

    // Rotas para gift cards (já existentes no seu projeto)
    router.POST("/giftcard", handlers.ProcessGiftCardCreationAndSendEmailHandler)
    router.POST("/use-giftcard", handlers.UseGiftCardHandler)

    // Rota WebSocket para /ws
    router.GET("/ws", func(c *gin.Context) {
        handlers.HandleConnections(c.Writer, c.Request) // Chama o handler do WebSocket
    })

    // Rota para listar chats ativos (GET)
    router.GET("/active-chats", func(c *gin.Context) {
        activeChatList := []string{}
        for roomID := range handlers.ActiveChats {
            activeChatList = append(activeChatList, roomID)
        }
        c.JSON(200, activeChatList)
    })

    // Rota para registrar chats ativos (POST)
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

    // Inicia o servidor na porta 8080
    if err := router.Run(":8080"); err != nil {
        log.Fatalf("Falha ao iniciar o servidor: %v", err)
    }
}
