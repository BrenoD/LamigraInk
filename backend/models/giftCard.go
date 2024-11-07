package models

type Giftcard struct{
	ID              int     `json:"id"`        
    CustomerName    string `json:customerName`
    Code            string  `json:"code"`      
    Value           float32 `json:"value"`     
    Status          string  `json:"status"`
}

type GiftcardRequest struct {
    RecipientName string  `json:"recipientname"`  // Nome do destinatário
    Email         string  `json:"email"`  // E-mail do destinatário
    Value         float32 `json:"value"`  // Valor do gift card
    Artist        string  `json:"artist"`  // Artista selecionado
}
