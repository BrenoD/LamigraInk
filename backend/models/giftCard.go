package models

type Giftcard struct{
	ID        int     `json:"id"`        
    Code      string  `json:"code"`      
    Value     float32 `json:"value"`     
    Status    string  `json:"status"`
}