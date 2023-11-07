<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class CommonServices
{

    /**
     * @param IdQuantityPairDTO[] $items
     * @return void
     */
    static function updateIdQuantityPairsIn($items, $model)
    {
        $collection = collect($items);

        $ids = $collection->pluck('id');

        $mappingQuantitiesUpdates = DB::raw('quantity - CASE id' . $collection->map(function ($item) {
            return 'WHEN ' . $item->id . ' THEN ' . $item->quantity;
        })->implode(' ') . ' END');

        $model::whereIn('id', $ids)->update([
            'quantity' => $mappingQuantitiesUpdates
        ]);
    }
}
