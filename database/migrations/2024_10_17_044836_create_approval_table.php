<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create('approvals', function (Blueprint $table) {
      $table->id();
      $table->date('fechaEjecucion')->nullable();
      $table->string('desde');
      $table->string('hasta');
      $table->string('inspectorSSA');

      $table->unsignedBigInteger('user_id');
      $table->foreign('user_id')->references('id')->on('users')
        ->onDelete('cascade')->onUpdate('cascade');

      $table->unsignedBigInteger('plant_id');
      $table->foreign('plant_id')->references('id')->on('plants')
        ->onDelete('cascade')->onUpdate('cascade');

      $table->unsignedBigInteger('area_machine_id');
      $table->foreign('area_machine_id')->references('id')->on('area_machines')
        ->onDelete('cascade')->onUpdate('cascade');

      $table->string('ejecutorTrabajo')->nullable();
      $table->text('descripcionTrabajo')->nullable();
      $table->json('condiciones');
      $table->text('TrabajosIncompatible')->nullable();
      $table->text('RiesgosFactores')->nullable();

      // Campos de trabajos con valores predeterminados
      $table->string('TrabajosElectricos')->default('NO');
      $table->string('TrabajosDeSoldadura')->default('NO');
      $table->string('TrabajosEnAlturas')->default('NO');
      $table->string('Escalera')->default('NO');
      $table->string('Montacargas')->default('NO');
      $table->string('Andamios')->default('NO');
      $table->string('Techo')->default('NO');
      $table->string('TrabajosDentroCocinadores')->default('NO');
      $table->string('TrabajosTransportar')->default('NO');
      $table->string('TrabajosLevantarObjetos')->default('NO');

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('approvals');
  }
};
