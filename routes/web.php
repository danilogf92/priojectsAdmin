<?php

use App\Http\Controllers\API\PlantController;
use App\Http\Controllers\API\PowerBiController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\DataImportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectsController;
use App\Http\Middleware\EnsureStaticTokenIsValid;
use Illuminate\Support\Facades\Route;

// Route::redirect('/', '/dashboard');
Route::get('/', function () {
  return inertia('Welcome');
});

Route::middleware(['auth'])->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::resource('projects', ProjectsController::class);
  Route::resource('data', DataController::class);
  Route::resource('permission', ApprovalController::class);

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::prefix('api')->group(function () {
    Route::get('/plants', [PlantController::class, 'index']);
  });

  Route::post('/import/data', [DataImportController::class, 'import'])->name('import.import');
  Route::delete('/import/{project}', [DataImportController::class, 'delete'])->name('import.delete');

  Route::get('/approval/{id}/export', [ApprovalController::class, 'export'])->name('approval.export');
  Route::get('/approval/{id}/alturas', [ApprovalController::class, 'alturas'])->name('approval.alturas');
  Route::get('/approval/process-id/{id}', [ApprovalController::class, 'processId'])->name('approval.processId');
  Route::post('/approvals/duplicate', [ApprovalController::class, 'duplicateRows'])->name('approvals.duplicate');
});

Route::prefix('api')->middleware(EnsureStaticTokenIsValid::class)->group(function () {
  Route::get('/plant', [PowerBiController::class, 'plants']);
});

require __DIR__ . '/auth.php';
