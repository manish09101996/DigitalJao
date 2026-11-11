<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'title',
        'subtitle',
        'tagline',
        'cta_text',
        'cta_url',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public static function getByKey(string $key)
    {
        return static::where('section_key', $key)->first();
    }
}
