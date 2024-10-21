package config

import (
    "database/sql"

    _ "github.com/lib/pq" // Importa o driver PostgreSQL
)

var DB *sql.DB

// Função para abrir a conexão com o banco de dados
func OpenConn() error {
    var err error
    DB, err = sql.Open("postgres", "host=localhost port=5432 user=postgres password=d4vi1234) dbname=LaMiGraInk sslmode=disable")
    if err != nil {
        return err
    }
    return DB.Ping()
}

// Função para fechar a conexão
func CloseConn() error {
    if DB != nil {
        return DB.Close()
    }
    return nil
}
