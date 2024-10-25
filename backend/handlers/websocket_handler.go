package handlers

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

type Room struct {
	Client    *websocket.Conn
	Attendant *websocket.Conn
}

type Message struct {
	RoomID   string `json:"roomId"`
	SenderID int    `json:"senderId"`
	Content  string `json:"content"`
}

var rooms = make(map[string]*Room)
var ActiveChats = make(map[string]bool) // Agora ActiveChats é exportado (público)
var roomMutex sync.Mutex

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// RegisterActiveChat registra um chat como ativo
func RegisterActiveChat(roomID string) {
	roomMutex.Lock()
	defer roomMutex.Unlock()
	ActiveChats[roomID] = true
}

// HandleConnections gerencia novas conexões WebSocket
func HandleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("WebSocket Upgrade Error:", err)
	}
	defer ws.Close()

	userType := r.URL.Query().Get("type")
	roomID := r.URL.Query().Get("room")
	if roomID == "" {
		log.Println("Room ID is required")
		return
	}

	roomMutex.Lock()
	room, exists := rooms[roomID]
	if !exists {
		room = &Room{}
		rooms[roomID] = room
	}
	roomMutex.Unlock()

	if userType == "client" {
		room.Client = ws
		RegisterActiveChat(roomID) // Registra o chat como ativo
	} else if userType == "attendant" {
		room.Attendant = ws
	} else {
		log.Println("Invalid user type")
		return
	}

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			roomMutex.Lock()
			if room.Client == ws {
				room.Client = nil
			} else if room.Attendant == ws {
				room.Attendant = nil
			}
			roomMutex.Unlock()
			break
		}

		roomMutex.Lock()
		if room.Client != nil && room.Attendant != nil {
			if ws == room.Client {
				err = room.Attendant.WriteJSON(msg) // Cliente envia mensagem ao atendente
			} else if ws == room.Attendant {
				err = room.Client.WriteJSON(msg) // Atendente envia mensagem ao cliente
			}
		}
		roomMutex.Unlock()

		if err != nil {
			log.Printf("error: %v", err)
			break
		}
	}
}
