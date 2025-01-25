<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductionByWeightResource extends JsonResource
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
            'date' => (new Carbon($this->date))->format('Y-m-d'),
            'net' => $this->net,
            'total_boxes' => $this->total_boxes,
            'pn_per_box' => $this->pn_per_box,
            ];
    }
}
