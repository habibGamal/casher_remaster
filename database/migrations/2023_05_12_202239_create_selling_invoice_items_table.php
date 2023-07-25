<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('selling_invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('selling_invoice_id')->constrained('selling_invoices');
            $table->foreignId('stock_item_id')->constrained('stock_items');
            $table->double('quantity');
            $table->double('selling_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('selling_invoice_items');
    }
};
