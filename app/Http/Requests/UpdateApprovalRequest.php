<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApprovalRequest extends FormRequest
{
  // Determina si el usuario está autorizado a realizar esta solicitud
  public function authorize(): bool
  {
    return true; // Ajusta según tu lógica de autorización
  }

  // Define las reglas de validación para la actualización
  public function rules(): array
  {
    return [
      'fechaEjecucion' => 'sometimes|required|date',
      'desde' => 'sometimes|required|string|max:255',
      'hasta' => 'sometimes|required|string|max:255',
      'inspectorSSA' => 'sometimes|required|string|max:255',
      'plant_id' => 'sometimes|required|exists:plants,id',
      'user_id' => 'required|exists:users,id',
      'area_machine_id' => 'sometimes|required|exists:area_machines,id',
      'supplier_id' => 'sometimes|required|exists:suppliers,id', // Nuevo campo
      'descripcionTrabajo' => 'sometimes|required|string|max:1000',
      'condiciones' => 'sometimes|required|array',
      'TrabajosIncompatible' => 'nullable|string|max:255',
      'RiesgosFactores' => 'nullable|string|max:255',

      // Validaciones para campos booleanos (SI/NO)
      'TrabajosElectricos' => 'sometimes|required|string|in:SI,NO',
      'TrabajosDeSoldadura' => 'sometimes|required|string|in:SI,NO',
      'TrabajosEnAlturas' => 'sometimes|required|string|in:SI,NO',
      'Escalera' => 'sometimes|required|string|in:SI,NO',
      'Montacargas' => 'sometimes|required|string|in:SI,NO',
      'Andamios' => 'sometimes|required|string|in:SI,NO',
      'Techo' => 'sometimes|required|string|in:SI,NO',
      'TrabajosDentroCocinadores' => 'sometimes|required|string|in:SI,NO',
      'TrabajosTransportar' => 'sometimes|required|string|in:SI,NO',
      'TrabajosLevantarObjetos' => 'sometimes|required|string|in:SI,NO',
    ];
  }

  // Personaliza los mensajes de error
  public function messages(): array
  {
    return [
      'fechaEjecucion.required' => 'La fecha de ejecución es obligatoria.',
      'desde.required' => 'El campo "Desde" es obligatorio.',
      'hasta.required' => 'El campo "Hasta" es obligatorio.',
      'inspectorSSA.required' => 'El campo "Inspector SSA" es obligatorio.',
      'plant_id.required' => 'El campo "Planta" es obligatorio.',
      'plant_id.exists' => 'La planta seleccionada no existe.',
      'user_id.required' => 'El campo "User" es obligatorio.',
      'user_id.exists' => 'El usuario seleccionado no existe.',
      'area_machine_id.required' => 'El campo "Área de Máquina" es obligatorio.',
      'area_machine_id.exists' => 'El área de máquina seleccionada no existe.',
      'supplier_id.required' => 'El campo "Proveedor" es obligatorio.', // Nuevo mensaje
      'supplier_id.exists' => 'El proveedor seleccionado no existe.', // Nuevo mensaje
      'descripcionTrabajo.required' => 'La descripción del trabajo es obligatoria.',
      'descripcionTrabajo.max' => 'La descripción no debe exceder los 1000 caracteres.',
      'condiciones.required' => 'Las condiciones son obligatorias.',
      'TrabajosElectricos.required' => 'El campo "Trabajos Eléctricos" es obligatorio.',
      'TrabajosDeSoldadura.required' => 'El campo "Trabajos de Soldadura" es obligatorio.',
      'TrabajosEnAlturas.required' => 'El campo "Trabajos en Alturas" es obligatorio.',
      'Escalera.required' => 'El campo "Escalera" es obligatorio.',
      'Montacargas.required' => 'El campo "Montacargas" es obligatorio.',
      'Andamios.required' => 'El campo "Andamios" es obligatorio.',
      'Techo.required' => 'El campo "Techo" es obligatorio.',
      'TrabajosDentroCocinadores.required' => 'El campo "Trabajos dentro de Cocinadores" es obligatorio.',
      'TrabajosTransportar.required' => 'El campo "Trabajos a Transportar" es obligatorio.',
      'TrabajosLevantarObjetos.required' => 'El campo "Trabajos a Levantar Objetos" es obligatorio.',
    ];
  }
}
