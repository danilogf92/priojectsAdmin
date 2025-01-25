<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
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
      'plant_id' => $this->plant->name,
      'meter_id' => $this->meter->name,
      'upper_limit' => $this->meter->upper_limit,
      'start_value' => $this->start_value,
      'end_value' => $this->end_value,
      'difference' => $this->difference,
      'date' => (new Carbon($this->date))->format('Y-m-d')
    ];
  }
}
