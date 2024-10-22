package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // Importa o driver PostgreSQL
)

var DB *sql.DB

// Função para abrir a conexão com o banco de dados
func OpenConn() error {
    // Carrega as variáveis do arquivo .env
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Erro ao carregar o arquivo .env: %v", err)
    }

    // Obtém os valores das variáveis de ambiente
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    

    // Cria a string de conexão
    connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        dbHost, dbPort, dbUser, dbPassword, dbName)

    // Abre a conexão com o banco de dados
    DB, err = sql.Open("postgres", connStr)
    if err != nil {
        return err
    }

    // Verifica se a conexão foi bem-sucedida
    return DB.Ping()
}

// Função para fechar a conexão
func CloseConn() error {
    if DB != nil {
        return DB.Close()
    }
    return nil
}
