<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'city',
    'phone_business',
    'phone',
    'description',
    'active',
  ];

  public function approvals()
  {
    return $this->hasMany(Approval::class, 'supplier_id');
  }
}
