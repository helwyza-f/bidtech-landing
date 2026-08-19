package service

import (
	"bidtech-admin/internal/auth"
)

type AuthService struct {
	username     string
	passwordHash string
	secret       string
}

func NewAuthService(username, passwordHash, secret string) *AuthService {
	return &AuthService{username: username, passwordHash: passwordHash, secret: secret}
}

// Login checks credentials and returns a signed session token on success.
func (s *AuthService) Login(username, password string) (string, bool) {
	if !auth.CheckUsername(s.username, username) || !auth.CheckPassword(s.passwordHash, password) {
		return "", false
	}
	return auth.NewSessionToken(s.secret), true
}

func (s *AuthService) VerifyToken(token string) bool {
	return auth.VerifySessionToken(s.secret, token) == nil
}
