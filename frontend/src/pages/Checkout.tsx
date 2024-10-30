import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import "./Dashboard.css";
import { useGiftCard } from '../context/GiftCardContext';

// Load Stripe with public key
const stripePromise = loadStripe("pk_test_51QDnNpG6qzKVA8tL098WPy0ub0SSeO4Ef7ALXRwmCS6u0To001X8glppaNlKpWutvJsvvIWOXwiLaV60OWwQKG1p004hCSmskS");

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { giftCardData } = useGiftCard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!stripe || !elements) {
        return;
      }

      // Get card element
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error("Elementos do cartão não encontrados");
      }

      // Criar Payment Intent
      const response = await fetch("http://localhost:8080/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          value: giftCardData.amount
        }), 
      });
      
      if (!response.ok) {
        throw new Error("Erro ao criar Payment Intent");
      }

      const { client_secret } = await response.json();

      // Confirmar pagamento
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
        throw new Error(error.message);
      }

      if (paymentIntent?.status === "succeeded") {
        // Criar gift card
        const giftCardResponse = await fetch("http://localhost:8080/gift-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientname: giftCardData.recipientName,
            email: giftCardData.recipientEmail,
            value: giftCardData.amount
          }),
        });

        if (!giftCardResponse.ok) {
          throw new Error("Falha ao criar gift card");
        }

        // Forçar o redirecionamento usando window.location
        window.location.href = "/Success";
      }
    } catch (err) {
      console.error("Erro durante o processo de checkout:", err);
      alert("Ocorreu um erro durante o processo de pagamento. Por favor, tente novamente.");
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
          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <CardExpiryElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <CardCvcElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out"
        disabled={!stripe}
      >
        Pagar ${giftCardData.amount}
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
