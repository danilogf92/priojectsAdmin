<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovalResource extends JsonResource
{
  /**
   * Transforma los datos del modelo Approval en un array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array<string, mixed>
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'fechaEjecucion' => (new Carbon($this->fechaEjecucion))->format('Y-m-d'),
      'plant' => $this->plant->name,
      'areaMaquina' => $this->areaMachine->nombre,
      'ejecutorTrabajo' => $this->supplier->name,
      'supplier_id' => $this->supplier->id,
      'descripcionTrabajo' => $this->descripcionTrabajo,
      'TrabajosEnAlturas' => $this->TrabajosEnAlturas
    ];
  }
}
