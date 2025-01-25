<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Measurement;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LastValueController extends Controller
{
    public function index(Request $request)
    {
        $date = Carbon::parse($request->query('date'));

        $meterId = intval($request->query('meter'));

        $lastMeasurement = Measurement::whereDate('date', $date->toDateString())
                            ->where('meter_id', $meterId) 
                            ->get();                        

        return response()->json(['measurement' => $lastMeasurement]);
    }
}
