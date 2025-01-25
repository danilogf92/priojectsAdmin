<?php

namespace App\Http\Controllers;

use App\Exports\MeasurementsExport;
use App\Models\Measurement;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Requests\UpdateMeasurementRequest;
use App\Http\Resources\MeasurementResource;
use App\Models\Meter;
use App\Models\Plant;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class MeasurementController extends Controller
{
  public function index(Request $request)
  {
    $ROWS = 10;
    $query = Measurement::query();

    // Aplicar filtros
    if ($request->has('date') && $request->date) {
      $query->whereDate('date', $request->date);
    }

    if ($request->has('plant_id') && $request->plant_id) {
      $query->where('plant_id', $request->plant_id);
    }

    if ($request->has('meter_id') && $request->meter_id) {
      $query->where('meter_id', $request->meter_id);
    }

    if ($request->has('rows') && $request->rows) {
      $rowsPerPage = $request->input('rows', $request->rows);
    } else {
      $rowsPerPage = $request->input('rows', $ROWS);
    }

    if ($rowsPerPage === 'all') {
      $measurements = $query->orderBy('date', 'DESC')
        ->orderBy('plant_id', 'ASC')
        ->get();
    } else {
      $measurements = $query->orderBy('date', 'DESC')
        ->orderBy('plant_id', 'ASC')
        ->paginate((int)$rowsPerPage);
    }

    $plants = Plant::orderBy('name', 'ASC')->get();
    $meters = Meter::where('enabled', 1)
      ->orderBy('id', 'ASC')
      ->get();

    return inertia('Measurement/Index', [
      "measurements" => MeasurementResource::collection($measurements),
      "plants" => $plants,
      "meters" => $meters,
      'queryParams' => request()->query() ?: null,
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

    $plants = Plant::orderBy('name', 'ASC')->get();
    $meters = Meter::where('enabled', 1)
      ->orderBy('id', 'ASC')
      ->get();

    return inertia('Measurement/Create', [
      "plants" => $plants,
      "meters" => $meters,
      // "measurements" => $measurements
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreMeasurementRequest $request)
  {

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Water')) {
      abort(403, 'Unauthorized action.');
    }

    $data = $request->validated();
    Measurement::create($data);
    // return redirect()->route('measurement.index')->with('success', 'Measurement created successfully.');
  }
  /**
   * Display the specified resource.
   */
  public function show(Measurement $measurement)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Measurement $measurement)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Water')) {
      abort(403, 'Unauthorized action.');
    }

    $plants = Plant::orderBy('name', 'ASC')->get();
    $meters = Meter::orderBy('name', 'ASC')->get();

    return inertia('Measurement/Edit', [
      "plants" => $plants,
      "meters" => $meters,
      "measurement" => $measurement
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateMeasurementRequest $request, Measurement $measurement)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Water')) {
      abort(403, 'Unauthorized action.');
    }

    $data = $request->validated();
    $measurement->update($data);

    return redirect()->route('measurement.index')->with('success', 'Measurement updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Measurement $measurement)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Delete Water')) {
      abort(403, 'Unauthorized action.');
    }

    $measurement->delete();
    return redirect()->route('measurement.index')->with('success', 'Delete Measurement.');
  }

  public function export()
  {
    return Excel::download(new MeasurementsExport, 'measurements.xlsx');
  }
}
