<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('templates', function (Blueprint $table) { 
            $table->id(); 
            $table->string('slug')->unique(); 
            $table->string('name',150); 
            $table->string('category',100); 
            $table->unsignedBigInteger('price'); 
            $table->unsignedBigInteger('template_price')->default(800000); 
            $table->unsignedBigInteger('server_price')->default(700000); 
            $table->unsignedBigInteger('service_price')->default(250000); 
            $table->string('template_desc')->nullable(); 
            $table->string('server_desc')->nullable(); 
            $table->string('service_desc')->nullable(); 
            $table->string('preview')->nullable(); 
            $table->unsignedBigInteger('views')->default(0); 
            $table->string('demo_url')->nullable(); 
            $table->text('description')->nullable(); 
            $table->string('tags')->nullable(); 
            $table->boolean('is_active')->default(true); 
            $table->timestamps(); 
        }); 
    }
    
    public function down(): void 
    { 
        Schema::dropIfExists('templates'); 
    } 
};