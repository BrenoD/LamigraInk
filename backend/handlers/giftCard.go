package handlers

import (
    "LaMigraInk/backend/models"
    "fmt"
    "net/http"

    "github.com/stripe/stripe-go/v72"
    "github.com/stripe/stripe-go/v72/paymentintent"
)

func CreatePaymentIntent(w http.ResponseWriter, r *http.Request) {
    var request models.GiftcardRequest
    err := json.NewDecoder(r.Body).Decode(&request)
    if err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }

    params := &stripe.PaymentIntentParams{
        Amount:   stripe.Int64(int64(request.Value * 100)), // Converte para centavos
        Currency: stripe.String("usd"),
    }
    intent, err := paymentintent.New(params)
    if err != nil {
        http.Error(w, fmt.Sprintf("Error creating payment intent: %v", err), http.StatusInternalServerError)
        return
    }

    // Retornar o client_secret para o frontend
    json.NewEncoder(w).Encode(map[string]string{"client_secret": intent.ClientSecret})
}
