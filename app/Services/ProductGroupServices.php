<?php

namespace App\Services;

use App\Models\ProductGroup;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductGroupServices
{
    public $defaultOrderColumn = 'created_at';

    private function paginate_product_groups(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = ProductGroup::withCount('products')->orderBy($settings->columnKey, $settings->order)->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    private function paginate_product_groups_with_search(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug, $this->defaultOrderColumn);
        $paginate = ProductGroup::withCount('products')
            ->where($settings->attribute, 'like', '%' . $settings->search . '%')
            ->orderBy($settings->columnKey, $settings->order)
            ->paginate($settings->pageSize, ['*'], $slug . '_page');
        return $paginate;
    }

    public function get_product_groups(Request $request, string $slug)
    {
        return $request->query($slug . '_search')
            ? $this->paginate_product_groups_with_search($request, $slug)
            : $this->paginate_product_groups($request, $slug);
    }


    private function search_products_in_groups(Request $request, string $slug)
    {
        $settings = new TableSettingsServices($request, $slug);
        $data = ProductGroup::select(['id'])->with(['products' => function (Builder $query) use ($settings) {
            $query->select(['id','name','barcode','product_group_id'])->where('name', 'like', '%' . $settings->search . '%');
        }])->find($request->productGroupId);
        // dump($data);
        return $data;
    }
    private function products_in_groups(Request $request, string $slug)
    {
        return ProductGroup::select(['id'])->with('products:id,name,barcode,product_group_id')->find($request->productGroupId);
    }
    public function get_products_in_groups(Request $request, string $slug)
    {
        return $request->query($slug . '_search')
            ? $this->search_products_in_groups($request, $slug)
            : $this->products_in_groups($request, $slug);
    }
}
