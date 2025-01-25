<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FuelEquipmentResource\Pages;
use App\Filament\Resources\FuelEquipmentResource\RelationManagers;
use App\Models\FuelEquipment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FuelEquipmentResource extends Resource
{
  protected static ?string $model = FuelEquipment::class;

  protected static ?string $navigationGroup = 'Fuel consumption management';

  protected static ?string $navigationIcon = 'heroicon-o-funnel';

  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('name')
          ->required()
          ->maxLength(255),

        Forms\Components\Select::make('plant_id')
          ->relationship(name: 'plant', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),

        Forms\Components\Select::make('type_fuel_id')
          ->relationship(name: 'fuelType', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),

        Forms\Components\TextInput::make('units')
          ->required()
          ->maxLength(255),

        Forms\Components\Toggle::make('enabled'),
        Forms\Components\Toggle::make(
          'enabled_kw'
        ),
        Forms\Components\Toggle::make('enabled_hour'),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('id')
          ->sortable(),
        Tables\Columns\TextColumn::make('name')
          ->searchable(),
        Tables\Columns\TextColumn::make('plant.name')
          ->searchable()
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('fuelType.name')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('units')
          ->sortable(),
        Tables\Columns\TextColumn::make('enabled')
          ->label('Status')
          ->getStateUsing(function ($record) {
            return $record->enabled ? 'Enabled' : 'Disabled';
          })
          ->badge()
          ->color(fn(string $state): string => match ($state) {
            'Enabled' => 'success',
            'Disabled' => 'danger',
            default => 'gray',
          })
          ->sortable(),
        Tables\Columns\TextColumn::make('enabled_kw')
          ->label('KW/H Meter')
          ->getStateUsing(function ($record) {
            return $record->enabled_kw ? 'Enabled' : 'Disabled';
          })
          ->badge()
          ->color(fn(string $state): string => match ($state) {
            'Enabled' => 'success',  // Verde para 'Enabled'
            'Disabled' => 'danger',  // Rojo para 'Disabled'
            default => 'gray',
          })
          ->sortable(),
        Tables\Columns\TextColumn::make('enabled_hour')
          ->label('Hour Meter')
          ->getStateUsing(function ($record) {
            return $record->enabled_hour ? 'Enabled' : 'Disabled';
          })
          ->badge()
          ->color(fn(string $state): string => match ($state) {
            'Enabled' => 'success',  // Verde para 'Enabled'
            'Disabled' => 'danger',  // Rojo para 'Disabled'
            default => 'gray',
          })
          ->sortable(),
        Tables\Columns\TextColumn::make('created_at')
          ->dateTime()
          ->sortable()
          ->toggleable(isToggledHiddenByDefault: true),
        Tables\Columns\TextColumn::make('updated_at')
          ->dateTime()
          ->sortable()
          ->toggleable(isToggledHiddenByDefault: true),
      ])
      ->filters([
        //
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([
          Tables\Actions\DeleteBulkAction::make(),
        ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [
      //
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListFuelEquipment::route('/'),
      'create' => Pages\CreateFuelEquipment::route('/create'),
      'edit' => Pages\EditFuelEquipment::route('/{record}/edit'),
    ];
  }
}
