package handlers

import (
	"net/http"
	"github.com/gorilla/websocket"
	"log"
	"time"
)

// Upgrader para atualizar a conexão HTTP para WebSocket
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Estrutura da mensagem
type Message struct {
	RoomID  int    `json:"roomId"`
	SenderID int    `json:"senderId"`
	Content string `json:"content"`
	SentAt  time.Time `json:"sentAt"`
}

// Mapa para gerenciar as salas e conexões
var rooms = make(map[int][]*websocket.Conn)

// WebSocket handler para iniciar a conexão
func ChatHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Erro ao atualizar para WebSocket:", err)
		return
	}
	defer conn.Close()

	var msg Message
	for {
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println("Erro ao ler a mensagem:", err)
			break
		}

		// Adiciona a conexão à sala correspondente
		rooms[msg.RoomID] = append(rooms[msg.RoomID], conn)
		broadcastMessage(msg)
	}
}

// Função para enviar a mensagem para todos na sala
func broadcastMessage(msg Message) {
	connections := rooms[msg.RoomID]
	for _, conn := range connections {
		err := conn.WriteJSON(msg)
		if err != nil {
			log.Println("Erro ao enviar mensagem:", err)
			conn.Close()
		}
	}
}
