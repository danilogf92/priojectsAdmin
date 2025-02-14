<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class ProjectDashboard
{
  protected $data;
  protected $query;
  protected $searchData;
  protected $investments;
  protected $currency;
  protected $currencyFields;
  protected $summedValues;

  public function __construct($data, $query)
  {
    $this->data = $data;
    $this->query = $query;
    $this->searchData = $query->input('type', 'area');
    $this->investments = $query->input('investments', 'global_price_euros');
    $this->currency = $query->input('currency', 'euro');
    $this->currencyFields = $this->getCurrencyFields();
    $this->summedValues = $this->calculateSummedValues();
  }

  /**
   * Devuelve los campos de moneda según la consulta.
   */
  private function getCurrencyFields(): array
  {
    return $this->currency === 'dollar' ? [
      'executed' => 'executed_dollars',
      'budgeted' => 'global_price',
      'booked' => 'booked',
      'real' => 'real_value',
      'symbol' => '$',
    ] : [
      'executed' => 'executed_euros',
      'budgeted' => 'global_price_euros',
      'booked' => 'booked_euros',
      'real' => 'real_value_euros',
      'symbol' => '€',
    ];
  }

  /**
   * Calcula los valores sumados para los campos de moneda.
   */
  private function calculateSummedValues(): Collection
  {
    return collect(['budgeted', 'executed', 'booked', 'real'])
      ->mapWithKeys(fn($key) => [$key => round($this->data->sum($this->currencyFields[$key]), 2)]);
  }

  /**
   * Obtiene los datos del dashboard.
   */
  public function getDashboardData(): array
  {
    $executedPercentage = $this->summedValues['budgeted'] > 0
      ? round(($this->summedValues['executed'] / $this->summedValues['budgeted']) * 100, 2)
      : 0;

    return [
      ['title' => "Budgeted {$this->currencyFields['symbol']}", 'value' => $this->summedValues['budgeted']],
      ['title' => "Booked {$this->currencyFields['symbol']}", 'value' => $this->summedValues['booked']],
      ['title' => "Executed {$this->currencyFields['symbol']}", 'value' => $this->summedValues['executed']],
      ['title' => "Executed %", 'value' => "{$executedPercentage}%"],
      ['title' => "Real (SAP) {$this->currencyFields['symbol']}", 'value' => $this->summedValues['real']],
    ];
  }

  /**
   * Obtiene los datos formateados para el gráfico.
   */
  public function getFormattedChartData(): array
  {
    $values = $this->data->select(
      $this->searchData,
      DB::raw("SUM({$this->currencyFields['executed']}) as executedValue"),
      DB::raw("SUM({$this->currencyFields['budgeted']}) as budgetedValue"),
      DB::raw("SUM({$this->currencyFields['booked']}) as bookedValue"),
      DB::raw("SUM({$this->currencyFields['real']}) as realValue")
    )->groupBy($this->searchData)->get();

    return collect(['Budgeted', 'Executed', 'Booked', 'Real'])
      ->mapWithKeys(fn($name) => [
        $name => ['name' => $name] + $values->pluck(strtolower($name) . 'Value', $this->searchData)->toArray()
      ])
      ->values()
      ->toArray();
  }

  /**
   * Obtiene los datos para el gráfico de barras.
   */
  public function barChart(): array
  {
    return $this->data->select(
      $this->searchData,
      DB::raw("SUM($this->investments) as total")
    )
      ->groupBy($this->searchData)
      ->orderBy(DB::raw("SUM($this->investments)"), 'DESC')  // Aquí se ordena correctamente por la suma
      ->get()
      ->toArray();
  }


  /**
   * Obtiene el resumen de valores.
   */
  public function getResume(): array
  {
    $executedPercentage = $this->summedValues['budgeted'] > 0
      ? round(($this->summedValues['executed'] / $this->summedValues['budgeted']) * 100, 2) . '%'
      : '0%';

    return [
      ['title' => "Budgeted {$this->currencyFields['symbol']}", 'value' => $this->summedValues['budgeted']],
      ['title' => "Booked {$this->currencyFields['symbol']}", 'value' => $this->summedValues['booked']],
      ['title' => "Executed {$this->currencyFields['symbol']}", 'value' => $this->summedValues['executed']],
      ['title' => "Executed %", 'value' => $executedPercentage],
      ['title' => "Real (SAP) {$this->currencyFields['symbol']}", 'value' => $this->summedValues['real']],
    ];
  }

  /**
   * Obtiene el resumen de porcentajes.
   */
  public function getResumePercentage(): array
  {
    $budgeted = $this->summedValues['budgeted'] > 0 ? $this->summedValues['budgeted'] : 1;

    return [
      ['title' => "Budgeted %", 'value' => round(($this->summedValues['budgeted'] / $budgeted) * 100, 2)],
      ['title' => "Booked %", 'value' => round(($this->summedValues['booked'] / $budgeted) * 100, 2)],
      ['title' => "Executed %", 'value' => round(($this->summedValues['executed'] / $budgeted) * 100, 2)],
      ['title' => "Real (SAP) %", 'value' => round(($this->summedValues['real'] / $budgeted) * 100, 2)],
    ];
  }

  public function accountBalanceRealValue()
  {
    $real = round(($this->summedValues['real']), 2);
    $budgeted = round(($this->summedValues['budgeted']), 2);
    $rest = round($budgeted - $real, 2);

    return [
      [
        "name" => "Real",
        "total" => $real
      ],
      [
        "name" => "Rest",
        "total" => $rest
      ],
    ];
  }

  public function accountBalanceBookedValue()
  {
    $booked = round(($this->summedValues['booked']), 2);
    $budgeted = round(($this->summedValues['budgeted']), 2);
    $rest = round($budgeted - $booked, 2);

    return [
      [
        "name" => "Booked",
        "total" => $booked
      ],
      [
        "name" => "Rest",
        "total" => $rest
      ],
    ];
  }
}
