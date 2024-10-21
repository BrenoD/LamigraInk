package main

import (
    "LaMigraInk/backend/config"  // Altere para o caminho correto do seu módulo
    "LaMigraInk/backend/handlers" // Altere para o caminho correto do seu módulo
    "github.com/gin-gonic/gin"
    "log"
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

    // Define a rota para criar gift cards
    router.POST("/giftcard", handlers.CreateNewGiftCardHandler)

    router.POST("/use-giftcard", handlers.UseGiftCardHandler)


    // Inicia o servidor na porta 8080
    if err := router.Run(":8080"); err != nil {
        log.Fatalf("Falha ao iniciar o servidor: %v", err)
    }
}
