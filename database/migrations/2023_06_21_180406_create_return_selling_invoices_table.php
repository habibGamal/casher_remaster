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
        Schema::create('return_selling_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('selling_invoice_id')->constrained('selling_invoices')->onDelete('cascade');
            $table->decimal('total_cost', 8, 2);
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
        Schema::dropIfExists('return_selling_invoices');
    }
};
