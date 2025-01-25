<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionByWeight extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'net',
        'total_boxes',
        'pn_per_box',
    ];

    protected $casts = [
        'net' => 'float',
        'total_boxes' => 'float',
        'pn_per_box' => 'float',
    ];

    public function getNetAttribute($value)
    {
        return number_format($value, 3, '.', '');
    }

    public function getTotalBoxesAttribute($value)
    {
        return number_format($value, 3, '.', '');
    }

    public function getPnPerBoxAttribute($value)
    {
        return number_format($value, 3, '.', '');
    }

    public function setNetAttribute($value)
    {
        $this->attributes['net'] = round($value, 3);
    }

    public function setTotalBoxesAttribute($value)
    {
        $this->attributes['total_boxes'] = round($value, 3);
    }

    public function setPnPerBoxAttribute($value)
    {
        $this->attributes['pn_per_box'] = round($value, 3);
    }
}
