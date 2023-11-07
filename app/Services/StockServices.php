<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductGroup;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockServices
{
    public $defaultOrderColumn = 'created_at';

    private function paginate_stocks(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate =  Stock::orderBy($settings->columnKey, $settings->order)->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    private function paginate_stocks_with_search(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = Stock::where($settings->attribute, 'like', '%' . $settings->search . '%')
            ->orderBy($settings->columnKey, $settings->order)
            ->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    public function get_stocks(Request $request, string $slug)
    {
        return $request->query($slug . '_search')
            ? $this->paginate_stocks_with_search($request, $slug)
            : $this->paginate_stocks($request, $slug);
    }
}
