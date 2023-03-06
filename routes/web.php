<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGroupController;
use App\Http\Controllers\StudentController;
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
    return Inertia::render('products/Products');
})->name('home');
// product
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
// Route::get('/products/search', [ProductController::class, 'search'])->name('products.search');
Route::post('/products/store', [ProductController::class, 'store']);
Route::post('/products/update/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'delete']);
// product-group
Route::get('/product-groups', [ProductGroupController::class, 'index'])->name('product-groups.index');
Route::get('/product-groups/search', [ProductGroupController::class, 'search'])->name('product-groups.search');
Route::get('/product-groups/{productGroup}', [ProductGroupController::class, 'show'])->name('product-groups.index');
