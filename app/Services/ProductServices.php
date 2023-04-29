<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

class ProductServices
{
    private $defaultOrderColumn = 'created_at';

    private function tableSettings($request, $slug){
        return new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
    }


    private function paginate_products(Request $request, string $slug)
    {
        $settings = $this->tableSettings($request, $slug);
        $paginate = Product::with('productGroup:id,name')->orderBy($settings->columnKey, $settings->order)->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    private function paginate_products_with_search(Request $request, string $slug)
    {
        $settings = $this->tableSettings($request, $slug);
        $paginate = Product::with('productGroup:id,name')
            ->where($settings->attribute, 'like', '%' . $settings->search . '%')
            ->orderBy($settings->columnKey, $settings->order)
            ->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    public function get_products(Request $request, string $slug)
    {
        return $request->query($slug . '_search')
            ? $this->paginate_products_with_search($request, $slug)
            : $this->paginate_products($request, $slug);
    }


    public function search_in_product_groups(Request $request)
    {
        return ProductGroup::select(['id', 'name'])
            ->where('name', 'like', '%' . $request->product_group_name . '%')
            ->get();
    }
}
