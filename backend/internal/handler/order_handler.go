package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"bidtech-admin/internal/model"
	"bidtech-admin/internal/service"
)

type OrderHandler struct {
	orderSvc *service.OrderService
}

func NewOrderHandler(orderSvc *service.OrderService) *OrderHandler {
	return &OrderHandler{orderSvc: orderSvc}
}

type createOrderRequest struct {
	Name        string `json:"name"`
	WhatsApp    string `json:"whatsapp"`
	Company     string `json:"company"`
	Service     string `json:"service"`
	Description string `json:"description"`
}

// Create is public — called cross-origin by the main marketing site's contact form.
func (h *OrderHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req createOrderRequest
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 8<<10)).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid body")
		return
	}

	err := h.orderSvc.Create(r.Context(), service.CreateOrderInput{
		Name:        req.Name,
		WhatsApp:    req.WhatsApp,
		Company:     req.Company,
		Service:     req.Service,
		Description: req.Description,
	})

	if errors.Is(err, service.ErrValidation) {
		writeJSONError(w, http.StatusBadRequest, "name, whatsapp and service are required")
		return
	}
	if err != nil {
		log.Printf("create order: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error")
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// List is protected — used by the admin dashboard.
func (h *OrderHandler) List(w http.ResponseWriter, r *http.Request) {
	orders, err := h.orderSvc.List(r.Context())
	if err != nil {
		log.Printf("list orders: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error")
		return
	}
	if orders == nil {
		orders = []model.Order{}
	}
	writeJSON(w, http.StatusOK, orders)
}

type updateStatusRequest struct {
	Status string `json:"status"`
}

func (h *OrderHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	id, err := pathInt64(r, "id")
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid id")
		return
	}

	var req updateStatusRequest
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<10)).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid body")
		return
	}

	if err := h.orderSvc.UpdateStatus(r.Context(), id, req.Status); err != nil {
		if errors.Is(err, service.ErrValidation) {
			writeJSONError(w, http.StatusBadRequest, "invalid status")
			return
		}
		log.Printf("update status: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *OrderHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := pathInt64(r, "id")
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid id")
		return
	}

	if err := h.orderSvc.Delete(r.Context(), id); err != nil {
		log.Printf("delete order: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
