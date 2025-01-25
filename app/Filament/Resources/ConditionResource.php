<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ConditionResource\Pages;
use App\Filament\Resources\ConditionResource\RelationManagers;
use App\Models\Condition;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ConditionResource extends Resource
{
  protected static ?string $model = Condition::class;

  protected static ?string $navigationGroup = 'Permissions';

  protected static ?string $navigationIcon = 'heroicon-o-funnel';

  protected static ?int $navigationSort = 3;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('nombre')
          ->required()
          ->maxLength(255),
        Forms\Components\TextInput::make('cumple')
          ->required()
          ->maxLength(255),
        Forms\Components\Textarea::make('observaciones')
          ->columnSpanFull(),
        Forms\Components\Toggle::make('active')
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('nombre')
          ->searchable(),
        Tables\Columns\TextColumn::make('observaciones')
          ->searchable(),
        Tables\Columns\TextColumn::make('cumple')
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
      'index' => Pages\ListConditions::route('/'),
      'create' => Pages\CreateCondition::route('/create'),
      'edit' => Pages\EditCondition::route('/{record}/edit'),
    ];
  }
}
