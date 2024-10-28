import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import "./Dashboard.css";

// Carregar o Stripe com a chave pública
const stripePromise = loadStripe("pk_test_51QDnNpG6qzKVA8tL098WPy0ub0SSeO4Ef7ALXRwmCS6u0To001X8glppaNlKpWutvJsvvIWOXwiLaV60OWwQKG1p004hCSmskS");

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  // Pega os parâmetros da query string
  const { amount, recipientName, recipientEmail, message } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Obter os elementos do cartão
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);

    const response = await fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        value: Number(amount) // Certifique-se de que o valor é enviado como número
      }), 
    });
    

    if (!response.ok) {
      console.error("Erro ao criar Payment Intent");
      return;
    }

    const { client_secret } = await response.json();

    // Confirmar o pagamento com o client_secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardNumberElement!,
        billing_details: {
          email: recipientEmail as string,
          name: recipientName as string,
        },
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Pagamento realizado com sucesso!");

      // Redirecionar para a página de sucesso
      router.push("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
        <CardNumberElement className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-300" />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
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
        Pagar {amount ? `$${amount}` : ""}
      </button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Pagamento do Gift Card</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;
