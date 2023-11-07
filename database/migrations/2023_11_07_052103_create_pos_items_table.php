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
        Schema::create('pos_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pos_id')->constrained('pos');
            $table->foreignId('product_id')->constrained('products');
            $table->double('quantity');
            $table->longText('expiry_dates')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos_items');
    }
};
