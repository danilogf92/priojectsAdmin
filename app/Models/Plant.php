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

  public function approvals()
  {
    return $this->hasMany(Approval::class);
  }

  public function projects()
  {
    return $this->hasMany(Project::class);
  }
}
