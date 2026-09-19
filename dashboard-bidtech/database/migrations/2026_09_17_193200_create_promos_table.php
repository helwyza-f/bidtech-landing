<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name', 150);
            $table->text('description')->nullable();
            $table->string('type', 20)->default('fixed'); // 'fixed' atau 'percentage'
            $table->unsignedBigInteger('reward_amount'); // Nominal rupiah atau nilai persen
            $table->unsignedBigInteger('max_discount')->nullable(); // Maksimal diskon untuk tipe percentage
            $table->unsignedBigInteger('min_order_amount')->default(0); // Syarat minimal subtotal
            $table->string('target_scope', 30)->default('total'); // 'total', 'template', 'server', 'service'
            $table->foreignId('target_template_id')->nullable()->constrained('templates')->nullOnDelete();

            // Kolom Khusus Mitra / Partner
            $table->boolean('is_partner')->default(false)->index();
            $table->string('partner_name', 150)->nullable();
            $table->string('partner_code', 50)->nullable()->index();
            $table->string('partner_commission_type', 20)->default('none'); // 'none', 'fixed', 'percentage'
            $table->unsignedBigInteger('partner_commission_value')->default(0);
            $table->text('allowed_domains')->nullable(); // Whitelist domain email mitra (dipisah koma)
            $table->text('allowed_emails')->nullable(); // Whitelist email mitra spesifik (JSON atau dipisah koma)

            // Batasan Penggunaan
            $table->unsignedInteger('usage_limit')->nullable(); // Batas kuota global (null = tanpa batas)
            $table->unsignedInteger('used_count')->default(0); // Jumlah transaksi yang menggunakan promo ini
            $table->unsignedInteger('usage_per_user')->default(1); // Maksimal pemakaian per email
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};
