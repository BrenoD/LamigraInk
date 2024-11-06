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
	// Defina as instruções SQL para criar as tabelas e gatilhos individualmente
	tables := []string{
		`
		CREATE TABLE IF NOT EXISTS Users (
			user_id SERIAL PRIMARY KEY,
			username VARCHAR(255) NOT NULL,
			password_hash VARCHAR(255) NOT NULL,
			user_role VARCHAR(50) NOT NULL,
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS Rooms (
			room_id SERIAL PRIMARY KEY,
			room_name VARCHAR(255),
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			is_active BOOLEAN DEFAULT TRUE
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS RoomMembers (
			room_id INT,
			user_id INT,
			joined_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (room_id, user_id),
			FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
			FOREIGN KEY (user_id) REFERENCES Users(user_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS Messages (
			message_id SERIAL PRIMARY KEY,
			room_id INT,
			sender_id INT,
			content TEXT NOT NULL,
			sent_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
			FOREIGN KEY (sender_id) REFERENCES Users(user_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS giftcards (
			id SERIAL PRIMARY KEY,
			code VARCHAR(255) NOT NULL UNIQUE,
			value DECIMAL(10,2) NOT NULL,
			status VARCHAR(50) NOT NULL DEFAULT 'active',
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE OR REPLACE FUNCTION update_modified_column()
		RETURNS TRIGGER AS $$
		BEGIN
				NEW.updated_at = NOW();
				RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		`,
		`
		DROP TRIGGER IF EXISTS update_users_modified_time ON Users;
		CREATE TRIGGER update_users_modified_time
		BEFORE UPDATE ON Users
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
