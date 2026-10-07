<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('article_images', function (Blueprint $table) { 
            $table->id(); 
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete(); 
            $table->string('tmp_path')->nullable(); 
            $table->string('disk_path')->nullable(); 
            $table->string('original_filename')->nullable(); 
            $table->string('mime_type'); 
            $table->unsignedBigInteger('size'); 
            $table->unsignedInteger('width')->nullable(); 
            $table->unsignedInteger('height')->nullable(); 
            $table->string('status')->default('pending')->index(); 
            $table->timestamps(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('article_images'); 
    } 
};
