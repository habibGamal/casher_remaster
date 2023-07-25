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
        Schema::create('buying_invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buying_invoice_id')->constrained('buying_invoices');
            $table->foreignId('box_id')->constrained('boxes');
            $table->double('quantity');
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
        Schema::dropIfExists('buying_invoice_items');
    }
};
