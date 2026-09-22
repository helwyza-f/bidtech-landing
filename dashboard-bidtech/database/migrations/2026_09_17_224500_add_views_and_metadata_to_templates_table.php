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
        Schema::table('templates', function (Blueprint $table) {
            $table->unsignedBigInteger('views')->default(0)->after('preview');
            $table->string('demo_url', 255)->nullable()->after('views');
            $table->text('description')->nullable()->after('demo_url');
            $table->string('tags', 255)->nullable()->after('description');
            $table->boolean('is_active')->default(true)->after('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn(['views', 'demo_url', 'description', 'tags', 'is_active']);
        });
    }
};
