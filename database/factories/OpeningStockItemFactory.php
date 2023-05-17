<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OpeningStockItem>
 */
class OpeningStockItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'stock_item_id' => \App\Models\StockItem::factory(),
            'buying_price' => $this->faker->randomFloat(2, 0, 2000),
        ];
    }
}
