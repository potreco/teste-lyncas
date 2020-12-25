<?php

namespace App\Http\Controllers;

use App\Services\GoogleBooks;
use Illuminate\Http\Request;

class BooksController extends Controller
{

    public function findBooks(Request $request)
    {
        try {
            $search = $request->search;

            if(!$search) throw new \Exception("Digite algo na busca.");

            $response = GoogleBooks::getBooks($search);

            return response()->json([
                "totalBooks" => count($response),
                "books" => $response
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "status" => "error",
                "message" => $ex->getMessage()
            ], 500);
        }
    }
}
