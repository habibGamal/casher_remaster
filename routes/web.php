<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\OpeningStockItemController;
use App\Mail\Feedback;
use App\Models\Exam;
use App\Models\ProductGroup;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
    return Inertia::render('Home');
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
// product
Route::get('/stocks', [StockController::class, 'index'])->name('stocks.index');
Route::post('/stocks/store', [StockController::class, 'store']);
Route::post('/stocks/update/{stock}', [StockController::class, 'update']);
Route::delete('/stocks/{stock}', [StockController::class, 'delete']);
// opening-stock
Route::get('/opening-stocks', [OpeningStockItemController::class, 'index'])->name('opening-stocks.index');
Route::post('/opening-stocks/store', [OpeningStockItemController::class, 'store']);
Route::post('/opening-stocks/update/{openingStock}', [OpeningStockItemController::class, 'update']);
Route::delete('/opening-stocks/{openingStock}', [OpeningStockItemController::class, 'delete']);

