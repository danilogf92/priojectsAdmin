<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'upper_limit',
        'plant_id',
        'type_id',
        'enabled' 
    ];

    // Relación muchos a uno con Plant
    public function plant()
    {
        return $this->belongsTo(Plant::class, 'plant_id');
    }

    // Relación muchos a uno con MeterType
    public function meterType()
    {
        return $this->belongsTo(MeterType::class, 'type_id');
    }

    // Relación uno a muchos con Measurement
    public function measurements()
    {
        return $this->hasMany(Measurement::class, 'meter_id');
    }
}
