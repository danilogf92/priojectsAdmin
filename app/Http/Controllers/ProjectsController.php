<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Plant;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
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
    $query = Project::query()->filter($request, $filters);

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

    return inertia('Projects/Index', [
      "projects" => ProjectResource::collection($projects),
      "plants" => $plants,
      'queryParams' => request()->query() ?: null,
    ]);
  }
  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Project $project)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Project $project)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Project $project)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Project $project)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Delete Project')) {
      abort(403, 'Unauthorized action.');
    }

    $project->delete();
    return redirect()->route('projects.index')->with('success', 'Delete Project.');
  }
}
