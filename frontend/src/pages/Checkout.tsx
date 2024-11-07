import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import { useRouter } from "next/router";
import "./Dashboard.css";
import { useGiftCard } from '../context/GiftCardContext';

// Load Stripe with public key
/* const stripePromise = loadStripe("pk_live_51QDnNpG6qzKVA8tLTR9Gepf1uyWETmM7UlkEjkJBj3RnPZKsMcCAJarkvCSYdLFAN8Eqr0pA2zSShHqIcyRD4VKH00HrHTC2sb"); */
const stripePromise = loadStripe("pk_test_51QDnNpG6qzKVA8tL098WPy0ub0SSeO4Ef7ALXRwmCS6u0To001X8glppaNlKpWutvJsvvIWOXwiLaV60OWwQKG1p004hCSmskS");

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  // const router = useRouter();
  const { giftCardData } = useGiftCard();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log("Gift card data:", giftCardData); // Log do giftCardData
  
      if (!stripe || !elements) {
        console.log("Stripe ou Elements não inicializado");
        return;
      }
  
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        console.error("Elementos do cartão não encontrados");
        return;
      }
  
      const response = await fetch('https://lamigraink-production-4e5f.up.railway.app/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          value: giftCardData.amount,
          artist: giftCardData.selectArtist,
        }),
      });
      
      console.log("Resposta da criação do Payment Intent:", response); // Log da resposta do Payment Intent
  
      if (!response.ok) {
        throw new Error("Erro ao criar Payment Intent");
      }
  
      const { client_secret } = await response.json();
      console.log("Client Secret:", client_secret); // Log do client_secret
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            email: giftCardData.recipientEmail,
            name: giftCardData.recipientName,
          },
        },
      });
  
      if (error) {
        console.error("Erro no pagamento:", error.message);
        throw new Error(error.message);
      }
  
      if (paymentIntent?.status === "succeeded") {
        console.log("Pagamento sucedido, criando gift card...");
  
        const giftCardResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/gift-card`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientname: giftCardData.recipientName,
            email: giftCardData.recipientEmail,
            value: giftCardData.amount,
            artist: giftCardData.selectArtist,
          }),
        });
        
  
        console.log("Resposta da criação do gift card:", giftCardResponse); // Log da resposta da criação do gift card
  
        if (!giftCardResponse.ok) {
          throw new Error("Falha ao criar o gift card" + giftCardResponse.statusText);
        }
  
        window.location.href = "/Success";
      }
    } catch (err) {
      console.error("Erro durante o processo de checkout:", err);
      alert("Ocorreu um erro durante o processo de pagamento. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <CardNumberElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <CardExpiryElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <CardCvcElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out flex items-center justify-center"
        disabled={!stripe || isLoading}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          `Pay £${giftCardData.amount}`
        )}
      </button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Gift Card Payment</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;
