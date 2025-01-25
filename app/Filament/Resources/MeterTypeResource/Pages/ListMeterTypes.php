<?php

namespace App\Filament\Resources\MeterTypeResource\Pages;

use App\Filament\Resources\MeterTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMeterTypes extends ListRecords
{
    protected static string $resource = MeterTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
