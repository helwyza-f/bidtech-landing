package middleware

import (
	"net/http"

	"bidtech-admin/internal/auth"
	"bidtech-admin/internal/service"
)

// RequireAuth rejects requests without a valid session cookie (401 JSON, since this is a pure API).
func RequireAuth(authSvc *service.AuthService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cookie, err := r.Cookie(auth.CookieName)
			if err != nil || !authSvc.VerifyToken(cookie.Value) {
				http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
