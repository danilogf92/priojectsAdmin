<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;
    use Filterable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'data';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'area',
        'project_id',
        'group_1',
        'group_2',
        'description',
        'general_classification',
        'item_type',
        'unit',
        'qty',
        'unit_price',
        'global_price',
        'global_price_euros',
        'stage',
        'real_value',
        'real_value_euros',
        'booked',
        'booked_euros',
        'percentage',
        'executed_dollars',
        'executed_euros',
        'supplier',
        'code',
        'order_no',
        'input_num',
        'observations',
        'real_updated_at',
        'booked_updated_at',
    ];

    /**
     * Get the project that owns the data.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}