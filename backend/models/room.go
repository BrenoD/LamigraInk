package models

// Estrutura que representa uma sala de chat
type Room struct {
    RoomID   int    `json:"roomId"`
    RoomName string `json:"roomName"`
    IsActive bool   `json:"isActive"`
}
