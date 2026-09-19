<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Buat order_id dan domain_final nullable agar akun admin bisa dibuat tanpa order.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop FK constraint dulu sebelum ubah kolom
            $table->dropForeign(['order_id']);
            $table->dropUnique(['order_id']);

            // Ubah jadi nullable
            $table->foreignId('order_id')->nullable()->change();
            $table->string('domain_final', 255)->nullable()->change();

            // Tambah kembali FK constraint dengan nullable
            $table->foreign('order_id')->references('id')->on('orders')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->foreignId('order_id')->nullable(false)->change();
            $table->string('domain_final', 255)->nullable(false)->change();
            $table->foreign('order_id')->references('id')->on('orders')->restrictOnDelete();
            $table->unique('order_id');
        });
    }
};
