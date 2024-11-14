<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/page/{page}', [UserController::class, 'pagination']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/types', [TypeController::class, 'index']);
Route::get('/types/page/{page}', [TypeController::class, 'pagination']);
Route::get('/types/{id}', [TypeController::class, 'show']);

Route::get('/accounts', [AccountController::class, 'index']);
Route::get('/accounts/page/{page}', [AccountController::class, 'pagination']);
Route::get('/accounts/{id}', [AccountController::class, 'show']);

Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/transactions/page/{page}', [TransactionController::class, 'pagination']);
Route::get('/transactions/{id}', [TransactionController::class, 'show']);

Route::post('/register', [UserAuthController::class, 'register']);
Route::post('/login', [UserAuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::resource('/types', TypeController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/accounts', AccountController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/transactions', TransactionController::class)
        ->only(['store', 'update', 'destroy']);

    Route::post('/logout', [UserAuthController::class, 'logout']);
});
