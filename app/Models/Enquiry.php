<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Enquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'email',
        'phone',
        'service',
        'production_category',
        'event_date',
        'budget',
        'message',
        'status',
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(EnquiryNote::class)->latest();
    }
}
