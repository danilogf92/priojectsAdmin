<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Measurement;
use App\Models\Meter;
use App\Models\MeterType;
use App\Models\Plant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $summary = Measurement::selectRaw('plant_id, SUM(difference) as total_difference')
            ->with('plant')
            ->groupBy('plant_id')
            ->get();

        $lastYear = Measurement::orderBy('date', 'desc')
            ->value(DB::raw('YEAR(date)'));

        $lastMonth = Measurement::whereYear('date', $lastYear)
            ->orderBy('date', 'desc')
            ->value(DB::raw('MONTH(date)'));

        // Obtener las mediciones por mes del último año con el nombre del mes
        $measurementsByMonth  = Measurement::selectRaw('YEAR(date) as year, MONTH(date) as month, MONTHNAME(date) as month_name, SUM(difference) as total_difference')
            ->whereYear('date', $lastYear)
            ->groupBy('year', 'month', 'month_name')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'asc')
            ->get();
            
        $chartData = $measurementsByMonth->map(function ($item) {
                return [
                    'name' => $item->month_name,
                    'Consumption by month m³' => (int) $item->total_difference,
                ];
            });

        $lastMonthData = Measurement::selectRaw('plant_id, DAY(date) as day, SUM(difference) as total_difference')
            ->whereYear('date', $lastYear)
            ->whereMonth('date', $lastMonth)
            ->groupBy('plant_id', 'day')
            ->orderBy('day', 'asc')
            ->get();

        $dataByDay = [];

        foreach ($lastMonthData as $measurement) {
            $plantId = $measurement->plant_id;
            $day = $measurement->day;
            $totalDifference = (int) $measurement->total_difference;

            // Construir la clave de fecha en el formato deseado (por ejemplo, 'Jan 22')
            $dateKey = date('M d', mktime(0, 0, 0, $lastMonth, $day));

            // Obtener el nombre de la planta según plant_id
            $plantName = $plantId == 1 ? 'Ciesa 1' : 'Ciesa 2';

            // Agregar datos por día y por nombre de planta
            if (!isset($dataByDay[$dateKey])) {
                $dataByDay[$dateKey] = [
                    'date' => $dateKey,
                ];
            }

            // Asignar el total_difference al nombre de planta correspondiente
            $dataByDay[$dateKey][$plantName] = $totalDifference;
        }

// Convertir el array asociativo en un array numérico para mantener el orden
        $result = array_values($dataByDay);

$values = Measurement::selectRaw('
        plants.name as plant_name,
        meter_types.type as meter_type,
        SUM(measurements.difference) as total_difference
    ')
    ->join('plants', 'measurements.plant_id', '=', 'plants.id')
    ->join('meters', 'measurements.meter_id', '=', 'meters.id')
    ->join('meter_types', 'meters.type_id', '=', 'meter_types.id')
    ->groupBy('plants.name', 'meter_types.type')
    ->orderBy('total_difference', 'desc') // Ordenar por total_difference en orden descendente (mayor a menor)
    ->get();


$totals = [];
$data_by_plant = [];

// Primera pasada: calcular los totales de cada planta
foreach ($values as $value) {
    if (!isset($totals[$value->plant_name])) {
        $totals[$value->plant_name] = 0;
    }
    $totals[$value->plant_name] += $value->total_difference;

    if (!isset($data_by_plant[$value->plant_name])) {
        $data_by_plant[$value->plant_name] = [];
    }
    $data_by_plant[$value->plant_name][] = $value;
}

// Segunda pasada: calcular los porcentajes y construir el resultado final
$result_final = [];

$colors = [
    "bg-amber-500",
    "bg-green-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-fuchsia-500",
];

foreach ($data_by_plant as $plant_name => $values) {
    $current_plant_data = [];
    $current_plant_total = $totals[$plant_name];

    foreach ($values as $index => $value) {
        // Escoger un color basado en el índice de la plantilla
        $color_index = $index % count($colors);
        $color = $colors[$color_index];

        // Calcular el share como porcentaje del total de la planta actual
        $share = ($value->total_difference / $current_plant_total) * 100;

        $current_plant_data[] = [
            'name' => "{$value->meter_type}",
            'amount' => (int)$value->total_difference,
            'share' => number_format($share, 2) . '%',
            'color' => $color,
        ];
    }

    $result_final[] = [
        'plant_name' => $plant_name,
        'data' => $current_plant_data,
        'total' => $current_plant_total,
    ];
}

        return Inertia::render('Dashboard', [
            'summary' => $summary,
            'summary2' => $measurementsByMonth,
            'chartData' => $chartData,
            'lastMonthData' => $result,
            'total' => $result_final,
        ]);
    }
}
