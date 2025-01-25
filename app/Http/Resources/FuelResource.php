<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuelResource extends JsonResource
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
      'fuel_equipment_id' => $this->fuelEquipment->name,
      'fuel_equipment_units' => $this->fuelEquipment->units,
      'plant_id' => $this->plant->name,
      'date' => (new Carbon($this->date))->format('Y-m-d'),
      'start_value' => $this->start_value,
      'end_value' => $this->end_value,
      'difference' => $this->difference,
      'kw_start_value' => $this->kw_start_value,
      'kw_end_value' => $this->kw_end_value,
      'kw_difference' => $this->kw_difference,
      'hour_start_value' => $this->hour_start_value,
      'hour_end_value' => $this->hour_end_value,
      'hour_difference' => $this->hour_difference
    ];
  }
}
