<?php

namespace App\Filament\Resources\FuelEquipmentResource\Pages;

use App\Filament\Resources\FuelEquipmentResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFuelEquipment extends CreateRecord
{
    protected static string $resource = FuelEquipmentResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }     
}
