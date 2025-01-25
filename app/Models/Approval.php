<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
  use HasFactory;

  // Asegúrate de incluir 'supplier_id' en $fillable
  protected $fillable = [
    'fechaEjecucion',
    'desde',
    'hasta',
    'inspectorSSA',
    'user_id',
    'plant_id',
    'area_machine_id',
    'supplier_id',
    'descripcionTrabajo',
    'condiciones',
    'TrabajosIncompatible',
    'RiesgosFactores',
    'TrabajosElectricos',
    'TrabajosDeSoldadura',
    'TrabajosEnAlturas',
    'Escalera',
    'Montacargas',
    'Andamios',
    'Techo',
    'TrabajosDentroCocinadores',
    'TrabajosTransportar',
    'TrabajosLevantarObjetos',
  ];

  // Relaciones
  public function plant()
  {
    return $this->belongsTo(Plant::class);
  }

  public function areaMachine()
  {
    return $this->belongsTo(AreaMachines::class, 'area_machine_id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  // Nueva relación con Supplier
  public function supplier()
  {
    return $this->belongsTo(Supplier::class, 'supplier_id');
  }

  // Castea 'condiciones' a un array
  protected $casts = [
    'condiciones' => 'array',
  ];
}
