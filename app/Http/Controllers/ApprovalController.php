<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApprovalRequest;
use App\Http\Requests\UpdateApprovalRequest;
use App\Http\Resources\ApprovalResource;
use App\Models\Approval;
use App\Models\AreaMachines;
use App\Models\Condition;
use App\Models\Plant;
use App\Models\Supplier;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ApprovalController extends Controller
{

  private function validacion()
  {
    $user = Auth::user();

    $condicion = $user->id != 3;


    if ($condicion) {
      abort(403, 'Unauthorized action.');
    }
  }

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $this->validacion();
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $query = Approval::query();

    $user = Auth::user();

    $query->where('user_id', $user->id);

    // Aplicar filtros
    if ($request->has('date') && $request->date) {
      $query->whereDate('fechaEjecucion', $request->date);
    }

    if ($request->has('plant_id') && $request->plant_id) {
      $query->where('plant_id', (int)$request->plant_id);
    }

    if ($request->has('area_machine_id') && $request->area_machine_id) {
      $query->where('area_machine_id', (int)$request->area_machine_id);
    }

    if ($request->has('supplier_id') && $request->supplier_id) {
      $query->where('supplier_id', $request->supplier_id);
    }

    if ($request->has('rows') && $request->rows) {
      $rowsPerPage = $request->input('rows', $request->rows);
    } else {
      $rowsPerPage = $request->input('rows', 10);
    }

    $data = $query->orderBy('fechaEjecucion', 'DESC')->paginate((int)$rowsPerPage);
    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachines::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();



    return inertia('Permissions/Index', [
      "data" => ApprovalResource::collection($data),
      'queryParams' => request()->query() ?: null,
      'plants' => $plants,
      'areaMachine' => $areaMachine,
      'suppliers' => $suppliers
    ]);
  }




  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachines::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();
    $conditions = Condition::orderBy('id', 'ASC')->get();

    return inertia('Permissions/Create', [
      'plants' => $plants,
      'areaMachine' => $areaMachine,
      'suppliers' => $suppliers,
      'conditions' => $conditions
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreApprovalRequest $request)
  {

    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    // Validar los datos y crear un nuevo registro
    $data = $request->validated();

    Approval::create($data);
    // dd($data);

    // Redirigir al método index con un mensaje de éxito
    return redirect()->route('permission.index')
      ->with('success', 'Approval created successfully.');
  }


  /**
   * Display the specified resource.
   */
  public function show(Approval $approval)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id)
  {
    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $approval = Approval::findOrFail($id);

    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachines::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();
    $conditions = Condition::orderBy('id', 'ASC')->get();

    return inertia(
      'Permissions/Edit',
      [
        "approval" => $approval,
        'plants' => $plants,
        'areaMachine' => $areaMachine,
        'suppliers' => $suppliers
      ]
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateApprovalRequest $request, $id)
  {
    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $approval = Approval::findOrFail($id); // Encuentra el recurso
    $data = $request->validated(); // Valida los datos

    $approval->update($data); // Actualiza el recurso
    return redirect()->route('permission.index')->with('success', 'Approval updated successfully.');
  }



  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id)
  {
    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Delete Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $approval = Approval::findOrFail($id);

    $approval->delete();
    return redirect()->route('permission.index')->with('success', 'Approval deleted successfully.');
  }

  public function export($id)
  {
    $this->validacion();

    // Encuentra la aprobación o lanza un error 404
    $approval = Approval::findOrFail($id);

    // Asegúrate de que la ruta de la plantilla sea correcta
    $templatePath = storage_path('app/template/template.xlsx');
    $fecha = now();
    $plant = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->plant->name); // Sanitiza el nombre
    $area = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->areaMaquina); // Sanitiza el área

    // Genera la ruta y el nombre del archivo exportado
    $filename = "Permiso_{$plant}_{$area}_{$fecha->format('d-m-Y')}.xlsx";
    $newExcelPath = storage_path("app/exports/{$filename}");

    // Verifica si la plantilla existe
    if (!file_exists($templatePath)) {
      return response()->json(['error' => 'Template file not found.'], 404);
    }

    // Carga la plantilla Excel
    $spreadsheet = IOFactory::load($templatePath);

    // Obtén la hoja activa y modifica los datos
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('B2', $approval->fechaEjecucion);
    $sheet->setCellValue('E2', $approval->desde);
    $sheet->setCellValue('H2', $approval->hasta);
    $sheet->setCellValue('B3', $approval->plant->name);
    $sheet->setCellValue('H3', $approval->areaMachine->nombre);
    $sheet->setCellValue('H4', $approval->supplier->name);
    $sheet->setCellValue('A7', $approval->descripcionTrabajo);
    $sheet->setCellValue('A30', $approval->TrabajosIncompatible);
    $sheet->setCellValue('A34', $approval->RiesgosFactores);

    // Itera sobre las condiciones
    $rowIndex = 11;
    foreach ($approval->condiciones as $item) {
      $sheet->setCellValue('A' . $rowIndex, $item['nombre']);
      $sheet->getStyle('A' . $rowIndex)->getFont()->setSize(6)->setBold(true);

      if ($item['cumple'] === "SI") {
        $sheet->setCellValue('G' . $rowIndex, "X");
      } elseif ($item['cumple'] === "NO") {
        $sheet->setCellValue('H' . $rowIndex, "X");
      } else {
        $sheet->setCellValue('I' . $rowIndex, "X");
      }

      $sheet->setCellValue('J' . $rowIndex, $item['observaciones']);
      $rowIndex++;
    }

    // Rellena otras celdas
    $sheet->setCellValue('L39', $approval->TrabajosElectricos);
    $sheet->setCellValue('L40', $approval->TrabajosDeSoldadura);
    $sheet->setCellValue('L41', $approval->TrabajosEnAlturas);
    $sheet->setCellValue('L42', $approval->TrabajosDentroCocinadores);
    $sheet->setCellValue('L43', $approval->TrabajosTransportar);
    $sheet->setCellValue('L44', $approval->TrabajosLevantarObjetos);

    // Guarda el archivo Excel en la ruta especificada
    $writer = new Xlsx($spreadsheet);
    $writer->save($newExcelPath);

    // Descarga el archivo y elimina después de enviar
    return response()->download($newExcelPath)->deleteFileAfterSend(true);
  }


  public function alturas($id)
  {
    $this->validacion();

    // Encuentra la aprobación o lanza un error 404
    $approval = Approval::findOrFail($id);

    // Asegúrate de que la ruta de la plantilla sea correcta
    $templatePath = storage_path('app/template/alturas.xlsx');
    $fecha = now();
    $plant = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->plant->name); // Sanitiza el nombre
    $area = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->areaMaquina); // Sanitiza el área

    // Genera la ruta y el nombre del archivo exportado
    $filename = "Permiso_{$plant}_{$area}_{$fecha->format('d-m-Y')}.xlsx";
    $newExcelPath = storage_path("app/exports/{$filename}");

    // Verifica si la plantilla existe
    if (!file_exists($templatePath)) {
      return response()->json(['error' => 'Template file not found.'], 404);
    }

    // Carga la plantilla Excel
    $spreadsheet = IOFactory::load($templatePath);

    // Obtén la hoja activa y modifica los datos
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('S11', $approval->fechaEjecucion);
    $sheet->setCellValue('S12', $approval->fechaEjecucion);

    $sheet->setCellValue('AE11', $approval->desde);
    $sheet->setCellValue('AE12', $approval->hasta);

    $sheet->setCellValue('AV11', $approval->areaMachine->nombre);
    $sheet->setCellValue('k13', $approval->plant->name);
    $sheet->setCellValue('B17', $approval->descripcionTrabajo);
    $sheet->setCellValue('BF17', $approval->supplier->name);


    if ($approval->TrabajosEnAlturas === "SI") {

      if ($approval->Escalera === "SI") {
        $sheet->setCellValue('D58', "X");
        $sheet->setCellValue('C62', "X");
        $sheet->setCellValue('C64', "X");
        $sheet->setCellValue('C66', "X");
        $sheet->setCellValue('C68', "X");
        $sheet->setCellValue('C70', "X");
        $sheet->setCellValue('C72', "X");
      }

      if ($approval->Montacargas === "SI") {
        $sheet->setCellValue('T58', "X");
        $sheet->setCellValue('S62', "X");
        $sheet->setCellValue('S64', "X");
        $sheet->setCellValue('S66', "X");
        $sheet->setCellValue('S68', "X");
        $sheet->setCellValue('S70', "X");
        $sheet->setCellValue('S72', "X");
      }

      if ($approval->Andamios === "SI") {
        $sheet->setCellValue('AJ58', "X");
        $sheet->setCellValue('AJ62', "X");
        $sheet->setCellValue('AJ64', "X");
        $sheet->setCellValue('AJ66', "X");
        $sheet->setCellValue('AJ68', "X");
      }

      if ($approval->Techo === "SI") {
        $sheet->setCellValue('BA58', "X");
        $sheet->setCellValue('BA62', "X");
        $sheet->setCellValue('BA64', "X");
        $sheet->setCellValue('BA66', "X");
        $sheet->setCellValue('BA68', "X");
      }
    }

    // Guarda el archivo Excel en la ruta especificada
    $writer = new Xlsx($spreadsheet);
    $writer->save($newExcelPath);

    // Descarga el archivo y elimina después de enviar
    return response()->download($newExcelPath)->deleteFileAfterSend(true);
  }

  public function processId($id)
  {
    $this->validacion();

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Permissions')) {
      abort(403, 'Unauthorized action.');
    }

    $approval = Approval::findOrFail($id);

    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachines::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();
    // $conditions = Condition::orderBy('id', 'ASC')->get();

    return inertia(
      'Permissions/Template',
      [
        "approval" => $approval,
        'plants' => $plants,
        'areaMachine' => $areaMachine,
        'suppliers' => $suppliers
      ]
    );
  }

 public function duplicateRows()
  {
      $this->validacion();

      $permissions = Auth::user()->getPermissionNames();
      if (!$permissions->contains('Edit Permissions')) {
          abort(403, 'Unauthorized action.');
      }

      // Obtener la última fecha registrada
      $lastDate = Approval::max('fechaEjecucion');

      if (!$lastDate) {
          return redirect()->back()->with('error', 'There are no records to duplicate.');
      }

      // Asegurar que la fecha sea tratada correctamente con Carbon
      $lastDate = Carbon::parse($lastDate);

      // Obtener todas las filas correspondientes a la última fecha
      $rowsToDuplicate = Approval::whereDate('fechaEjecucion', $lastDate->toDateString())->get();

      // Crear nuevas filas duplicadas con la fecha del día siguiente
      foreach ($rowsToDuplicate as $row) {
          $newRow = $row->replicate(); // Copiar los datos de la fila existente
          $newRow->fechaEjecucion = $lastDate->copy()->addDay(); // Incrementar la fecha en un día
          $newRow->save(); // Guardar la nueva fila
      }

      //return redirect()->back()->with('success', 'Las filas del último día (' . $lastDate->toDateString() . ') se han duplicado con éxito con la fecha del día siguiente.');
      return redirect()->back()->with('success', 'The rows from the last recorded day (' . $lastDate->toDateString() . ') have been successfully duplicated with the next day\'s date.');
  }

}
