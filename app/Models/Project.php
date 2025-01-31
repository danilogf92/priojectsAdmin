<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  use HasFactory;
  use Filterable;

  /**
   * Los atributos que son asignables de manera masiva.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'pda_code',
    'data_uploaded',
    'rate',
    'plant_id',
    'user_id',
    'state_id',
    'justification_id',
    'investment_id',
    'classification_id',
    'start_date',
    'finish_date',
  ];

  // Definir la relación con la tabla 'states'
  public function state()
  {
    return $this->belongsTo(State::class);
  }

  // Definir la relación con la tabla 'justifications'
  public function justification()
  {
    return $this->belongsTo(Justification::class);
  }

  // Definir la relación con la tabla 'investments'
  public function investment()
  {
    return $this->belongsTo(Investment::class);
  }

  // Definir la relación con la tabla 'classification_of_investments'
  public function classification()
  {
    return $this->belongsTo(Classification::class);
  }

  // Define la relacion con la planta 1 a 1
  public function plant()
  {
    return $this->belongsTo(Plant::class, 'plant_id');
  }

  // Define la relacion con la planta 1 a 1
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
