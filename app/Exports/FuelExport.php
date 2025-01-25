<?php

namespace App\Exports;

use App\Models\Fuel;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Support\Carbon;

class FuelExport implements FromQuery, WithMapping, WithHeadings
{
  use Exportable;

  public function query()
  {
    return Fuel::query()
      ->select(
        'fuel_equipment.name as fuel_equipment_name',
        'fuels.date',
        'fuels.start_value',
        'fuels.end_value',
        'fuels.difference',
        'fuels.kw_start_value',
        'fuels.kw_end_value',
        'fuels.kw_difference',
        'fuels.hour_start_value',
        'fuels.hour_end_value',
        'fuels.hour_difference',
        'plants.name as plant_name',
        'fuel_types.name as fuel_type_name',
        'fuel_equipment.units'
      )
      ->join('plants', 'fuels.plant_id', '=', 'plants.id')
      ->join('fuel_equipment', 'fuels.fuel_equipment_id', '=', 'fuel_equipment.id')
      ->join('fuel_types', 'fuel_equipment.type_fuel_id', '=', 'fuel_types.id');
  }

  public function map($fuel): array
  {
    return [
      $fuel->plant_name,               // Planta
      $fuel->fuel_equipment_name,      // Nombre del Equipo
      $fuel->start_value,              // Inicio
      $fuel->end_value,                // Final
      $fuel->difference,               // Diferencia
      $fuel->units,                    // Unidades
      $fuel->kw_start_value,           // Inicio KW/h
      $fuel->kw_end_value,             // Final KW/h
      $fuel->kw_difference,            // Diferencia KW/h
      $fuel->hour_start_value,         // Inicio Horas
      $fuel->hour_end_value,           // Final Horas
      $fuel->hour_difference,          // Diferencia Horas
      $fuel->fuel_type_name,           // Tipo de Combustible
      Carbon::parse($fuel->date)->format('n/j/Y'), // Fecha
    ];
  }

  public function headings(): array
  {
    return [
      'Planta',
      'Nombre del Equipo',
      'Consumo Inicio',
      'Consumo Final',
      'Diferencia Consumo',
      'Unidades',
      'Inicio KW/h',
      'Final KW/h',
      'Dia KW/h',
      'Inicio Horas',
      'Final Horas',
      'Diferencia Horas',
      'Tipo de Combustible',
      'Fecha',
    ];
  }
}
