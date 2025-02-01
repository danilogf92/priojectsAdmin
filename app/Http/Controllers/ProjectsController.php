<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Classification;
use App\Models\Investment;
use App\Models\Justification;
use App\Models\Plant;
use App\Models\Project;
use App\Models\State;
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
      // Verificar permisos
      $permissions = Auth::user()->getPermissionNames();

      if (!$permissions->contains('Create Project')) {
          abort(403, 'Unauthorized action.');
      }

      // Obtener el usuario actual
      $currentUser = Auth::user();

      // Obtener datos necesarios
      $plants = Plant::all();
      $states = State::all();
      $justifications = Justification::all();
      $investments = Investment::all();
      $classifications = Classification::all();

      return inertia('Projects/Create', [
          'plants' => $plants,
          'currentUser' => $currentUser, // Pasar el usuario actual
          'states' => $states,
          'justifications' => $justifications,
          'investments' => $investments,
          'classifications' => $classifications,
      ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProjectRequest $request)
  {
      // Verificar permisos
      $permissions = Auth::user()->getPermissionNames();

      if (!$permissions->contains('Create Project')) {
          abort(403, 'Unauthorized action test.');
      }

      // Crear el proyecto con los datos validados
      $project = Project::create($request->validated());

      // Redirigir con mensaje de éxito
      return redirect()->route('projects.index')->with('success', 'Project created successfully.');
  }

  /**
   * Display the specified resource.
   */
    public function show(Project $project)
    {
        return inertia('Projects/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Project $project)
  {
      // Verificar permisos
      $permissions = Auth::user()->getPermissionNames();

      if (!$permissions->contains('Edit Project')) {
          abort(403, 'Unauthorized action.');
      }

      // Obtener datos necesarios
      $plants = Plant::all();
      $states = State::all();
      $justifications = Justification::all();
      $investments = Investment::all();
      $classifications = Classification::all();

      return inertia('Projects/Edit', [
          'project' => $project,
          'plants' => $plants,
          'currentUser' => Auth::user(),
          'states' => $states,
          'justifications' => $justifications,
          'investments' => $investments,
          'classifications' => $classifications,
      ]);
  }

  /**
   * Update the specified resource in storage.
   */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
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
    return redirect()->route('projects.index')->with('success', 'Delete project successfully.');
  }
}
