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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 50)->unique();
            $table->foreignId('template_id')->constrained('templates')->restrictOnDelete();
            $table->string('domain_name', 255);
            $table->unsignedBigInteger('domain_price');
            $table->string('full_name', 150);
            $table->string('email', 150);
            $table->string('whatsapp', 30);
            $table->string('xendit_invoice_id')->nullable()->unique();
            $table->text('xendit_payment_url')->nullable();
            $table->string('status', 30)->default('unpaid');
            $table->timestamp('payment_expires_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index('domain_name');
            $table->index('email');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
