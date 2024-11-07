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
	// Primeiro, drop todas as tabelas existentes
	dropTables := []string{
		`DROP TABLE IF EXISTS messages CASCADE;`,
		`DROP TABLE IF EXISTS room_members CASCADE;`,
		`DROP TABLE IF EXISTS rooms CASCADE;`,
		`DROP TABLE IF EXISTS users CASCADE;`,
		`DROP TABLE IF EXISTS giftcards CASCADE;`,
	}

	// Executa os drops
	for _, drop := range dropTables {
		if _, err := DB.Exec(drop); err != nil {
			return fmt.Errorf("erro ao executar drop table: %v", err)
		}
	}

	// Defina as instruções SQL para criar as tabelas na ordem correta
	tables := []string{
		// 1. Primeiro cria users (sem dependências)
		`
		CREATE TABLE IF NOT EXISTS users (
			user_id SERIAL PRIMARY KEY,
			username VARCHAR(255) NOT NULL,
			password_hash VARCHAR(255) NOT NULL,
			user_role VARCHAR(50) NOT NULL,
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`,
		// 2. Depois cria rooms (sem dependências)
		`
		CREATE TABLE IF NOT EXISTS rooms (
			room_id SERIAL PRIMARY KEY,
			room_name VARCHAR(255),
				created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			is_active BOOLEAN DEFAULT TRUE
		);
		`,
		// 3. Cria room_members (depende de users e rooms)
		`
		CREATE TABLE IF NOT EXISTS room_members (
			room_id INT REFERENCES rooms(room_id),
			user_id INT REFERENCES users(user_id),
			joined_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (room_id, user_id)
		);
		`,
		// 4. Cria messages (depende de users e rooms)
		`
		CREATE TABLE IF NOT EXISTS messages (
			message_id SERIAL PRIMARY KEY,
			room_id INT REFERENCES rooms(room_id),
			sender_id INT REFERENCES users(user_id),
			content TEXT NOT NULL,
			sent_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`,
		// 5. Cria giftcards (sem dependências)
		`
		CREATE TABLE IF NOT EXISTS giftcards (
			id SERIAL PRIMARY KEY,
			code VARCHAR(255) NOT NULL UNIQUE,
			value DECIMAL(10,2) NOT NULL,
			status VARCHAR(50) NOT NULL DEFAULT 'active',
			customer_name VARCHAR(255) NOT NULL,  -- Novo campo para nome do cliente
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`,
		// 6. Cria a função para atualizar o timestamp
		`
		CREATE OR REPLACE FUNCTION update_modified_column()
		RETURNS TRIGGER AS $$
		BEGIN
			NEW.updated_at = NOW();
			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		`,
		// 7. Cria os triggers
		`
		DROP TRIGGER IF EXISTS update_users_modified_time ON users;
		CREATE TRIGGER update_users_modified_time
		BEFORE UPDATE ON users
		FOR EACH ROW
		EXECUTE PROCEDURE update_modified_column();
		`,
		`
		DROP TRIGGER IF EXISTS update_giftcards_modified_time ON giftcards;
		CREATE TRIGGER update_giftcards_modified_time
		BEFORE UPDATE ON giftcards
		FOR EACH ROW
		EXECUTE PROCEDURE update_modified_column();
		`,
	}

	// Executa cada instrução SQL separadamente
	for _, table := range tables {
		if _, err := DB.Exec(table); err != nil {
			return fmt.Errorf("erro ao executar a instrução SQL: %v", err)
		}
	}

	log.Println("Banco de dados inicializado com sucesso")
	return nil
}
