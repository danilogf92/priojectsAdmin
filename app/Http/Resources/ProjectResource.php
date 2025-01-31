<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
      'name' => $this->name,
      'code' => $this->pda_code,
      'file' => $this->data_uploaded,
      'rate' => $this->rate,
      'plant' => $this->plant->name,
      'user' => $this->user->name,
      'state' => $this->state->name,
      'justification' => $this->justification->name,
      'investment' => $this->investment->name,
      'classification' => $this->classification->name,
      'start_date' => (new Carbon($this->start_date))->format('Y-m-d'),
      'finish_date' => (new Carbon($this->finish_date))->format('Y-m-d'),
    ];
  }
}
