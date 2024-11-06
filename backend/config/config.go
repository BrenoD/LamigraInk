package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/stripe/stripe-go/v72"
)

// InitStripe inicializa a chave do Stripe
func InitStripe() {
	// Tenta carregar o arquivo .env, mas não falha se não encontrar
	if err := godotenv.Load(); err != nil {
		log.Printf("Arquivo .env não encontrado, usando variáveis de ambiente do sistema")
	}

	// Inicialize a chave do Stripe
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	if stripe.Key == "" {
		log.Fatal("Chave do Stripe não foi configurada corretamente.")
	}
}

func CheckDBConnection() {
	if err := DB.Ping(); err != nil {
		log.Fatalf("Erro ao verificar a conexão com o banco de dados: %v", err)
	}
	log.Println("Conexão com o banco de dados bem-sucedida")
}

func InitializeDatabase() error {
	// Exemplo simples de inicialização de banco de dados, como criar tabelas
	// Aqui você pode adicionar suas tabelas ou outras inicializações do banco
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100),
			email VARCHAR(100) UNIQUE
		);
	`)

	if err != nil {
		return fmt.Errorf("erro ao inicializar o banco de dados: %v", err)
	}

	log.Println("Banco de dados inicializado com sucesso")
	return nil
}
