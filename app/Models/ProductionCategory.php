<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductionCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'hero_image',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function media(): HasMany
    {
        return $this->hasMany(ProductionMedia::class)->orderBy('order', 'asc');
    }

    public function getHeroImageAttribute($value): ?string
    {
        if (empty($value)) {
            return $value;
        }
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }
        return asset(ltrim($value, '/'));
    }
}
