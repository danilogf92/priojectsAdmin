<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fuel extends Model
{
  use HasFactory;

  protected $fillable = [
    'plant_id',
    'fuel_equipment_id',
    'date',
    'start_value',
    'end_value',
    'difference',
    'kw_start_value',
    'kw_end_value',
    'kw_difference',
    'hour_start_value',
    'hour_end_value',
    'hour_difference'
  ];

  public function fuelEquipment()
  {
    return $this->belongsTo(FuelEquipment::class, 'fuel_equipment_id');
  }

  public function plant()
  {
    return $this->belongsTo(Plant::class, 'plant_id');
  }
}
