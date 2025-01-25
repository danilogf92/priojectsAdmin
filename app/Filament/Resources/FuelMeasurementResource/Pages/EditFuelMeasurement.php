<?php

namespace App\Filament\Resources\FuelMeasurementResource\Pages;

use App\Filament\Resources\FuelMeasurementResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFuelMeasurement extends EditRecord
{
    protected static string $resource = FuelMeasurementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
