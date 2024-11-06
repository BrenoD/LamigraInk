package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

var DB *sql.DB

// getDBConnection retorna a string de conexão do banco de dados
func getDBConnection() string {
	// Tenta usar a DATABASE_URL do Railway diretamente
	if dbURL := os.Getenv("DATABASE_URL"); dbURL != "" {
		log.Printf("Usando DATABASE_URL do Railway")
		return dbURL
	}

	// Caso DATABASE_URL não esteja configurada, tenta usar variáveis individuais
	dbHost := getEnvWithFallback("DB_HOST", "localhost")
	dbPort := getEnvWithFallback("DB_PORT", "5432")
	dbUser := getEnvWithFallback("DB_USER", "postgres")
	dbPassword := getEnvWithFallback("DB_PASSWORD", "")
	dbName := getEnvWithFallback("DB_NAME", "LaMiGraInk")

	// Configura SSL mode para produção (Railway) ou desenvolvimento
	sslMode := "require"
	if os.Getenv("RAILWAY_ENVIRONMENT") != "production" {
		sslMode = "disable"
	}

	// String de conexão
	connStr := fmt.Sprintf(
		"postgresql://%s:%s@%s:%s/%s?sslmode=%s",
		dbUser, dbPassword, dbHost, dbPort, dbName, sslMode,
	)

	log.Printf("Tentando conectar ao banco de dados em %s:%s (database: %s)", dbHost, dbPort, dbName)
	return connStr
}

// getEnvWithFallback retorna o valor da variável de ambiente com fallback
func getEnvWithFallback(key1, defaultValue string) string {
	if value := os.Getenv(key1); value != "" {
		return value
	}
	return defaultValue
}

// OpenConn tenta estabelecer uma conexão com o banco de dados
func OpenConn() error {
	var err error
	maxRetries := 5
	
	for i := 0; i < maxRetries; i++ {
		connStr := getDBConnection()
		DB, err = sql.Open("postgres", connStr)
		if err == nil {
			DB.SetMaxOpenConns(25)
			DB.SetMaxIdleConns(5)
			DB.SetConnMaxLifetime(5 * time.Minute)
			
			if err = DB.Ping(); err == nil {
				log.Printf("Conexão com banco estabelecida com sucesso")
				return nil
			}
		}
		log.Printf("Tentativa %d de %d falhou. Erro: %v", i+1, maxRetries, err)
		time.Sleep(time.Second * 5)
	}
	return fmt.Errorf("falha ao conectar ao banco após %d tentativas: %v", maxRetries, err)
}

// CloseConn fecha a conexão com o banco de dados
func CloseConn() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
