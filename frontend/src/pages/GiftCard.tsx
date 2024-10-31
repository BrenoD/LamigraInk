import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "@/components/Footer";
import "./Dashboard.css";
import { useGiftCard } from '../context/GiftCardContext';

const GiftCardPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(50);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { setGiftCardData } = useGiftCard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientEmail || !recipientName) {
      alert("Preencha o nome e o email do destinatário.");
      return;
    }

    setGiftCardData({
      amount,
      recipientName,
      recipientEmail,
      message
    });

    router.push("/Checkout");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <div className="bg-black p-2 rounded-md">
              <Image
                src="/images/La_Migra_Ink.png"
                alt="La Migra logo"
                width={190}
                height={50}
                className="block"
              />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Purchase a Gift Card
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient&apos;s Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                placeholder="Enter recipient's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient&apos;s Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                placeholder="Enter recipient's email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gift Card Amount
              </label>
              <select
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              >
                <option value={25}>£ 25.00</option>
                <option value={50}>£ 50.00</option>
                <option value={100}>£ 100.00</option>
                <option value={200}>£ 200.00</option>
                <option value={250}>£ 250.00</option>
                <option value={300}>£ 300.00</option>
                <option value={350}>£ 350.00</option>
                <option value={400}>£ 400.00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Personal Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
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

      <Footer />
    </div>
  );
};

export default GiftCardPage;
