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
        Schema::table('orders', function (Blueprint $table) {
            // Breakdown Harga Snapshot saat Transaksi
            $table->unsignedBigInteger('template_price')->nullable()->after('domain_price_per_year');
            $table->unsignedBigInteger('server_price')->nullable()->after('template_price');
            $table->unsignedBigInteger('service_price')->nullable()->after('server_price');
            $table->string('template_desc', 255)->nullable()->after('service_price');
            $table->string('server_desc', 255)->nullable()->after('template_desc');
            $table->string('service_desc', 255)->nullable()->after('server_desc');

            // Snapshot Promo & Diskon
            $table->foreignId('promo_id')->nullable()->after('service_desc')->constrained('promos')->nullOnDelete();
            $table->string('promo_code', 50)->nullable()->after('promo_id');
            $table->unsignedBigInteger('discount_amount')->default(0)->after('promo_code');

            // Snapshot Atribusi Mitra
            $table->boolean('is_partner_order')->default(false)->after('discount_amount')->index();
            $table->string('partner_name', 150)->nullable()->after('is_partner_order');
            $table->unsignedBigInteger('partner_commission_amount')->default(0)->after('partner_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['promo_id']);
            $table->dropColumn([
                'template_price',
                'server_price',
                'service_price',
                'template_desc',
                'server_desc',
                'service_desc',
                'promo_id',
                'promo_code',
                'discount_amount',
                'is_partner_order',
                'partner_name',
                'partner_commission_amount',
            ]);
        });
    }
};
