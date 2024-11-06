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
		-- Criação de Tabelas
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    UserRole VARCHAR(50) NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Rooms (
    RoomID SERIAL PRIMARY KEY,
    RoomName VARCHAR(255),
    CreatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE RoomMembers (
    RoomID INT,
    UserID INT,
    JoinedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (RoomID, UserID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Messages (
    MessageID SERIAL PRIMARY KEY,
    RoomID INT,
    SenderID INT,
    Content TEXT NOT NULL,
    SentAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID)
);


-- Criação de Função e Gatilho
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.UpdatedAt = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UpdateUsersModifiedTime
BEFORE UPDATE ON Users
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

	`)

	if err != nil {
		return fmt.Errorf("erro ao inicializar o banco de dados: %v", err)
	}

	log.Println("Banco de dados inicializado com sucesso")
	return nil
}
