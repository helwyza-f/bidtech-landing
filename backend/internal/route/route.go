package route

import (
	"net/http"
	"time"

	"bidtech-admin/internal/handler"
	"bidtech-admin/internal/middleware"
	"bidtech-admin/internal/service"
)

type Handlers struct {
	Auth   *handler.AuthHandler
	Order  *handler.OrderHandler
	Health *handler.HealthHandler
}

func New(h Handlers, authSvc *service.AuthService, allowedOrigin string) http.Handler {
	requireAuth := middleware.RequireAuth(authSvc)
	publicOrderCORS := middleware.CORS(allowedOrigin)
	publicOrderRateLimit := middleware.RateLimit(10, time.Minute)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", h.Health.Healthz)

	mux.HandleFunc("POST /api/auth/login", h.Auth.Login)
	mux.HandleFunc("POST /api/auth/logout", h.Auth.Logout)
	mux.HandleFunc("GET /api/auth/me", h.Auth.Me)

	// Public: called cross-origin by the main marketing site's contact form.
	mux.Handle("POST /api/orders", publicOrderCORS(publicOrderRateLimit(http.HandlerFunc(h.Order.Create))))
	mux.Handle("OPTIONS /api/orders", publicOrderCORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})))

	// Protected: used by the admin dashboard.
	mux.Handle("GET /api/orders", requireAuth(http.HandlerFunc(h.Order.List)))
	mux.Handle("PATCH /api/orders/{id}", requireAuth(http.HandlerFunc(h.Order.UpdateStatus)))
	mux.Handle("DELETE /api/orders/{id}", requireAuth(http.HandlerFunc(h.Order.Delete)))

	return middleware.Logging(mux)
}
