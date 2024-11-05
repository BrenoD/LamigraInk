package models

type Giftcard struct{
	ID        int     `json:"id"`        
    Code      string  `json:"code"`      
    Value     float32 `json:"value"`     
    Status    string  `json:"status"`
}

type GiftcardRequest struct {
    RecipientName string  `json:"recipientname"`
	Email         string  `json:"email"`
    Value        float32 `json:"value"`
    Artist       string `json:"artist"`
}