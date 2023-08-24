<?php

use App\Models\AppConfigs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\Autocomplete;
use App\Http\Controllers\Api\StocksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test-connection', function () {
    return response()->json(
        [
            "message" => "Connection successful"
        ],
        200
    );
});


Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});

Route::post("/typing/{text}", function (string $text) {
    if (!AppConfigs::where('value', request()->scanner_code)->exists()) {
        return response()->json(
            [
                "message" => "Invalid scanner code",
            ],
            403
        );
    }
    $textToSend = $text; // Get text data from your Flutter app
    if ($textToSend == 'test_connection') {
        return response()->json(
            [
                "message" => "Connection successful"
            ],
            200
        );
    }
    // Create a Shell object
    $shell = new \COM("WScript.Shell");

    // Send the text as keyboard input
    $shell->SendKeys($textToSend . "{ENTER}");

    // Release the COM object
    $shell = null;
    return response()->json(
        [
            "message" => "Text sent successfully"
        ],
        200
    );
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/autocomplete-product-name',[Autocomplete::class,'productName']);
    Route::get('/product-info-from-all-stocks/{product}',[StocksController::class,'productInfoFromAllStocks']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/test-auth',function(){
        return response()->json(
            [
                "message" => "Authenticated"
            ],
            200
        );
    });
});
