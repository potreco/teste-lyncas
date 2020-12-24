<?php

namespace App\Services;

use App\Models\Favorite;
use Illuminate\Support\Facades\Http;

class GoogleBooks
{
    const URL = 'https://www.googleapis.com/books/v1';

    public static function getBooks($search)
    {
        $response = Http::get(self::URL . "/volumes", [
            "q" => $search
        ]);

        $decodedBody = json_decode($response->body());
        $responseData = array();

        if ($decodedBody->totalItems > 0) {
            foreach ($decodedBody->items as $item) {
                array_push($responseData, self::formatResponse($item));
            }
        }

        return $responseData;
    }

    private static function formatResponse($item)
    {
        $image = isset($item->volumeInfo->imageLinks) ? $item->volumeInfo->imageLinks->thumbnail : null;

        $description = $item->volumeInfo->description ?? "";

        $arr = [
            "id" => $item->id,
            "title" => $item->volumeInfo->title,
            "description" => $description,
            "thumbnail" => $image,
            "favorite" => !!Favorite::where("book_id", $item->id)->first()
        ];

        return $arr;
    }

    public static function getBook($id)
    {
        $response = Http::get(self::URL . "/volumes/$id");

        $item = json_decode($response->body());

        return self::formatResponse($item);
    }
}
