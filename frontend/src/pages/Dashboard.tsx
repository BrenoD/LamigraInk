import { useState, useEffect } from 'react';
import "./Dashboard.css"
import ChatPopup from '../components/ChatPopup';

interface Chat {
  roomId: string;
  startTime: string;
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

  useEffect(() => {
    // Fetch de chats ativos
    fetch('http://localhost:8080/active-chats')
      .then((res) => res.json())
      .then((data) => {
        // Gerar um horário único para cada chat
        const chats = data.map((id: string) => ({
          roomId: id,
          startTime: getRandomTime() // Atribui um horário de início único para cada chat
        }));
        setActiveChats(chats);
      })
      .catch((error) => console.error("Erro ao buscar chats ativos:", error));
  }, []);

  const formatChatTime = (isoString: string) => {
    const chatDate = new Date(isoString);
    const now = new Date();
    
    const isToday = chatDate.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === chatDate.toDateString();

    const time = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(chatDate);

    const date = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(chatDate);

    if (isToday) {
      return `Hoje, ${time}`;
    } else if (isYesterday) {
      return `Ontem, ${time}`;
    } else {
      return `${date}, ${time}`;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6 text-white"
         style={{ backgroundImage: 'url("/path/to/your/texture.png")' }}>
      <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard do Atendente</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Chats Ativos</h2>

          {activeChats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeChats.map((chat) => (
                <button
                  key={chat.roomId}
                  onClick={() => setSelectedChat(chat.roomId)}
                  className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  <span className="block text-lg font-medium">{`Chat: ${chat.roomId}`}</span>
                  <span className="block text-sm text-gray-400">{`Horário: ${formatChatTime(chat.startTime)}`}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Nenhum chat ativo no momento.</p>
          )}

          {selectedChat && (
            <ChatPopup roomId={selectedChat} userType="attendant" onClose={() => setSelectedChat(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
