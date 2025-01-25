<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Fuel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FuelLastValueController extends Controller
{
    public function index(Request $request)
    {
        $date = Carbon::parse($request->query('date'));

        $equipment = intval($request->query('equipment'));

        $lastMeasurement = Fuel::whereDate('date', $date->toDateString())
                            ->where('fuel_equipment_id', $equipment) 
                            ->get();                        

        return response()->json(['measurement' => $lastMeasurement]);
    }
}
