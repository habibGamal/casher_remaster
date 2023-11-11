<?php

namespace Database\Factories;

use App\Models\Category;
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
    public function definition(): array
    {
        $name = $this->faker->unique()->word();
        $barcode = $this->faker->ean13();
        $cost = $this->faker->randomFloat(2, 1, 100);
        $price = $cost * $this->faker->randomFloat(1, 1.1, 2);
        $minimum_stock = $this->faker->randomNumber(2);
        $has_expiry_date = $this->faker->boolean();
        $quantity_has_fraction = $this->faker->boolean();
        $unit = $this->faker->word();
        Category::factory()->create();
        $category = Category::inRandomOrder()->first();

        return [
            'name' => $name,
            'barcode' => $barcode,
            'cost' => $cost,
            'price' => $price,
            'minimum_stock' => $minimum_stock,
            'has_expiry_date' => $has_expiry_date,
            'quantity_has_fraction' => $quantity_has_fraction,
            'unit' => $unit,
            'category_id' => $category->id,
        ];
    }
}
