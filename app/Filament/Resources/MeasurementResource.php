<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeasurementResource\Pages;
use App\Filament\Resources\MeasurementResource\RelationManagers;
use App\Models\Measurement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MeasurementResource extends Resource
{
  protected static ?string $model = Measurement::class;

  protected static ?string $navigationIcon = 'heroicon-o-clipboard';

  protected static ?string $navigationGroup = 'Water consumption management';

  protected static ?int $navigationSort = 4;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\Select::make('plant_id')
          ->relationship(name: 'plant', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('meter_id')
          ->relationship(name: 'meter', titleAttribute: 'name')
          ->searchable()
          ->preload()
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
        Forms\Components\DatePicker::make('date')
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('plant.name')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('meter.name')
          ->numeric()
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
        Tables\Columns\TextColumn::make('date')
          ->date()
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
        Tables\Actions\ViewAction::make(),
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
      'index' => Pages\ListMeasurements::route('/'),
      'create' => Pages\CreateMeasurement::route('/create'),
      'edit' => Pages\EditMeasurement::route('/{record}/edit'),
    ];
  }
}
