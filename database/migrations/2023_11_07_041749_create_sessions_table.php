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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->double('start_cash');
            $table->double('end_cash')->nullable();
            $table->double('deficit')->default(0);
            $table->boolean('is_closed')->default(false);
            $table->dateTime('opened_at')->default(now());
            $table->dateTime('closed_at')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
