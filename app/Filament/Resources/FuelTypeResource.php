<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FuelTypeResource\Pages;
use App\Filament\Resources\FuelTypeResource\RelationManagers;
use App\Models\FuelType;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FuelTypeResource extends Resource
{
  protected static ?string $model = FuelType::class;


  protected static ?string $navigationGroup = 'Fuel consumption management';

  protected static ?string $navigationIcon = 'heroicon-o-clipboard-document';

  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('name')
          ->required()
          ->maxLength(255),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('id')
          ->sortable(),

        Tables\Columns\TextColumn::make('name')
          ->searchable()
          ->sortable(),
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
      'index' => Pages\ListFuelTypes::route('/'),
      'create' => Pages\CreateFuelType::route('/create'),
      'edit' => Pages\EditFuelType::route('/{record}/edit'),
    ];
  }
}
