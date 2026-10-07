<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('articles', function (Blueprint $table) { 
            $table->id(); 
            $table->string('title')->nullable(); 
            $table->string('slug')->nullable()->unique(); 
            $table->text('excerpt')->nullable(); 
            $table->json('content'); 
            $table->string('cover_image_url')->nullable(); 
            $table->string('cover_alt_text')->nullable(); 
            $table->string('status')->default('draft')->index(); 
            $table->timestamp('published_at')->nullable(); 
            $table->timestamp('content_updated_at')->nullable(); 
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); 
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete(); 
            $table->timestamps(); $table->softDeletes(); 
        }); 
    } 
    
    public function down(): void 
    { 
        Schema::dropIfExists('articles'); 
    } 
};
