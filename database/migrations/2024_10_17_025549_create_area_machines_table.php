<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('area_machines', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('plant_id');
      $table->foreign('plant_id')->references('id')->on('plants')
        ->onDelete('cascade')->onUpdate('cascade');
      $table->string('nombre');
      $table->text('descripcion')->nullable();
      $table->boolean('activo')->default(true);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('area_machines');
  }
};
