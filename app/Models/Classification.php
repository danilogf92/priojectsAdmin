<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classification extends Model
{
  use HasFactory;


  protected $fillable = ['name'];  // El campo que será asignable

  // Relaciones (si se necesitan otras relaciones, como con 'Project')
  public function projects()
  {
    return $this->hasMany(Project::class, 'classification_id');
  }
}
