<?php

namespace App\Services;

use App\Models\ProductGroup;
use Illuminate\Http\Request;

class ProductGroupServices
{
    public $defaultOrderColumn = 'created_at';

    public function paginate(Request $request)
    {
        $order = $request->order ?? 'desc';
        $columnKey = $request->order ? $request->columnKey : $this->defaultOrderColumn;
        $paginate = ProductGroup::withCount('products')->orderBy($columnKey, $order)->paginate($request->pageSize ?? 10);
        return $paginate;
    }

    public function paginateWithSearch(Request $request)
    {
        $order = $request->order ?? 'desc';
        $columnKey = $request->order ? $request->columnKey : $this->defaultOrderColumn;
        $paginate = ProductGroup::withCount('products')->where($request->attribute, 'like', '%' . $request->search . '%')
            ->orderBy($columnKey, $order)
            ->paginate($request->pageSize ?? 10);
        return $paginate;
    }
}
