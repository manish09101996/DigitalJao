<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'portfolio_project_id',
        'file_path',
        'media_type',
        'caption',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(PortfolioProject::class, 'portfolio_project_id');
    }
}
