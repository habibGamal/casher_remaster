<?php

namespace App\Services;

use App\Models\OpeningStockItem;
use App\Models\Stock;
use Illuminate\Http\Request;

class OpeningStockServices
{
    public $defaultOrderColumn = 'created_at';

    private function paginate_opening_stock_items(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate =  OpeningStockItem::with(['stockItem.product:id,name,barcode','stockItem.stock:id,name'])->orderBy($settings->columnKey, $settings->order)->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    private function paginate_opening_stock_items_with_search(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = OpeningStockItem::with(['stockItem.product:id,name,barcode','stockItem.stock:id,name'])->where($settings->attribute, 'like', '%' . $settings->search . '%')
            ->orderBy($settings->columnKey, $settings->order)
            ->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    public function get_stocks(Request $request, string $slug)
    {
        return $request->query($slug . '_search')
            ? $this->paginate_opening_stock_items_with_search($request, $slug)
            : $this->paginate_opening_stock_items($request, $slug);
    }
}
