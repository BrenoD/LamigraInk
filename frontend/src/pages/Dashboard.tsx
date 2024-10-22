// pages/dashboard.tsx
"use client";

import { useEffect, useState } from 'react';
import "./Dashboard.css"
import ChatPopup from '../components/ChatPopup';

interface Chat {
  roomId: number;
  attendantId: number; // ID do atendente
}

const Dashboard = () => {
  const [activeChats, setActiveChats] = useState<Chat[]>([]); // Adicionando tipo para activeChats
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Permitindo que selectedChat seja nulo
  const [showChatPopup, setShowChatPopup] = useState<boolean>(false); // Adicionando tipo para showChatPopup
  const [socket, setSocket] = useState<WebSocket | null>(null); // Permitindo que socket seja nulo

  useEffect(() => {
    // Conectar ao WebSocket
    const ws = new WebSocket('ws://localhost:8080/ws');
    setSocket(ws);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // Adicione a lógica para atualizar os chats ativos conforme necessário
      // Exemplo: setActiveChats((prev) => [...prev, msg]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleChatClick = (chat: Chat) => { // Adicionando tipo para chat
    setSelectedChat(chat);
    setShowChatPopup(true);
  };

  const closeChatPopup = () => {
    setShowChatPopup(false);
    setSelectedChat(null);
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Atendente</h1>
      <h2 className="text-xl font-semibold mb-2">Chats Ativos</h2>
      <ul>
        {activeChats.map((chat) => (
          <li key={chat.roomId} className="mb-2">
            <button
              onClick={() => handleChatClick(chat)}
              className="bg-gray-800 p-2 rounded hover:bg-gray-700"
            >
              Chat {chat.roomId}
            </button>
          </li>
        ))}
      </ul>

      {showChatPopup && (
        <ChatPopup chat={selectedChat} onClose={closeChatPopup} />
      )}
    </div>
  );
};

export default Dashboard;
