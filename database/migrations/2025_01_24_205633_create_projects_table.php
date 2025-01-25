<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Ejecutar las migraciones.
   *
   * @return void
   */
  public function up(): void
  {
    Schema::create('projects', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('pda_code');
      $table->boolean('data_uploaded')->default(false);
      $table->float('rate');
      $table->foreignId('plant_id')->constrained()->onDelete('cascade');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('state_id')->constrained()->onDelete('cascade');
      $table->foreignId('justification_id')->constrained()->onDelete('cascade');
      $table->foreignId('investment_id')->constrained()->onDelete('cascade');
      $table->foreignId('classification_id')->constrained()->onDelete('cascade');
      $table->date('start_date');
      $table->date('finish_date');
      $table->timestamps();
    });
  }

  /**
   * Revertir las migraciones.
   *
   * @return void
   */
  public function down(): void
  {
    Schema::dropIfExists('projects');
  }
};
