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
}
