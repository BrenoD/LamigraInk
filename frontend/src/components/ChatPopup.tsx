import { useEffect, useState } from 'react';

interface Message {
  roomId: string;
  senderId: number;
  content: string;
  senderType: 'client' | 'attendant';
}

interface ChatPopupProps {
  roomId: string;
  userType: 'client' | 'attendant';
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ roomId, userType, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (roomId) {
      const ws = new WebSocket(`wss://lamigraink-production-4e5f.up.railway.app/ws?type=${userType}&room=${roomId}`);

      ws.onopen = () => {
        console.log("Conexão WebSocket estabelecida. Room ID:", roomId, "User Type:", userType);
      };

      ws.onmessage = (event) => {
        const newMessage: Message = JSON.parse(event.data);
        console.log("Mensagem recebida:", newMessage); // Log da mensagem recebida
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      ws.onerror = (error) => {
        console.error("Erro na conexão WebSocket:", error);
      };

      ws.onclose = () => {
        console.log("Conexão WebSocket fechada.");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [roomId, userType]);

  const sendMessage = () => {
    if (message.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const msg = {
        roomId,
        senderId: userType === 'client' ? 1 : 2,
        content: message,
        senderType: userType,
      };

      console.log("Enviando mensagem:", msg); // Log da mensagem a ser enviada
      socket.send(JSON.stringify(msg));

      // Adiciona a mensagem ao estado local imediatamente após o envio
      setMessages((prevMessages) => [
        ...prevMessages,
        msg
      ]);

      setMessage(''); // Limpa o campo de input
    } else {
      console.error("Erro ao enviar mensagem: WebSocket não está conectado.");
    }
  };

  return (
    <div className="fixed z-50 bottom-20 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat</h2>
        <button className="text-red-500" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="mt-2 h-48 overflow-y-auto bg-gray-900 p-2 rounded">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${msg.senderType === userType ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`block p-2 rounded-lg ${msg.senderType === userType
                    ? 'bg-green-500'
                    : msg.senderType === 'client'
                      ? 'bg-blue-500'
                      : 'bg-blue-500'
                  }`}
              >
                <strong>
                  {msg.senderType === 'client'
                    ? userType === 'client'
                      ? 'You'
                      : 'Client'
                    : userType === 'attendant'
                      ? 'You'
                      : 'Attendant'}
                  :
                </strong>{' '}
                {msg.content}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet;</p>
        )}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded bg-gray-700 text-white"
          placeholder="Write your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white p-2 ml-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
