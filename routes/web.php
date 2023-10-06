<?php

use App\Http\Controllers\OpeningStockController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\Invoices\BuyingInvoiceController;
use App\Http\Controllers\Invoices\ReturnBuyingInvoiceController;
use App\Http\Controllers\Invoices\SellingInvoiceController;
use App\Http\Controllers\Invoices\ReturnSellingInvoiceController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\SalesReportController;
use App\Http\Controllers\SearchSelectController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TrackingStockController;
use App\Http\Controllers\TransferBetweenStocks;
use App\Models\AppConfigs;
use Google\Service\CustomSearchAPI\Search;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
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

require __DIR__ . '/auth.php';

Route::get('/test', [TestController::class, 'index'])->name('test.index');
Route::post('/test', [TestController::class, 'store'])->name('test.store');
Route::post('/test/{product}', [TestController::class, 'update'])->name('test.update');
Route::delete('/test/{product}', [TestController::class, 'delete'])->name('test.delete');
Route::post('/select-search/{slug}', [SearchSelectController::class, 'search']);
// public routing
Route::group(['middleware' => ['auth']], function () {
    Route::get('/', function () {
        return inertia()->render('Home');
    })->name('home');
    // issuing scanner code
    Route::get('/get-scanner-code', function () {
        $code = Hash::make(Str::random(10));
        AppConfigs::updateOrCreate(
            ['key' => AppConfigs::SCANNER_CODE],
            ['value' => $code]
        );
        return response()->json([
            'code' => $code,
            'ip' => '192.168.1.5',
        ]);
    });
    // test
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
    Route::get('/opening-stocks/create', [OpeningStockController::class, 'create'])->name('opening-stocks.index');
    Route::post('/opening-stocks/store', [OpeningStockController::class, 'store']);
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
    // return-selling-invoice
    Route::get('/return-selling-invoice', [ReturnSellingInvoiceController::class, 'index'])->name('return-selling-invoice.index');
    Route::get('/return-selling-invoice/create', [ReturnSellingInvoiceController::class, 'create'])->name('return-selling-invoice.create');
    Route::post('/return-selling-invoice/store', [ReturnSellingInvoiceController::class, 'store']);
    Route::get('/return-selling-invoice/{invoice}', [ReturnSellingInvoiceController::class, 'show']);
    // tracking stocks
    Route::get('/tracking-stocks', [TrackingStockController::class, 'index']);
    // tracking stocks
    Route::get('/transfer-between-stocks', [TransferBetweenStocks::class, 'index']);
    Route::post('/transfer-between-stocks', [TransferBetweenStocks::class, 'store']);
    // product details
    Route::get('/product-details', [ProductDetailsController::class, 'show']);
    // reports
    Route::get('/reports/sales', [SalesReportController::class, 'index']);
    // settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::get('/settings/{command}', [SettingsController::class, 'command'])->name('settings.command');
    Route::post('/settings/update-dns', [SettingsController::class, 'updateDNS'])->name('settings.update-dns');
    // unimplemented
    Route::get('/display-invoices', function () {
        return inertia()->render('Invoices/DisplayInvoices');
    });
});
