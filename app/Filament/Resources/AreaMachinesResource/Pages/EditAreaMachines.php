<?php

namespace App\Filament\Resources\AreaMachinesResource\Pages;

use App\Filament\Resources\AreaMachinesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAreaMachines extends EditRecord
{
  protected static string $resource = AreaMachinesResource::class;

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
