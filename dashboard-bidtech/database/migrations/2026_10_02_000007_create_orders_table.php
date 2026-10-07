<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('orders', function (Blueprint $table) { 
            $table->id(); 
            $table->string('order_number',50)->unique(); 
            $table->foreignId('template_id')->constrained('templates')->restrictOnDelete(); 
            $table->foreignId('client_id')->nullable()->constrained('users')->nullOnDelete(); 
            $table->string('domain_name',255)->index(); 
            $table->unsignedBigInteger('domain_price'); 
            $table->unsignedInteger('domain_duration')->default(1); 
            $table->unsignedBigInteger('domain_price_per_year')->nullable();

            foreach (['template','server','service'] as $component) { 
                $table->unsignedBigInteger("{$component}_price")->nullable(); 
                $table->string("{$component}_desc")->nullable(); 
            } 
            
            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete(); 
            $table->string('coupon_code',50)->nullable(); 
            $table->unsignedBigInteger('discount_amount')->default(0); 
            $table->boolean('is_partner_order')->default(false)->index(); 
            $table->string('partner_name',150)->nullable(); 
            $table->unsignedBigInteger('partner_commission_amount')->default(0); 
            $table->timestamp('commission_paid_out_at')->nullable(); 
            $table->string('domain_status',30)->default('pending_registration'); 
            $table->string('domain_final',255)->nullable(); 
            $table->string('website_status',30)->default('in_progress'); 
            $table->string('full_name',150); 
            $table->string('email',150)->index(); 
            $table->string('whatsapp',30); 
            $table->string('xendit_invoice_id')->nullable()->unique(); 
            $table->text('xendit_payment_url')->nullable(); 
            $table->string('status',30)->default('unpaid')->index(); 
            $table->timestamp('payment_expires_at')->nullable(); 
            $table->timestamp('paid_at')->nullable(); 
            $table->timestamp('paid_email_sent_at')->nullable(); 
            $table->timestamps(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('orders'); 
    } 
};
