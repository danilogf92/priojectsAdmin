<?php

namespace App\Imports;

use App\Models\Data;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
// use Illuminate\Support\Facades\Validator;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithValidation;

class DataImport implements WithHeadingRow, SkipsEmptyRows, WithValidation, ToModel
{
    use Importable;

    protected $id;
    protected $rate;

    public function __construct($id, $rate)
    {
        $this->id = $id;
        $this->rate = $rate;
    }

    public function rules(): array
    {
        return [
            'area' => 'required|string|max:255',
            'group_1' => 'required|string|max:255',
            'group_2' => 'required|string|max:255',
            'general_classification' => 'required|string|max:255',
            'item_type' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'qty' => 'required|numeric|min:0',
            'unit_price' => 'required|numeric|min:0',
            'stage' => 'required|string|max:255',
            'real' => 'required|numeric|min:0',
            'booked' => 'required|numeric|min:0',
            'percentage' => 'required|numeric|between:0,1',
            // 'percentage' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'executed_dollars' => 'required|numeric|min:0',
            'executed_euros' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:255',
            'order_no' => 'nullable|numeric',
            'input_num' => 'nullable|string|max:255',
            'observations' => 'nullable|string|max:2000',
            'description' => 'nullable|string|max:2000',
        ];
    }

    public function model(array $row)
    {
        return new Data([
            'area' => $row['area'],
            'project_id' => $this->id,
            'group_1' => $row['group_1'],
            'group_2' => $row['group_2'],
            'description' => $row['description'],
            'general_classification' => $row['general_classification'],
            'item_type' => $row['item_type'],
            'unit' => $row['unit'],
            'qty' => $this->toFloat($row['qty']),
            'unit_price' => $this->toFloat($row['unit_price']),
            'global_price' => $this->toFloat($row['global_price']),
            'stage' => $row['stage'],
            'real_value' => $this->toFloat($row['real']),
            'booked' => $this->toFloat($row['booked']),
            'percentage' => $this->toFloat($row['percentage']) * 100,
            'executed_dollars' => $this->toFloat($row['executed_dollars']),
            'executed_euros' => $this->toFloat($row['executed_dollars']) / $this->rate,
            'global_price_euros' => $this->toFloat($row['global_price']) / $this->rate,
            'real_value_euros' => $this->toFloat($row['real']) / $this->rate,
            'booked_euros' => $this->toFloat($row['booked']) / $this->rate,
            'supplier' => $row['supplier'],
            'code' => $row['code'],
            'order_no' => $row['order_no'],
            'input_num' => $row['input_num'],
            'observations' => $row['observations'],
        ]);
    }

    public function headingRow(): int
    {
        return 1;
    }

    protected function toFloat($value)
    {
        return is_numeric($value) ? (float) $value : 0;
    }
}
