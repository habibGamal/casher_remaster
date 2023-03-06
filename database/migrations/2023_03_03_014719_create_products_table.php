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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('barcode');
            $table->double('buying_price');
            $table->double('selling_price');
            $table->unsignedInteger('minimum_stock')->nullable();
            $table->boolean('has_expire_date');
            // 0 = unit, 1 = weight
            $table->boolean('unit_or_weight');
            $table->string('unit')->nullable();
            $table->unsignedBigInteger('product_group_id')->nullable();
            $table->timestamps();
            $table->foreign('product_group_id')->references('id')->on('product_groups')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
