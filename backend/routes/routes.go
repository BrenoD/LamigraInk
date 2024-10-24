package routes

import (
	"LaMigraInk/backend/handlers" // Ajuste conforme seu módulo
	"encoding/json"
	"net/http"
)

// Função para buscar chats ativos
func getActiveChats(w http.ResponseWriter, r *http.Request) {
	activeChatList := []string{}
	for roomID := range handlers.ActiveChats {
		activeChatList = append(activeChatList, roomID)
	}
	json.NewEncoder(w).Encode(activeChatList)
}

// SetupRoutes configura as rotas da aplicação
func SetupRoutes() {
	http.HandleFunc("/ws", handlers.HandleConnections)    // Rota para WebSocket
	http.HandleFunc("/active-chats", getActiveChats) // Rota para listar chats ativos
}
