import React from "react";
import { useRouter } from "next/router";
import "./Dashboard.css"

const SuccessPage: React.FC = () => {
  const router = useRouter();

  // Função para redirecionar para a página inicial ou qualquer outra ação
  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center animate-fadeInUp">
        <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
          <svg
            className="w-12 h-12 text-green-600 animate-checkmark"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your gift card is being processed.</p>
        <button
          onClick={handleReturnHome}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
