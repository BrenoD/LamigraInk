import React, { useState } from "react";
import "./Dashboard.css";

const GiftCardPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(50);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>(""); // Novo campo para o nome
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione a lógica de envio do gift card aqui
    console.log({ amount, recipientEmail, recipientName, message });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Purchase a Gift Card
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient's Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter recipient's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient's Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter recipient's email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gift Card Amount
            </label>
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={25}>$25</option>
              <option value={50}>$50</option>
              <option value={100}>$100</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Personal Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write a message (optional)"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Purchase Gift Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftCardPage;