<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name'=>fake()->word(),
            'barcode'=>fake()->ean13(),
            'buying_price'=>fake()->randomFloat(2, 0, 100),
            'selling_price'=>fake()->randomFloat(2, 0, 100),
            'minimum_stock'=>fake()->randomNumber(2),
            'has_expire_date'=>fake()->boolean(),
            'unit_or_weight'=>fake()->boolean(),
            'unit'=>fake()->randomElement(['kg', 'g', 'l', 'ml']),
            'product_group_id'=>fake()->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        ];
    }
}
