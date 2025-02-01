<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'pda_code' => 'sometimes|string|max:255',
            'data_uploaded' => 'required|boolean',
            'rate' => 'nullable|numeric',
            'plant_id' => 'sometimes|exists:plants,id',
            'user_id' => 'sometimes|exists:users,id',
            'state_id' => 'sometimes|exists:states,id',
            'justification_id' => 'sometimes|exists:justifications,id',
            'investment_id' => 'sometimes|exists:investments,id',
            'classification_id' => 'sometimes|exists:classifications,id',
            'start_date' => 'required|date',
            'finish_date' => 'required|date',
        ];
    }
}
