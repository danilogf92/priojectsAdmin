<?php

namespace App\Exports;

use App\Models\ProductionByWeight;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProductionByWeightExport implements FromCollection, WithMapping, WithHeadings
{
    use Exportable;

    public function collection()
    {
        return ProductionByWeight::all();
    }

    public function map($productionByWeight): array
    {
        return [
            Carbon::parse($productionByWeight->date)->format('n/j/Y'), 
            $productionByWeight->net,
            $productionByWeight->total_boxes,
            $productionByWeight->pn_per_box,
        ];
    }

    public function headings(): array
    {
        return [
            'Fecha',
            'Peso Neto',
            'Total por Caja',
            'PN por Caja',
        ];
    }
}
