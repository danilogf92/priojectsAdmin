<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Fuel;
use App\Models\FuelEquipment;
use App\Models\FuelType;
use App\Models\Measurement;
use App\Models\Meter;
use App\Models\MeterType;
use App\Models\Plant;
use App\Models\ProductionByWeight;

class PowerBiController extends Controller
{
    public function measurements()
    {
        $measurements = Measurement::all();

        return response()->json($measurements);
    }

    public function meters()
    {
        $meters = Meter::all();

        return response()->json($meters);
    }

    public function metertypes()
    {
        $metertypes = MeterType::all();

        return response()->json($metertypes);
    }    

    public function plants()
    {
        $plants = Plant::all();

        return response()->json($plants);
    }     

    public function production()
    {
        $production = ProductionByWeight::all();

        return response()->json($production);
    }       

    public function fuel()
    {
        $fuel = Fuel::all();

        return response()->json($fuel);
    }      

    public function fuelTypes()
    {
        $fuelType = FuelType::all();

        return response()->json($fuelType);
    }    

    public function fuelEquipment()
    {
        $fuelEquipment = FuelEquipment::all();

        return response()->json($fuelEquipment);
    }      
    
}
