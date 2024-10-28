"use client";

import { useState, useEffect } from 'react';
import "./Dashboard.css";
import ChatPopup from '../components/ChatPopup';

interface Chat {
  roomId: string;
  startTime: string;
}

interface Voucher {
  id: string;
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
  const [vouchers, setVouchers] = useState<Voucher[]>([
    { id: "id9147344", status: "Pending" },
    { id: "id9147345", status: "Cancelled" },
    { id: "id9147346", status: "Paid (not verified)" },
    { id: "id9147347", status: "Paid (verified)" }
  ]);

  useEffect(() => {
    // Fetch active chats
    fetch('http://localhost:8080/active-chats')
      .then((res) => res.json())
      .then((data) => {
        // Generate a unique time for each chat
        const chats = data.map((id: string) => ({
          roomId: id,
          startTime: getRandomTime() // Assign a unique start time for each chat
        }));
        setActiveChats(chats);
      })
      .catch((error) => console.error("Error fetching active chats:", error));
  }, []);

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

  // Function to verify the voucher
  const verifyVoucher = (id: string) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id ? { ...voucher, status: "Paid (verified)" } : voucher
      )
    );
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
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-full mx-auto flex flex-col lg:flex-row space-x-0 lg:space-x-6 h-screen space-y-6 lg:space-y-0">
        
        {/* Active Chats Section */}
        <div className="w-full lg:w-1/2 bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg h-screen transition-transform duration-300 ease-in-out">
          <h1 className="text-3xl font-bold text-center mb-8">Attendant Dashboard</h1>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Active Chats</h2>

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

        {/* Payment Section */}
        <div className="w-full lg:w-1/2 bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg h-screen transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4 text-center">Payments</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">Manage customer payments here.</p>

            {/* Vouchers */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">Vouchers:</h3>
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Voucher ID: </span>{voucher.id}
                    </div>
                    <span className={`font-semibold ${getStatusTextColor(voucher.status)}`}>
                      {voucher.status}
                    </span>
                  </div>

                  {/* Verify Button appears only if the status is "Paid (not verified)" */}
                  {voucher.status === "Paid (not verified)" && (
                    <div className="mt-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-400 transition duration-300"
                        onClick={() => verifyVoucher(voucher.id)}
                      >
                        ✅ Verify
                      </button>
                    </div>
                  )}
                </div>
              ))}
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
