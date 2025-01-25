<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
  protected static ?string $model = Project::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  protected static ?string $navigationGroup = 'Projects';

  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('name')
          ->required()
          ->maxLength(255),
        Forms\Components\TextInput::make('pda_code')
          ->required()
          ->maxLength(255),
        Forms\Components\Toggle::make('data_uploaded')
          ->required(),
        Forms\Components\TextInput::make('rate')
          ->required()
          ->numeric(),
        Forms\Components\Select::make('plant_id')
          ->relationship(name: 'plant', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('user_id')
          ->relationship(name: 'user', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('state_id')
          ->relationship(name: 'state', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('justification_id')
          ->relationship(name: 'justification', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('investment_id')
          ->relationship(name: 'investment', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\Select::make('classification_id')
          ->relationship(name: 'classification', titleAttribute: 'name')
          ->searchable()
          ->preload()
          ->required(),
        Forms\Components\DatePicker::make('start_date')
          ->required(),
        Forms\Components\DatePicker::make('finish_date')
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('name')
          ->searchable(),
        Tables\Columns\TextColumn::make('pda_code')
          ->searchable(),
        Tables\Columns\IconColumn::make('data_uploaded')
          ->boolean(),
        Tables\Columns\TextColumn::make('rate')
          ->numeric()
          ->sortable(),
        Tables\Columns\TextColumn::make('plant.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('user.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('state.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('justification.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('investment.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('classification.name')
          ->sortable(),
        Tables\Columns\TextColumn::make('start_date')
          ->date()
          ->sortable(),
        Tables\Columns\TextColumn::make('finish_date')
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
      'index' => Pages\ListProjects::route('/'),
      'create' => Pages\CreateProject::route('/create'),
      'edit' => Pages\EditProject::route('/{record}/edit'),
    ];
  }
}
