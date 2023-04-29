<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductGroup;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductGroupServices
{
    public $defaultOrderColumn = 'created_at';

    public function get_product_groups(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $elquentBuilder = ProductGroup::withCount('products');
        if ($settings->isSearch()) {
            $elquentBuilder->where($settings->attribute, 'like', '%' . $settings->search . '%');
        }
        $elquentBuilder->orderBy($settings->columnKey, $settings->order);
        $data = $elquentBuilder->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $data;
    }


    public function get_products_in_groups(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $elquentBuilder =  Product::where('product_group_id', $request->productGroupId);
        if ($settings->isSearch()) {
            $elquentBuilder->where($settings->attribute, 'like', '%' . $settings->search . '%');
        }
        $elquentBuilder->orderBy($settings->columnKey, $settings->order);
        $data = $elquentBuilder->paginate($settings->pageSize, ['*'], $slug . '_page');

        return $data;
    }
}
