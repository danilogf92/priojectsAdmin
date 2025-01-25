<?php

namespace App\Filament\Resources\AreaMachinesResource\Pages;

use App\Filament\Resources\AreaMachinesResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAreaMachines extends ListRecords
{
    protected static string $resource = AreaMachinesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
