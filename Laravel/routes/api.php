<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
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

//public
Route::post('users/register',[AuthController::class, 'register']);
Route::post('users/login', [AuthController::class, 'login']);

Route::resource('products', ProductController::class);

Route::group(['middleware'=>['auth:sanctum']], function () {
Route::get('users/logout', [AuthController::class, 'logout']);
Route::post('users/update', [AuthController::class, 'update_user']);
  // Route::get('users/create', [AuthController::class, 'create_project']);
});

