<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $services = Service::active()->select('id', 'title')->get();

        return Inertia::render('Contact', [
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'service' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:100',
            'message' => 'required|string|max:4000',
        ]);

        Enquiry::create([
            'type' => 'general',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'service' => $validated['service'] ?? null,
            'budget' => $validated['budget'] ?? null,
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return back()->with('success', 'Thank you for reaching out! A DigitalJao growth strategist will contact you within 24 hours.');
    }
}
