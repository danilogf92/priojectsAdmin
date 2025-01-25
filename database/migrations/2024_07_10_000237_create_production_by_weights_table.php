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
    Schema::create('production_by_weights', function (Blueprint $table) {
      $table->id();
      $table->date('date')->unique();
      $table->decimal('net', 10, 3);
      $table->decimal('total_boxes', 10, 3);
      $table->decimal('pn_per_box', 10, 3);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('production_by_weights');
  }
};
