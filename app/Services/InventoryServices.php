<?php

namespace App\Services;

use App\DTO\InventoryItemDTO;
use App\DTO\IdQuantityPairDTO;
use App\Models\InventoryItem;

class InventoryServices
{
    /**
     * @param InventoryItemDTO[] $items
     * @return void
     */
    function addItemsToInventory($items)
    {
        InventoryItem::upsert(
            collect($items)->toArray(),
            ['inventory_id', 'product_id', 'expiry_date'],
            ['quantity']
        );
    }

    function getItemsFromInventory(int $inventory_id, int $product_id)
    {
        return InventoryItem::where([
            ['inventory_id', '=', $inventory_id],
            ['product_id', '=', $product_id],
            ['quantity', '>', 0],
        ])->get();
    }

    /**
     * @param IdQuantityPairDTO[] $items
     * @return void
     */
    function removeItemsFromInventory($items)
    {
        CommonServices::updateIdQuantityPairsIn($items, InventoryItem::class);
    }
}
