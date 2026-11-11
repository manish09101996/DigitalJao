<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductionMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'production_category_id',
        'title',
        'file_path',
        'media_type',
        'video_url',
        'client_name',
        'location',
        'aspect_ratio',
        'featured',
        'order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductionCategory::class, 'production_category_id');
    }
}
