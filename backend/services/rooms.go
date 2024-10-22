package services

import (
	"database/sql"
	"log"
	"LaMigraInk/backend/models" // Altere para o caminho correto do seu módulo
)

// Função para criar uma nova sala de chat
func CreateRoom(db *sql.DB, roomName string) (int, error) {
	var roomID int
	err := db.QueryRow(`
		INSERT INTO Rooms (RoomName) 
		VALUES ($1) RETURNING RoomID`, roomName).Scan(&roomID)

	if err != nil {
		log.Println("Erro ao criar sala:", err)
		return 0, err
	}

	return roomID, nil
}

// Função para buscar todas as salas ativas
func GetActiveRooms(db *sql.DB) ([]models.Room, error) {
	rows, err := db.Query("SELECT RoomID, RoomName FROM Rooms WHERE IsActive = TRUE")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rooms []models.Room
	for rows.Next() {
		var room models.Room
		err := rows.Scan(&room.RoomID, &room.RoomName)
		if err != nil {
			log.Println("Erro ao buscar salas:", err)
			continue
		}
		rooms = append(rooms, room)
	}
	return rooms, nil
}
