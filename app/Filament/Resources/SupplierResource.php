<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SupplierResource\Pages;
use App\Filament\Resources\SupplierResource\RelationManagers;
use App\Models\Supplier;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SupplierResource extends Resource
{
  protected static ?string $model = Supplier::class;

  protected static ?string $navigationGroup = 'Permissions';

  protected static ?string $navigationIcon = 'heroicon-o-funnel';

  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('name')
          ->required()
          ->maxLength(255),
        Forms\Components\TextInput::make('city')
          ->maxLength(255)
          ->default(null),
        Forms\Components\TextInput::make('phone_business')
          ->tel()
          ->maxLength(255)
          ->default(null),
        Forms\Components\TextInput::make('phone')
          ->tel()
          ->maxLength(255)
          ->default(null),
        Forms\Components\Textarea::make('description')
          ->columnSpanFull(),
        Forms\Components\Toggle::make('active')
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('name')
          ->searchable(),
        Tables\Columns\TextColumn::make('city')
          ->searchable(),
        Tables\Columns\TextColumn::make('phone_business')
          ->searchable(),
        Tables\Columns\TextColumn::make('phone')
          ->searchable(),
        Tables\Columns\IconColumn::make('active')
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
      'index' => Pages\ListSuppliers::route('/'),
      'create' => Pages\CreateSupplier::route('/create'),
      'edit' => Pages\EditSupplier::route('/{record}/edit'),
    ];
  }
}
