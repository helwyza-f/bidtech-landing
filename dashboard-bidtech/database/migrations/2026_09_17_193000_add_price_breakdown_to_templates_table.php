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
            $table->unsignedBigInteger('template_price')->default(1000000)->after('price');
            $table->unsignedBigInteger('server_price')->default(500000)->after('template_price');
            $table->unsignedBigInteger('service_price')->default(500000)->after('server_price');
            $table->string('template_desc', 255)->nullable()->after('service_price');
            $table->string('server_desc', 255)->nullable()->after('template_desc');
            $table->string('service_desc', 255)->nullable()->after('server_desc');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn([
                'template_price',
                'server_price',
                'service_price',
                'template_desc',
                'server_desc',
                'service_desc',
            ]);
        });
    }
};
