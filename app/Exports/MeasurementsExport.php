<?php

namespace App\Exports;

use App\Models\Measurement;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Carbon;

class MeasurementsExport implements FromQuery, WithMapping, WithHeadings
{
    use Exportable;

    public function query()
    {
        return Measurement::select(
            'plants.name as plant_name',
            'meters.name as meter_name',
            'meter_types.type as meter_type',
            'measurements.start_value',
            'measurements.end_value',
            'measurements.difference',
            'measurements.date'
        )
        ->join('plants', 'measurements.plant_id', '=', 'plants.id')
        ->join('meters', 'measurements.meter_id', '=', 'meters.id')
        ->join('meter_types', 'meters.type_id', '=', 'meter_types.id');
    }

    public function map($measurement): array
    {
        return [
            $measurement->plant_name,
            $measurement->meter_name,
            $measurement->meter_type,
            $measurement->start_value,
            $measurement->end_value,
            $measurement->difference,
            Carbon::parse($measurement->date)->format('n/j/Y'), 
        ];
    }

    public function headings(): array
    {
        return [
            'Planta',
            'Medidor',
            'Tipo de Medidor',
            'Valor inicial',
            'Valor final',
            'Diferencia',
            'Fecha',
        ];
    }
}
