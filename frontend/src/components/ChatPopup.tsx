// components/ChatPopup.tsx
import { useEffect, useState } from 'react';

const ChatPopup = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Conectando ao WebSocket
    const ws = new WebSocket('ws://localhost:8080/ws'); // URL do seu WebSocket
    setSocket(ws);

    ws.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Limpar a conexão ao desmontar o componente
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-20 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat ao Vivo</h2>
        <button className="text-red-500" onClick={() => setMessages([])}>✖</button>
      </div>
      <div className="mt-2 h-48 overflow-y-auto bg-gray-900 p-2 rounded">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="block bg-green-500 rounded p-1">{msg}</span>
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
