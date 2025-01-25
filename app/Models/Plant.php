<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'country',
    'city'
  ];

  public function meters()
  {
    return $this->hasMany(Meter::class, 'plant_id');
  }

  public function measurements()
  {
    return $this->hasMany(Measurement::class, 'name_id');
  }

  public function fuelTypes()
  {
    return $this->hasMany(FuelEquipment::class, 'type_fuel_id');
  }

  public function fuel()
  {
    return $this->hasMany(Fuel::class, 'plant_id');
  }

  public function approvals()
  {
    return $this->hasMany(Approval::class);
  }

  public function projects()
  {
    return $this->hasMany(Project::class);
  }
}
