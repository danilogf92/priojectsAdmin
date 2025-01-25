<?php

namespace App\Filament\Resources\AreaMachinesResource\Pages;

use App\Filament\Resources\AreaMachinesResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateAreaMachines extends CreateRecord
{
  protected static string $resource = AreaMachinesResource::class;

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }
}
