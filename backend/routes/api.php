<?php

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

Route::prefix('/books')->group(function () {
    Route::get("/", [\App\Http\Controllers\BooksController::class, 'findBooks']);
});

Route::prefix('/favorites')->group(function () {
    Route::get("/", [\App\Http\Controllers\FavoritesController::class, 'listFavorites']);
    Route::post("/{id}", [\App\Http\Controllers\FavoritesController::class, 'setFavorite']);
});
