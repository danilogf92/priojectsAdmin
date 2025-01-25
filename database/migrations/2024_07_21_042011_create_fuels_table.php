<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('fuels', function (Blueprint $table) {
      $table->id();

      $table->unsignedBigInteger('plant_id');
      $table->foreign('plant_id')->references('id')->on('plants')
        ->onDelete('cascade')->onUpdate('cascade');

      $table->unsignedBigInteger('fuel_equipment_id');
      $table->foreign('fuel_equipment_id')->references('id')->on('fuel_equipment')
        ->onDelete('cascade')->onUpdate('cascade');

      $table->date('date');
      $table->decimal('start_value', 15, 3);
      $table->decimal('end_value', 15, 3);
      $table->decimal('difference', 15, 3);

      $table->decimal('kw_start_value', 15, 3)->nullable()->default(0);
      $table->decimal('kw_end_value', 15, 3)->nullable()->default(0);
      $table->decimal('kw_difference', 15, 3)->nullable()->default(0);

      $table->decimal('hour_start_value', 15, 3)->nullable()->default(0);
      $table->decimal('hour_end_value', 15, 3)->nullable()->default(0);
      $table->decimal('hour_difference', 15, 3)->nullable()->default(0);
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('fuels');
  }
};
