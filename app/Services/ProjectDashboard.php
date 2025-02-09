<?php

namespace App\Services;

class ProjectDashboard
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Obtiene la suma de un campo específico y la devuelve formateada a 2 decimales.
     */
    public function itemByName($item)
    {
        return round($this->data->sum($item), 2);
    }

    /**
     * Obtiene los datos del dashboard.
     */
    public function getDashboardData()
    {
        $budgeted = $this->itemByName('global_price_euros');
        $executed = $this->itemByName('executed_euros');
        $booked = $this->itemByName('booked_euros');
        $real = $this->itemByName('real_value_euros');

        // Validar si 'budgeted' es 0 para evitar división por cero
        $executed_percentage = $budgeted > 0 ? ($executed / $budgeted) * 100 : 0;

        return [
            ['title' => 'Budgeted €', 'value' => $budgeted],
            ['title' => 'Booked €', 'value' => $booked],
            ['title' => 'Executed €', 'value' => $executed],
            ['title' => 'Executed %', 'value' => $executed_percentage . '%'],
            ['title' => 'Real (SAP) €', 'value' => $real],
        ];
    }
}
