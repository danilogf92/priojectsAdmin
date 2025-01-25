<?php

namespace App\Http\Controllers;

use App\Exports\ProductionByWeightExport;
use App\Http\Requests\StoreProductionByWeightRequest;
use App\Http\Requests\UpdateProductionByWeightRequest;
use App\Http\Resources\ProductionByWeightResource;
use App\Models\ProductionByWeight;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class ProductionByWeightController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $ROWS = 10;
    $query = ProductionByWeight::query();

    // Aplicar filtros
    if ($request->has('date') && $request->date) {
      $query->whereDate('date', $request->date);
    }

    if ($request->has('rows') && $request->rows) {
      $rowsPerPage = $request->input('rows', $request->rows);
    } else {
      $rowsPerPage = $request->input('rows', $ROWS);
    }

    $production = $query->orderBy('date', 'DESC')->paginate((int)$rowsPerPage);

    return inertia('ProductionByWeight/Index', [
      "production" => ProductionByWeightResource::collection($production),
      'queryParams' => request()->query() ?: null
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Water')) {
      abort(403, 'Unauthorized action.');
    }

    return inertia('ProductionByWeight/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProductionByWeightRequest $request)
  {

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Water')) {
      abort(403, 'Unauthorized action.');
    }

    $data = $request->validated();
    ProductionByWeight::create($data);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductionByWeight $productionByWeight)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Water')) {
      abort(403, 'Unauthorized action.');
    }

    return inertia(
      'ProductionByWeight/Edit',
      ["production" => $productionByWeight]
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateProductionByWeightRequest $request, ProductionByWeight $productionByWeight)
  {
    $data = $request->validated();
    $productionByWeight->update($data);

    return redirect()->route('production-by-weight.index')->with('success', 'Production updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductionByWeight $productionByWeight)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Delete Water')) {
      abort(403, 'Unauthorized action.');
    }

    $productionByWeight->delete();
    return redirect()->route('production-by-weight.index')->with('success', 'Delete Production Data.');
  }

  public function export()
  {
    return Excel::download(new ProductionByWeightExport, 'production_by_weights.xlsx');
  }
}
