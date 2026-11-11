<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::active()->take(4)->get();

        return Inertia::render('About', [
            'testimonials' => $testimonials,
        ]);
    }
}
