<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'tagline',
        'short_description',
        'description',
        'benefits',
        'process',
        'icon',
        'image',
        'featured',
        'is_active',
        'order',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'benefits' => 'array',
        'process' => 'array',
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function faqs(): HasMany
    {
        return $this->hasMany(ServiceFaq::class)->orderBy('order', 'asc');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order', 'asc');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true)->where('is_active', true)->orderBy('order', 'asc');
    }
}
