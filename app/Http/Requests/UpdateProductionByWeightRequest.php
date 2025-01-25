<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductionByWeightRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  // public function rules()
  // {
  //   return [
  //     // 'date' => 'required|date',
  //     'date' => 'required|date|unique:production_by_weights,date',
  //     'net' => 'required|numeric|min:0',
  //     'total_boxes' => 'required|numeric|min:0',
  //     'pn_per_box' => 'required|numeric|min:0',
  //   ];
  // }

  public function rules()
  {
    return [
      // Excluye el ID actual en la validación de unicidad.
      'date' => 'required|date|unique:production_by_weights,date,' . $this->production_by_weight->id,
      'net' => 'required|numeric|min:0',
      'total_boxes' => 'required|numeric|min:0',
      'pn_per_box' => 'required|numeric|min:0',
    ];
  }


  /**
   * Get custom messages for validator errors.
   *
   * @return array<string, string>
   */
  public function messages()
  {
    return [
      'date.required' => 'The date field is required.',
      'date.date' => 'The date field must be a valid date.',
      'net.required' => 'The net field is required.',
      'net.numeric' => 'The net field must be a numeric value.',
      'net.min' => 'The net field must be at least 0.',
      'total_boxes.required' => 'The total boxes field is required.',
      'total_boxes.numeric' => 'The total boxes field must be a numeric value.',
      'total_boxes.min' => 'The total boxes field must be at least 0.',
      'pn_per_box.required' => 'The PN per box field is required.',
      'pn_per_box.numeric' => 'The PN per box field must be a numeric value.',
      'pn_per_box.min' => 'The PN per box field must be at least 0.',
    ];
  }
}
