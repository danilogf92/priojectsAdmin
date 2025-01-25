<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeterResource\Pages;
use App\Filament\Resources\MeterResource\RelationManagers;
use App\Models\Meter;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MeterResource extends Resource
{
  protected static ?string $model = Meter::class;

  protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-line';

  protected static ?string $navigationGroup = 'Water consumption management';

  protected static ?int $navigationSort = 3;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('name')
          ->required()
          ->maxLength(255),
        Forms\Components\TextInput::make('upper_limit')
          ->numeric()
          ->default(null),
        Forms\Components\Select::make('plant_id')
          ->relationship(name: 'plant', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('type_id')
          ->relationship(name: 'meterType', titleAttribute: 'type')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Toggle::make('enabled'),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('name')
          ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('upper_limit')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('plant.name')
          ->numeric()
          ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('meterType.type')
          ->numeric()
          // ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('enabled')
          ->label('Status')
          ->getStateUsing(function ($record) {
            return $record->enabled ? 'Enabled' : 'Disabled';
          })
          ->badge()
          ->color(fn(string $state): string => match ($state) {
            'Enabled' => 'success',  // Verde para 'Enabled'
            'Disabled' => 'danger',  // Rojo para 'Disabled'
            default => 'gray',
          })
          // ->searchable()
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
      'index' => Pages\ListMeters::route('/'),
      'create' => Pages\CreateMeter::route('/create'),
      'edit' => Pages\EditMeter::route('/{record}/edit'),
    ];
  }
}
