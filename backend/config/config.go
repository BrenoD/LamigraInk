package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/stripe/stripe-go/v72"
)

var DB *sql.DB

// Função para inicializar a chave do Stripe
func InitStripe() {
	// Carrega o arquivo .env
	err := godotenv.Load() // Isso precisa ser chamado antes de acessar as variáveis de ambiente
	if err != nil {
		log.Fatalf("Erro ao carregar o arquivo .env: %v", err)
	}

	// Inicialize a chave do Stripe
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	if stripe.Key == "" {
		log.Fatal("Chave do Stripe não foi configurada corretamente.")
	}
}

// Função para abrir a conexão com o banco de dados
func OpenConn() error {
	// Carrega as variáveis de ambiente novamente
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar o arquivo .env: %v", err)
	}

	// Obter os valores das variáveis de ambiente
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	// Cria a string de conexão
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)

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