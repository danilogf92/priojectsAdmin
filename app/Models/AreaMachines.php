<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaMachines extends Model
{
  use HasFactory;

  // Define la tabla asociada si el nombre no sigue la convención plural
  protected $table = 'area_machines';

  // Define los atributos que se pueden asignar masivamente
  protected $fillable = [
    'plant_id',
    'nombre',
    'descripcion',
    'activo',
  ];

  // Relación con el modelo Plant (suponiendo que tienes un modelo Plant)
  public function plant()
  {
    return $this->belongsTo(Plant::class);
  }

  public function approvals()
  {
    return $this->hasMany(Approval::class, 'area_machine_id');
  }
}
