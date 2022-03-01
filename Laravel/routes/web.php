<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


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
// Route::get('products', [ProdController::class, 'get']);
Route::get('prod', function () {
  return response()->json(['errors'=>'efefew']);
});

// Route::group(['prefix' => 'users', 'middleware' => 'CORS'], function ($router) {

  // Route::post('/login', [UserController::class, 'login'])->name('login.user');
  // Route::get('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
  // Route::get('/logout', [UserController::class, 'logout'])->name('logout.user');
// });
