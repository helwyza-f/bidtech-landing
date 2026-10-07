<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('partners', function (Blueprint $table) { 
            $table->id(); 
            $table->foreignId('user_id')->unique()->constrained('users')->restrictOnDelete(); 
            $table->string('type_commission',20); 
            $table->unsignedBigInteger('amount_commission'); 
            $table->timestamps(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('partners'); 
    } 
};
