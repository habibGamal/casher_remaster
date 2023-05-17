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
            $table->foreignId('product_id')->constrained('products');
            $table->double('quantity');
            $table->double('buying_price');
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
