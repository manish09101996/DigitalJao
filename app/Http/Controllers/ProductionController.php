<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\ProductionCategory;
use App\Models\ProductionMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductionController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = ProductionCategory::orderBy('order', 'asc')->get();

        $selectedCategory = $request->query('category', 'all');

        $query = ProductionMedia::with('category')->orderBy('order', 'asc');

        if ($selectedCategory !== 'all') {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('slug', $selectedCategory);
            });
        }

        $media = $query->get();

        return Inertia::render('Production/Index', [
            'categories' => $categories,
            'media' => $media,
            'activeCategory' => $selectedCategory,
        ]);
    }

    public function book(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'production_category' => 'required|string|max:255',
            'event_date' => 'nullable|string|max:100',
            'budget' => 'nullable|string|max:100',
            'message' => 'required|string|max:3000',
        ]);

        Enquiry::create([
            'type' => 'production_booking',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'production_category' => $validated['production_category'],
            'event_date' => $validated['event_date'] ?? null,
            'budget' => $validated['budget'] ?? null,
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return back()->with('success', 'Your shoot booking request has been submitted! Our production director will connect with you within 24 hours.');
    }
}
