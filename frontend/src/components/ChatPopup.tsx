// components/ChatPopup.tsx
import { useEffect, useState } from 'react';

interface Message {
  roomId: number;
  senderId: number;
  content: string;
}

interface ChatPopupProps {
  onClose: () => void; // Função que será chamada para fechar o popup
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]); // Estado para mensagens
  const [message, setMessage] = useState<string>(''); // Estado para a nova mensagem
  const [socket, setSocket] = useState<WebSocket | null>(null); // Estado para WebSocket
  const [roomId, setRoomId] = useState<number | null>(null); // Estado para o ID da sala

  useEffect(() => {
    // Conectando ao WebSocket
    const ws = new WebSocket('ws://localhost:8080/ws');
    setSocket(ws);

    ws.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data); // Parse da nova mensagem
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Atualiza as mensagens
    };

    // Limpar a conexão ao desmontar o componente
    return () => {
      ws.close();
    };
  }, []);

  const createChat = async () => {
    // Lógica para criar sala e usuário no backend
    const response = await fetch('http://localhost:8080/create-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 1, // ID do atendente ou cliente, ajuste conforme necessário
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setRoomId(data.roomId); // Armazena o RoomID recebido
    } else {
      console.error('Erro ao criar sala:', data);
    }
  };

  const sendMessage = () => {
    if (message.trim() && socket && roomId !== null) {
      socket.send(JSON.stringify({
        roomId: roomId, // Enviar roomId da sala criada
        senderId: 1,    // ID do atendente ou cliente, ajuste conforme necessário
        content: message,
      }));
      setMessage(''); // Limpa o campo de mensagem
    }
  };

  useEffect(() => {
    createChat(); // Criar sala quando o componente é montado
  }, []);

  return (
    <div className="fixed bottom-20 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat</h2>
        <button className="text-red-500" onClick={onClose}>✖</button>
      </div>
      <div className="mt-2 h-48 overflow-y-auto bg-gray-900 p-2 rounded">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="block bg-green-500 rounded p-1">{msg.content}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma mensagem ainda.</p>
        )}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded bg-gray-700 text-white"
          placeholder="Escreva sua mensagem..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white p-2 ml-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
