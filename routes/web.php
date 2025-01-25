<?php

use App\Http\Controllers\API\FuelEquipmentController;
use App\Http\Controllers\API\FuelLastValueController;
use App\Http\Controllers\API\LastValueController;
use App\Http\Controllers\API\MeterController;
use App\Http\Controllers\API\PlantController;
use App\Http\Controllers\API\PowerBiController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FuelController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\ProductionByWeightController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureStaticTokenIsValid;
use Illuminate\Support\Facades\Route;

// Route::redirect('/', '/dashboard');
Route::get('/', function () {
  return inertia('Welcome');
});

Route::middleware(['auth'])->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::resource('measurement', MeasurementController::class);
  Route::resource('production-by-weight', ProductionByWeightController::class);
  Route::resource('fuel', FuelController::class);
  Route::resource('permission', ApprovalController::class);

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::prefix('api')->group(function () {
    Route::get('/plants', [PlantController::class, 'index']);
    Route::get('/meters', [MeterController::class, 'index']);
    Route::get('/lastvalue', [LastValueController::class, 'index']);
    Route::get('/fuel-equipment', [FuelEquipmentController::class, 'index']);
    Route::get('/fuel-lastvalue', [FuelLastValueController::class, 'index']);
  });

  Route::get('/measurements/export', [MeasurementController::class, 'export'])->name('measurements.export');
  Route::get('/production-by-weights/export', [ProductionByWeightController::class, 'export'])->name('production-by-weight.export');
  Route::get('/fuel-data/export', [FuelController::class, 'export'])->name('fuels.export');
  Route::get('/approval/{id}/export', [ApprovalController::class, 'export'])->name('approval.export');
  Route::get('/approval/{id}/alturas', [ApprovalController::class, 'alturas'])->name('approval.alturas');
  Route::get('/approval/process-id/{id}', [ApprovalController::class, 'processId'])->name('approval.processId');
  Route::post('/approvals/duplicate', [ApprovalController::class, 'duplicateRows'])->name('approvals.duplicate');
});

Route::prefix('api')->middleware(EnsureStaticTokenIsValid::class)->group(function () {
  Route::get('/measurements', [PowerBiController::class, 'measurements']);
  Route::get('/meter', [PowerBiController::class, 'meters']);
  Route::get('/metertypes', [PowerBiController::class, 'metertypes']);
  Route::get('/plant', [PowerBiController::class, 'plants']);
  Route::get('/production', [PowerBiController::class, 'production']);
  Route::get('/fuel-data', [PowerBiController::class, 'fuel']);
  Route::get('/fueltypes', [PowerBiController::class, 'fuelTypes']);
  Route::get('/fuelequipment', [PowerBiController::class, 'fuelEquipment']);
});

require __DIR__ . '/auth.php';
