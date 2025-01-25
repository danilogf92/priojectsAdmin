<?php

namespace App\Filament\Resources\FuelEquipmentResource\Pages;

use App\Filament\Resources\FuelEquipmentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFuelEquipment extends ListRecords
{
    protected static string $resource = FuelEquipmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
