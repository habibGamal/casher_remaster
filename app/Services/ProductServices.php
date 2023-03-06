<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

class ProductServices
{
    public $defaultOrderColumn = 'created_at';

    public function paginate(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = Product::with('productGroup:id,name')->orderBy($settings->columnKey, $settings->order)->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    public function paginateWithSearch(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = Product::with('productGroup:id,name')
            ->where($settings->attribute, 'like', '%' . $settings->search . '%')
            ->orderBy($settings->columnKey, $settings->order)
            ->paginate($settings->pageSize);
        return $paginate;
    }

    public function searchInProductGroups(Request $request)
    {
        return ProductGroup::select(['id', 'name'])
            ->where('name', 'like', '%' . $request->product_group_name . '%')
            ->get();
    }
}
