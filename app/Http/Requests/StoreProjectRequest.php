<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'pda_code' => 'required|string|max:255',
            'data_uploaded' => 'required|boolean',
            'rate' => 'nullable|numeric',
            'plant_id' => 'required|exists:plants,id',
            'user_id' => 'required|exists:users,id',
            'state_id' => 'required|exists:states,id',
            'justification_id' => 'required|exists:justifications,id',
            'investment_id' => 'required|exists:investments,id',
            'classification_id' => 'required|exists:classifications,id',
            'start_date' => 'required|date',
            'finish_date' => 'required|date',
        ];
    }
}
