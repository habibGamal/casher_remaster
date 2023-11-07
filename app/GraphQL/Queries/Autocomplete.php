<?php

namespace App\GraphQL\Queries;

final class Autocomplete
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $model = $args['model'];
        $modelName = $args['modelName'];
        if ($model == 'product' && strlen($modelName) > 1) {
            $products = \App\Models\Product::select(['id', 'name'])->where('name', 'like', '%' . $modelName . '%')->get();
            return $products;
        }
        return [];
    }
}
