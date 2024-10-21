package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
    // Cria uma nova instância do Gin
    router := gin.Default()

    // Inicia o servidor na porta 8080
    if err := router.Run(":8080"); err != nil {
        log.Fatalf("Falha ao iniciar o servidor: %v", err)
    }
}


