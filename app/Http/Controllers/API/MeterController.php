<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Measurement;
use App\Models\Meter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MeterController extends Controller
{
    public function index(Request $request)
    {
    $date = Carbon::parse($request->query('date')); // Usar la fecha del query string

    $measurements = Measurement::whereDate('date', $date)
                    ->distinct()
                    ->select('meter_id', 'plant_id')                    
                    ->get();

    $measurementMeterIds = $measurements->pluck('meter_id');                    

    $meters = Meter::where('enabled', 1)
               ->orderBy('id', 'ASC')
            //    ->select('id', 'plant_id')
               ->get()
               ->filter(function ($meter) use ($measurementMeterIds) {
                   return !$measurementMeterIds->contains($meter->id);
               });                 

    return response()->json(['meters' => $meters]);
    }
}
