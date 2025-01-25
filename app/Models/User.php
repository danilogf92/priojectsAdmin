<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
  use HasFactory, Notifiable, HasRoles;

  protected $guard_name = 'web'; // Nombre del guard que estás utilizando

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function canAccessPanel(Panel $panel): bool
  {
    // return str_ends_with($this->email, '@gmail.com') && $this->hasVerifiedEmail();
    return str_ends_with($this->email, '@gmail.com');
  }

  public function approvals()
  {
    return $this->hasMany(Approval::class, 'user_id');
  }

  public function projects()
  {
    return $this->hasMany(Project::class, 'user_id');
  }
}
