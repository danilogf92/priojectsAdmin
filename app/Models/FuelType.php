<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function equipment()
    {
        return $this->hasMany(FuelEquipment::class, 'type_fuel_id');
    }
}
