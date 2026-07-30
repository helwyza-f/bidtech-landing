package service

import (
	"context"
	"errors"
	"strings"

	"bidtech-admin/internal/model"
	"bidtech-admin/internal/repository"
)

var ErrValidation = errors.New("validation error")

type CreateOrderInput struct {
	Name        string
	WhatsApp    string
	Company     string
	Service     string
	Description string
}

type OrderService struct {
	repo *repository.OrderRepository
}

func NewOrderService(repo *repository.OrderRepository) *OrderService {
	return &OrderService{repo: repo}
}

func (s *OrderService) Create(ctx context.Context, in CreateOrderInput) error {
	name := strings.TrimSpace(in.Name)
	whatsapp := strings.TrimSpace(in.WhatsApp)
	svc := strings.TrimSpace(in.Service)

	if name == "" || whatsapp == "" || svc == "" {
		return ErrValidation
	}

	return s.repo.Create(ctx, model.Order{
		Name:        name,
		WhatsApp:    whatsapp,
		Company:     strings.TrimSpace(in.Company),
		Service:     svc,
		Description: strings.TrimSpace(in.Description),
	})
}

func (s *OrderService) List(ctx context.Context) ([]model.Order, error) {
	return s.repo.List(ctx)
}

func (s *OrderService) UpdateStatus(ctx context.Context, id int64, status string) error {
	if !model.ValidStatuses[status] {
		return ErrValidation
	}
	return s.repo.UpdateStatus(ctx, id, status)
}

func (s *OrderService) Delete(ctx context.Context, id int64) error {
	return s.repo.Delete(ctx, id)
}
