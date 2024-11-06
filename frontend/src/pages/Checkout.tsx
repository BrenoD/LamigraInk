import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import { useRouter } from "next/router";
import "./Dashboard.css";
import { useGiftCard } from '../context/GiftCardContext';

// Load Stripe with public key
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
      if (!stripe || !elements) {
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error("Card elements not found");
      }

      const response = await fetch(`${process.env.BACKEND_API}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          value: giftCardData.amount,
          artist: giftCardData.selectArtist,
        }), 
      });
      
      if (!response.ok) {
        throw new Error("Error creating Payment Intent");
      }

      const { client_secret } = await response.json();

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
        const giftCardResponse = await fetch(`${process.env.BACKEND_API}/gift-card`, {
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

        if (!giftCardResponse.ok) {
          throw new Error("Failed to create gift card");
        }

        window.location.href = "/Success";
      }
    } catch (err) {
      console.error("Error during checkout process:", err);
      alert("An error occurred during the payment process. Please try again.");
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
