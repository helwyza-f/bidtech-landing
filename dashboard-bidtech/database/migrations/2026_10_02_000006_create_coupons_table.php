<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('coupons', function (Blueprint $table) { 
            $table->id(); 
            $table->string('name',150); 
            $table->string('code',50)->unique(); 
            $table->timestamp('valid_from')->nullable(); 
            $table->timestamp('valid_until')->nullable(); 
            $table->unsignedInteger('usage_limit')->nullable(); 
            $table->unsignedInteger('user_usage_limit')->nullable()->default(1); 
            $table->unsignedBigInteger('min_order_amount')->nullable(); 

            foreach (['subtotal','service','template','server','domain'] as $component) { 
                $table->string("{$component}_discount_type",20)->nullable(); 
                $table->unsignedBigInteger("{$component}_discount_amount")->nullable(); 
                $table->unsignedBigInteger("{$component}_discount_max")->nullable(); 
            } 
            
            $table->foreignId('partner_id')->nullable()->constrained('partners')->nullOnDelete(); 
            $table->boolean('is_active')->default(true)->index(); 
            $table->timestamps(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('coupons'); 
    } 
};
