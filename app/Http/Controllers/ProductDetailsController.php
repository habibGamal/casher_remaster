<?php

namespace App\Http\Controllers;

use App\Models\BuyingInvoice;
use App\Models\BuyingInvoiceItem;
use App\Models\Product;
use App\Models\ReturnBuyingInvoiceItem;
use App\Models\ReturnSellingInvoiceItem;
use App\Models\SellingInvoiceItem;
use Illuminate\Http\Request;

class ProductDetailsController extends Controller
{
    public function show(Request $request)
    {
        return inertia()->render('Products/ProductDetails', [
            'productData' => function () use ($request) {
                $attribute = $request->attribute;
                $value = $request->value;
                // validate that attribute and value are sent
                if (!$attribute || !$value) {
                    return null;
                }
                $productData = Product::with([
                    'productGroup:id,name',
                    'boxes.stockItems.stock:id,name',
                ])->where([$attribute => $value])->first();
                // get boxes ids
                $boxesIds = $productData->boxes->pluck('id')->toArray();
                // get stock items ids
                $stockItemsIds = $productData->boxes->pluck('stockItems')->flatten()->pluck('id')->toArray();
                $productData->buyingInvoicesItems = BuyingInvoiceItem::whereIn('box_id', $boxesIds)->get();
                $productData->returnBuyingInvoicesItems = ReturnBuyingInvoiceItem::where('product_id', $productData->id)->get();
                $productData->sellingInvoicesItems = SellingInvoiceItem::whereIn('stock_item_id', $stockItemsIds)->get();
                $productData->returnSellingInvoicesItems = ReturnSellingInvoiceItem::where('product_id', $productData->id)->get();
                return $productData;
            },
        ]);
    }
}
