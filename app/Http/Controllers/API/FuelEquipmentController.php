<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FuelEquipment;
use App\Models\Fuel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FuelEquipmentController extends Controller
{
    public function index(Request $request)
    {

        $date = Carbon::parse($request->query('date')); // Usar la fecha del query string

        $measurements = Fuel::whereDate('date', $date)
                        ->distinct()
                        ->select('fuel_equipment_id', 'plant_id')                    
                        ->get();

        $measurementMeterIds = $measurements->pluck('fuel_equipment_id');                    

        
        $equipments = FuelEquipment::where('enabled', 1)
               ->orderBy('id', 'ASC')
                ->get()
                ->filter(function ($equipments) use ($measurementMeterIds) {
                    return !$measurementMeterIds->contains($equipments->id);
                });                 

        return response()->json(['equipments' => $equipments]);
    }
}
