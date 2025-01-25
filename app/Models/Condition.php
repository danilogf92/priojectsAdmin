<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
  use HasFactory;

  // Nombre de la tabla asociada al modelo
  protected $table = 'conditions';

  // Atributos que se pueden asignar en masa (mass assignable)
  protected $fillable = [
    'nombre',
    'cumple',
    'observaciones',
    'active',
  ];

  // Atributos predeterminados
  protected $attributes = [
    'active' => true,
  ];
}
