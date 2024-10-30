import React, { useState } from "react";
import { useRouter } from "next/router";
import "./Dashboard.css";
import { useGiftCard } from '../context/GiftCardContext';

const GiftCardPage: React.FC = () => {
  const router = useRouter();
  const { giftCardData, setGiftCardData } = useGiftCard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!giftCardData.recipientEmail || !giftCardData.recipientName) {
      alert("Preencha o nome e o email do destinatário.");
      return;
    }

    router.push('./Checkout');
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
              Nome do Destinatário
            </label>
            <input
              type="text"
              value={giftCardData.recipientName}
              onChange={(e) => setGiftCardData({
                ...giftCardData,
                recipientName: e.target.value
              })}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Digite o nome do destinatário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient's Email
            </label>
            <input
              type="email"
              value={giftCardData.recipientEmail}
              onChange={(e) => setGiftCardData({
                ...giftCardData,
                recipientEmail: e.target.value
              })}
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
              value={giftCardData.amount}
              onChange={(e) => setGiftCardData({
                ...giftCardData,
                amount: Number(e.target.value)
              })}
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
              value={giftCardData.message}
              onChange={(e) => setGiftCardData({
                ...giftCardData,
                message: e.target.value
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write a message (optional)"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftCardPage;
