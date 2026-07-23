package main

import (
	"context"
	"log"
	"net/http"

	"bidtech-admin/internal/config"
	"bidtech-admin/internal/handler"
	"bidtech-admin/internal/repository"
	"bidtech-admin/internal/route"
	"bidtech-admin/internal/service"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	ctx := context.Background()

	pool, err := repository.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db connect: %v", err)
	}
	defer pool.Close()

	orderRepo := repository.NewOrderRepository(pool)
	if err := orderRepo.Migrate(ctx); err != nil {
		log.Fatalf("db migrate: %v", err)
	}

	orderSvc := service.NewOrderService(orderRepo)
	authSvc := service.NewAuthService(cfg.AdminUsername, cfg.AdminPasswordHash, cfg.SessionSecret)

	handlers := route.Handlers{
		Auth:   handler.NewAuthHandler(authSvc),
		Order:  handler.NewOrderHandler(orderSvc),
		Health: handler.NewHealthHandler(pool),
	}

	mux := route.New(handlers, authSvc, cfg.AllowedOrigin)

	addr := ":" + cfg.Port
	log.Printf("bidtech-admin backend listening on %s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("server: %v", err)
	}
}
