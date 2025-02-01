<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataResource;
use App\Models\Data;
use App\Models\Plant;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ROWS = 10;

        // Definir los filtros dinámicos
        $filters = [
        'date' => 'start_date',   // Filtra por fecha
        'plant_id' => 'plant_id', // Filtra por planta
        ];

        // Aplicar filtros dinámicamente
        $query = Data::query()->filter($request, $filters);

        // Determinar número de filas por página
        $rowsPerPage = $request->input('rows', $ROWS);

        if ($rowsPerPage === 'all') {
        $projects = $query->orderBy('start_date', 'DESC')
            ->orderBy('plant_id', 'ASC')
            ->get();
        } else {
        $projects = $query->orderBy('start_date', 'DESC')
            ->orderBy('plant_id', 'ASC')
            ->paginate((int)$rowsPerPage);
        }

        // Obtener plantas auxiliares
        $plants = Plant::orderBy('name', 'ASC')->get();

        return inertia('Data/Index', [
        "projects" => DataResource::collection($projects),
        "plants" => $plants,
        'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Data/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'area' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'group_1' => 'nullable|string',
            'group_2' => 'nullable|string',
            'description' => 'nullable|string|max:2000',
            'general_classification' => 'nullable|string',
            'item_type' => 'nullable|string',
            'unit' => 'nullable|string',
            'qty' => 'nullable|numeric',
            'unit_price' => 'nullable|numeric',
            'global_price' => 'nullable|numeric',
            'global_price_euros' => 'nullable|numeric',
            'stage' => 'nullable|string',
            'real_value' => 'nullable|numeric',
            'real_value_euros' => 'nullable|numeric',
            'booked' => 'nullable|numeric',
            'booked_euros' => 'nullable|numeric',
            'percentage' => 'nullable|integer',
            'executed_dollars' => 'nullable|numeric',
            'executed_euros' => 'nullable|numeric',
            'supplier' => 'nullable|string',
            'code' => 'nullable|string',
            'order_no' => 'nullable|string',
            'input_num' => 'nullable|string',
            'observations' => 'nullable|string|max:2000',
            'real_updated_at' => 'nullable|string|max:10',
            'booked_updated_at' => 'nullable|string|max:10',
        ]);

        Data::create($request->all());

        return redirect()->route('data.index')
            ->with('success', 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Data $data)
    {
        return view('data.show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Data $data)
    {
        return inertia('Data/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Data $data)
    {
        $request->validate([
            'area' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'group_1' => 'nullable|string',
            'group_2' => 'nullable|string',
            'description' => 'nullable|string|max:2000',
            'general_classification' => 'nullable|string',
            'item_type' => 'nullable|string',
            'unit' => 'nullable|string',
            'qty' => 'nullable|numeric',
            'unit_price' => 'nullable|numeric',
            'global_price' => 'nullable|numeric',
            'global_price_euros' => 'nullable|numeric',
            'stage' => 'nullable|string',
            'real_value' => 'nullable|numeric',
            'real_value_euros' => 'nullable|numeric',
            'booked' => 'nullable|numeric',
            'booked_euros' => 'nullable|numeric',
            'percentage' => 'nullable|integer',
            'executed_dollars' => 'nullable|numeric',
            'executed_euros' => 'nullable|numeric',
            'supplier' => 'nullable|string',
            'code' => 'nullable|string',
            'order_no' => 'nullable|string',
            'input_num' => 'nullable|string',
            'observations' => 'nullable|string|max:2000',
            'real_updated_at' => 'nullable|string|max:10',
            'booked_updated_at' => 'nullable|string|max:10',
        ]);

        $data->update($request->all());

        return redirect()->route('data.index')
            ->with('success', 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Data $data)
    {
        $data->delete();

        return redirect()->route('data.index')
            ->with('success', 'Data deleted successfully.');
    }
}