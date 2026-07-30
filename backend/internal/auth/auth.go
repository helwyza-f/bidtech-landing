package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const CookieName = "bidtech_admin_session"
const sessionTTL = 7 * 24 * time.Hour

var ErrInvalidSession = errors.New("invalid session")

// CheckPassword compares a plaintext password against a bcrypt hash.
func CheckPassword(hash, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

// CheckUsername does a constant-time comparison of usernames.
func CheckUsername(expected, got string) bool {
	return subtle.ConstantTimeCompare([]byte(expected), []byte(got)) == 1
}

// NewSessionToken creates a signed "expiry.signature" token for the given secret.
func NewSessionToken(secret string) string {
	expiry := time.Now().Add(sessionTTL).Unix()
	payload := strconv.FormatInt(expiry, 10)
	sig := sign(secret, payload)
	return payload + "." + sig
}

// VerifySessionToken checks the signature and expiry of a session token.
func VerifySessionToken(secret, token string) error {
	parts := strings.SplitN(token, ".", 2)
	if len(parts) != 2 {
		return ErrInvalidSession
	}

	payload, sig := parts[0], parts[1]
	if !hmac.Equal([]byte(sign(secret, payload)), []byte(sig)) {
		return ErrInvalidSession
	}

	expiry, err := strconv.ParseInt(payload, 10, 64)
	if err != nil {
		return ErrInvalidSession
	}

	if time.Now().Unix() > expiry {
		return ErrInvalidSession
	}

	return nil
}

func sign(secret, payload string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(payload))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

// HashPassword is a helper for generating a bcrypt hash (used by the seed CLI flag).
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("hash password: %w", err)
	}
	return string(hash), nil
}
