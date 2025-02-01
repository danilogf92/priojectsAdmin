<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Plant;

class PowerBiController extends Controller
{ 
    public function plants()
    {
        $plants = Plant::all();
        return response()->json($plants);
    }     
}
