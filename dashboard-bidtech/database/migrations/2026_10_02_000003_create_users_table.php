<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('users', function (Blueprint $table) { 
            $table->id(); 
            $table->string('role',20)->index(); 
            $table->string('name',150); 
            $table->string('email',150)->unique(); 
            $table->string('whatsapp',30)->nullable(); 
            $table->string('password'); 
            $table->string('photo')->nullable()->default('profiles/placeholder_profile.webp');
            $table->string('author_name',150)->nullable(); 
            $table->rememberToken(); $table->timestamps(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('users'); 
    } 
};