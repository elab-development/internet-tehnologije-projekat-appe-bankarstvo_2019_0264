<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'number' => fake()->numerify('################'),
            'balance' => fake()->randomFloat(2, 0, 10000000),
            'currency' => fake()->randomElement(['RSD', 'USD', 'EUR', 'YEN'])
        ];
    }
}
