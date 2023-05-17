<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockItem>
 */
class StockItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $product = \App\Models\Product::factory()->createOne();
        return [
            'quantity' => $this->faker->randomFloat(2, 0, 1000),
            'buying_price' => $this->faker->randomFloat(2, $product->selling_price - 10, $product->selling_price - 50),
            'stock_id' => \App\Models\Stock::factory(),
            'product_id' => $product,
        ];
    }
}
