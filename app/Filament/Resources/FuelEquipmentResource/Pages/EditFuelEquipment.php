<?php

namespace App\Filament\Resources\FuelEquipmentResource\Pages;

use App\Filament\Resources\FuelEquipmentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFuelEquipment extends EditRecord
{
    protected static string $resource = FuelEquipmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }     
}
