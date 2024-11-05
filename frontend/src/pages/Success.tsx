import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import "./Dashboard.css"
const SuccessPage: React.FC = () => {
  const router = useRouter();
  const handleReturnHome = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center animate-fadeInUp">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/La_Migra_Ink.png"
              alt="LamigraInk Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
          <div className="bg-green-100 p-4 rounded-full">
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
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Welcome to the LamigraInk family! Your gift card is being processed with care.
        </p>
        <p className="text-gray-600 mb-6">
          You will soon receive an email with all instructions to enjoy your unique tattoo experience.
        </p>
        
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