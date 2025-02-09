<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\DataImport;
use App\Models\Data;
use App\Models\Project;
use Maatwebsite\Excel\Facades\Excel;

class DataImportController extends Controller
{
    public function import(Request $request)
    {
        // Valida que el archivo sea un Excel o CSV
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
            'id' => 'required|integer|exists:projects,id', // Valida el id
            'rate' => 'required|numeric', // Valida el rate
        ]);

        // Lee los valores de id y rate desde el request
        $project_id = $request->input('id');
        $rate = $request->input('rate');

        // Importa los datos usando el importador y pasa los valores de id y rate
        Excel::import(new DataImport($project_id, $rate), $request->file('file'));

            $project = Project::find($project_id);

        // Verifica si el proyecto existe
        if ($project) {
            // Actualiza el campo 'data_uploaded' a true
            $project->data_uploaded = true;
            $project->save();
        }

        // Redirige con un mensaje de éxito
        return redirect()->back()->with('success', 'Datos importados correctamente.');
    }

    public function delete(Request $request, Project $project)
    {
        Data::where('project_id', $project->id)->delete();

        $project->data_uploaded = false;
        $project->save();

        // Redirige con un mensaje de éxito
        return redirect()->back()->with('success', 'Datos eliminados correctamente.');
    }
}
