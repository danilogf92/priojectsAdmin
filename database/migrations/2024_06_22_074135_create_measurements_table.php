<?php

use App\Models\Meter;
use App\Models\Plant;
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
        Schema::create('measurements', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('plant_id');
            $table->foreign('plant_id')->references('id')->on('plants')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('meter_id');
            $table->foreign('meter_id')->references('id')->on('meters')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->decimal('start_value',10,2);
            $table->decimal('end_value',10,2);
            $table->decimal('difference',10,2);
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measurements');
    }
};
