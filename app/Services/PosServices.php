<?php

namespace App\Services;

use App\DTO\PosItemDTO;
use App\DTO\IdQuantityPairDTO;
use App\Models\PosItem;
use Illuminate\Support\Facades\DB;

class PosServices
{
    /**
     * @param PosItemDTO[] $items
     * @return void
     */
    function addItemsToPos($items)
    {
        PosItem::upsert(
            collect($items)->toArray(),
            ['pos_id', 'product_id'],
            ['quantity']
        );
    }

    function getItemsFromPos(int $pos_id, int $product_id)
    {
        return PosItem::where([
            ['pos_id', '=', $pos_id],
            ['product_id', '=', $product_id],
        ])->get();
    }

    /**
     * @param IdQuantityPairDTO[] $items
     * @return void
     */
    function removeItemsFromPos($items)
    {
        CommonServices::updateIdQuantityPairsIn($items,PosItem::class);
    }
}
