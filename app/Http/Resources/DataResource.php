<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'area' => $this->area,
            'project_id' => $this->project_id,
            'group_1' => $this->group_1,
            'group_2' => $this->group_2,
            'description' => $this->description,
            'general_classification' => $this->general_classification,
            'item_type' => $this->item_type,
            'unit' => $this->unit,
            'qty' => $this->qty,
            'unit_price' => $this->unit_price,
            'global_price' => $this->global_price,
            'global_price_euros' => $this->global_price_euros,
            'stage' => $this->stage,
            'real_value' => $this->real_value,
            'real_value_euros' => $this->real_value_euros,
            'booked' => $this->booked,
            'booked_euros' => $this->booked_euros,
            'percentage' => $this->percentage,
            'executed_dollars' => $this->executed_dollars,
            'executed_euros' => $this->executed_euros,
            'supplier' => $this->supplier,
            'code' => $this->code,
            'order_no' => $this->order_no,
            'input_num' => $this->input_num,
            'observations' => $this->observations,
            'real_updated_at' => $this->real_updated_at ? (new Carbon($this->real_updated_at))->format('Y-m-d') : null,
            'booked_updated_at' => $this->booked_updated_at ? (new Carbon($this->booked_updated_at))->format('Y-m-d') : null,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d H:i:s'),
            // Relaciones (si las tienes)
            'project' => $this->whenLoaded('project', function () {
                return [
                    'id' => $this->project->id,
                    'name' => $this->project->name,
                ];
            }),
        ];
    }
}