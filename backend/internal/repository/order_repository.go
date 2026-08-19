package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"bidtech-admin/internal/model"
)

const schema = `
create table if not exists orders (
	id serial primary key,
	name text not null,
	whatsapp text not null,
	company text not null default '',
	service text not null,
	description text not null default '',
	status text not null default 'baru',
	created_at timestamptz not null default now()
);
`

type OrderRepository struct {
	pool *pgxpool.Pool
}

func NewOrderRepository(pool *pgxpool.Pool) *OrderRepository {
	return &OrderRepository{pool: pool}
}

// Migrate ensures the orders table exists.
func (r *OrderRepository) Migrate(ctx context.Context) error {
	_, err := r.pool.Exec(ctx, schema)
	return err
}

func (r *OrderRepository) Create(ctx context.Context, o model.Order) error {
	_, err := r.pool.Exec(ctx,
		`insert into orders (name, whatsapp, company, service, description) values ($1, $2, $3, $4, $5)`,
		o.Name, o.WhatsApp, o.Company, o.Service, o.Description,
	)
	return err
}

func (r *OrderRepository) List(ctx context.Context) ([]model.Order, error) {
	rows, err := r.pool.Query(ctx,
		`select id, name, whatsapp, company, service, description, status, to_char(created_at, 'YYYY-MM-DD HH24:MI')
		 from orders order by created_at desc`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []model.Order
	for rows.Next() {
		var o model.Order
		if err := rows.Scan(&o.ID, &o.Name, &o.WhatsApp, &o.Company, &o.Service, &o.Description, &o.Status, &o.CreatedAt); err != nil {
			return nil, err
		}
		orders = append(orders, o)
	}
	return orders, rows.Err()
}

func (r *OrderRepository) UpdateStatus(ctx context.Context, id int64, status string) error {
	_, err := r.pool.Exec(ctx, `update orders set status = $1 where id = $2`, status, id)
	return err
}

func (r *OrderRepository) Delete(ctx context.Context, id int64) error {
	_, err := r.pool.Exec(ctx, `delete from orders where id = $1`, id)
	return err
}
