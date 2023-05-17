<?php

use App\Http\Controllers\OpeningStockController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\Invoices\BuyingInvoiceController;
use App\Http\Controllers\Invoices\ReturnBuyingInvoiceController;
use App\Http\Controllers\Invoices\SellingInvoiceController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TrackingStockController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// public routing

Route::get('/', function () {
    return inertia()->render('Home');
})->name('home');
// product
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/remove-product-from-group/{product}', [ProductController::class, 'remove_product_from_group']);
Route::post('/products/store', [ProductController::class, 'store']);
Route::post('/products/update/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'delete']);
// product-group
Route::get('/product-groups', [ProductGroupController::class, 'index'])->name('product-groups.index');
Route::post('/product-groups/store', [ProductGroupController::class, 'store']);
Route::post('/product-groups/update/{productGroup}', [ProductGroupController::class, 'update']);
Route::get('/product-groups/display-products-in-group', [ProductGroupController::class, 'display_products_in_group']);
Route::delete('/product-groups/{productGroup}', [ProductGroupController::class, 'delete']);
// stocks
Route::get('/stocks', [StockController::class, 'index'])->name('stocks.index');
Route::post('/stocks/store', [StockController::class, 'store']);
Route::post('/stocks/update/{stock}', [StockController::class, 'update']);
Route::delete('/stocks/{stock}', [StockController::class, 'delete']);
// opening-stock
Route::get('/opening-stocks', [OpeningStockController::class, 'index'])->name('opening-stocks.index');
Route::post('/opening-stocks/store', [OpeningStockController::class, 'store']);
Route::post('/opening-stocks/update/{openingStock}', [OpeningStockController::class, 'update']);
Route::delete('/opening-stocks/{openingStock}', [OpeningStockController::class, 'delete']);
// buying-invoice
Route::get('/buying-invoice', [BuyingInvoiceController::class, 'index'])->name('buying-invoice.index');
Route::get('/buying-invoice/create', [BuyingInvoiceController::class, 'create'])->name('buying-invoice.create');
Route::post('/buying-invoice/store', [BuyingInvoiceController::class, 'store']);
Route::get('/buying-invoice/{invoice}', [BuyingInvoiceController::class, 'show']);
// return-buying-invoice
Route::get('/return-buying-invoice', [ReturnBuyingInvoiceController::class, 'index'])->name('return-buying-invoice.index');
Route::get('/return-buying-invoice/create', [ReturnBuyingInvoiceController::class, 'create'])->name('return-buying-invoice.create');
Route::post('/return-buying-invoice/store', [ReturnBuyingInvoiceController::class, 'store']);
Route::get('/return-buying-invoice/{invoice}', [ReturnBuyingInvoiceController::class, 'show']);
// selling-invoice
Route::get('/selling-invoice', [SellingInvoiceController::class, 'index'])->name('selling-invoice.index');
Route::get('/selling-invoice/create', [SellingInvoiceController::class, 'create'])->name('selling-invoice.create');
Route::post('/selling-invoice/store', [SellingInvoiceController::class, 'store']);
Route::get('/selling-invoice/{invoice}', [SellingInvoiceController::class, 'show']);
// tracking stocks
Route::get('/tracking-stocks', [TrackingStockController::class, 'index']);
// settings
Route::get('/settings', function () {
    return inertia()->render('Settings');
})->name('settings.index');
// unimplemented
Route::get('/display-invoices', function () {
    return inertia()->render('invoices/DisplayInvoices');
});
