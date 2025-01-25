<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FuelMeasurementResource\Pages;
use App\Filament\Resources\FuelMeasurementResource\RelationManagers;
use App\Models\Fuel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FuelMeasurementResource extends Resource
{
  protected static ?string $model = Fuel::class;

  protected static ?string $navigationGroup = 'Fuel consumption management';

  protected static ?string $navigationIcon = 'heroicon-o-arrow-trending-up';

  protected static ?int $navigationSort = 3;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\Select::make('plant_id')
          ->relationship('plant', 'name')
          ->preload()
          ->required()
          ->reactive()
          ->afterStateUpdated(fn(callable $set) => $set('fuel_equipment_id', null)),
        Forms\Components\Select::make('fuel_equipment_id')
          ->required()
          ->options(function (callable $get) {
            $plantId = $get('plant_id');
            if ($plantId) {
              return \App\Models\FuelEquipment::where('plant_id', $plantId)->pluck('name', 'id');
            }
            return [];
          })
          ->searchable()
          ->preload(),
        Forms\Components\DatePicker::make('date')
          ->required(),
        Forms\Components\TextInput::make('start_value')
          ->required()
          ->numeric(),
        Forms\Components\TextInput::make('end_value')
          ->required()
          ->numeric(),
        Forms\Components\TextInput::make('difference')
          ->required()
          ->numeric(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('plant.name')
          ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('fuelEquipment.name')
          ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('date')
          ->date()
          ->sortable(),
        Tables\Columns\TextColumn::make('start_value')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('end_value')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('difference')
          ->numeric()
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
      'index' => Pages\ListFuelMeasurements::route('/'),
      'create' => Pages\CreateFuelMeasurement::route('/create'),
      'edit' => Pages\EditFuelMeasurement::route('/{record}/edit'),
    ];
  }
}
