package model

// Order represents a contact-form submission from the main marketing site.
type Order struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	WhatsApp    string `json:"whatsapp"`
	Company     string `json:"company"`
	Service     string `json:"service"`
	Description string `json:"description"`
	Status      string `json:"status"`
	CreatedAt   string `json:"created_at"`
}

var ValidStatuses = map[string]bool{
	"baru":      true,
	"dihubungi": true,
	"selesai":   true,
}
