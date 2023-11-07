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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->enum('method', ['cash', 'card']);
            $table->enum('type', ['in', 'out']);
            $table->double('subtotal');
            $table->double('tax')->default(0);
            $table->double('discount')->default(0);
            $table->double('total');
            $table->double('paid');
            $table->double('margin_profit')->default(0);
            $table->text('notes')->nullable();
            $table->foreignId('receipt_id')->constrained('receipts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
