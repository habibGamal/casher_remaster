<?php

namespace App\Http\Controllers;

use App\Enums\SearchSelectSlug;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

class SearchSelectController extends Controller
{
    public function search($slug, Request $request)
    {
        if ($slug === SearchSelectSlug::product_group->value) return $this->product_group($request);
        return response()->json([
            'options' => []
        ]);
    }

    private function product_group(Request $request)
    {
        return response()->json([
            'options' => ProductGroup::select(['id', 'name'])
                ->where('name', 'like', '%' . $request->value . '%')
                ->get()
        ]);
    }
}
