<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AreaMachinesResource\Pages;
use App\Filament\Resources\AreaMachinesResource\RelationManagers;
use App\Models\AreaMachines;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AreaMachinesResource extends Resource
{
  protected static ?string $model = AreaMachines::class;

  protected static ?string $navigationGroup = 'Permissions';

  protected static ?string $navigationIcon = 'heroicon-o-funnel';

  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\Select::make('plant_id')
          ->relationship(name: 'plant', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\TextInput::make('nombre')
          ->required()
          ->maxLength(255),
        Forms\Components\Textarea::make('descripcion')
          ->columnSpanFull(),
        Forms\Components\Toggle::make('activo')
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('plant.name')
          ->numeric()
          ->searchable()
          ->sortable(),
        Tables\Columns\TextColumn::make('nombre')
          ->searchable(),
        Tables\Columns\IconColumn::make('activo')
          ->boolean(),
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
      'index' => Pages\ListAreaMachines::route('/'),
      'create' => Pages\CreateAreaMachines::route('/create'),
      'edit' => Pages\EditAreaMachines::route('/{record}/edit'),
    ];
  }
}
