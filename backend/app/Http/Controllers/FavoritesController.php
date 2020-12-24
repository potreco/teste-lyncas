<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Services\GoogleBooks;

class FavoritesController extends Controller
{
    public function listFavorites()
    {
        $dbFavorites = Favorite::all();

        $favorites = array();

        foreach ($dbFavorites as $favorite) {
            array_push($favorites, GoogleBooks::getBook($favorite->book_id));
        }

        return response()->json([
            "favorites" => $favorites
        ]);
    }

    public function setFavorite($id)
    {
        $hasFavorite = Favorite::where("book_id", $id)->first();

        if ($hasFavorite) {
            $hasFavorite->delete();
        } else {
            Favorite::insert(["book_id" => $id]);
        }

        return response()->json([
            "success" => true
        ]);
    }
}
