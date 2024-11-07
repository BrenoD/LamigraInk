"use client";

import { useState, useEffect } from 'react';
import "./Dashboard.css";
import ChatPopup from '../components/ChatPopup';

interface Chat {
  roomId: string;
  startTime: string;
}

interface GiftCard {
  id: string;
  customer_name: string;
  value: number;
  code: string;
  status: string;
}

// Função para gerar um horário aleatório dentro de um intervalo
const getRandomTime = () => {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 60); // Gera minutos aleatórios
  now.setMinutes(now.getMinutes() - randomMinutes);
  return now.toISOString(); // Retorna um timestamp único
};

const Dashboard = () => {
  const [activeChats, setActiveChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch active chats
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_WS_PROD}/active-chats`)
      .then((res) => res.json())
      .then((data) => {
        const chats = Array.isArray(data) ? data.map((id: string) => ({
          roomId: id,
          startTime: getRandomTime()
        })) : [];
        setActiveChats(chats);
      })
      .catch((error) => console.error("Error fetching active chats:", error));
  }, []);

  useEffect(() => {
    fetchGiftCards(currentPage);
  }, [currentPage]);

  const fetchGiftCards = (page: number) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/gift-cards?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setGiftCards(Array.isArray(data) ? data : []); // Verifica se é um array
      })
      .catch((error) => console.error("Error fetching gift cards:", error));
  };

  const formatChatTime = (isoString: string) => {
    const chatDate = new Date(isoString);
    const now = new Date();
    
    const isToday = chatDate.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === chatDate.toDateString();

    const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(chatDate);

    const date = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(chatDate);

    if (isToday) {
      return `Today, ${time}`;
    } else if (isYesterday) {
      return `Yesterday, ${time}`;
    } else {
      return `${date}, ${time}`;
    }
  };

  // Função comum para usar o gift card
  const useGiftCard = (code: string) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/useGiftCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchGiftCards(currentPage); // Atualiza a lista de gift cards após o uso
      })
      .catch((error) => console.error("Error using gift card:", error));
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Cancelled":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      case "Paid (not verified)":
        return "text-green-500";
      case "Paid (verified)":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Attendant Dashboard</h1>

      <div className="flex flex-col lg:flex-row flex-grow space-y-6 lg:space-y-0 lg:space-x-6 h-full">
        {/* Active Chats Section */}
        <div className="w-full lg:w-1/2 bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Active Chats</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-grow">
            {activeChats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {activeChats.map((chat) => (
                  <button
                    key={chat.roomId}
                    onClick={() => setSelectedChat(chat.roomId)}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <span className="block text-lg font-medium">{`Chat: ${chat.roomId}`}</span>
                    <span className="block text-sm text-gray-300">{`Time: ${formatChatTime(chat.startTime)}`}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">No active chats at the moment.</p>
            )}
          </div>
        </div>

        {/* Gift Cards Section */}
        <div className="w-full lg:w-1/2 bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Gift Cards</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-grow">
            {giftCards.length > 0 ? (
              giftCards.map((gc) => (
                <div key={gc.id} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>Customer:</strong> {gc.customer_name}</p>
                      <p><strong>Value:</strong> ${gc.value}</p>
                      <p><strong>Code:</strong> {gc.code}</p>
                      <p className="text-sm">Status: <span className={getStatusTextColor(gc.status)}>{gc.status}</span></p>
                    </div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-400 transition duration-300"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      onClick={() => useGiftCard(gc.code)}
                    >
                      Use Gift Card
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No gift cards available.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-400"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage((prev) => prev + 1)} 
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedChat && (
        <div className="fixed z-50 bottom-20 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 transform hover:scale-105 transition duration-300">
          <ChatPopup roomId={selectedChat} userType="attendant" onClose={() => setSelectedChat(null)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
