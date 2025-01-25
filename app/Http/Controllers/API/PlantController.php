<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Plant;
use Illuminate\Http\Request;

class PlantController extends Controller
{
    public function index()
    {
        $plants = Plant::orderBy('name', 'ASC')->get();
        return response()->json(['plants' => $plants]);
    }
}
