<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait Filterable
{
  /**
   * Aplica filtros dinámicamente a una consulta.
   *
   * @param Builder $query
   * @param Request $request
   * @param array $filters
   * @return Builder
   */
  public function scopeFilter(Builder $query, Request $request, array $filters = [])
  {
    foreach ($filters as $filter => $column) {
      if ($request->filled($filter)) {
        $query->where($column, $request->input($filter));
      }
    }

    return $query;
  }
}
