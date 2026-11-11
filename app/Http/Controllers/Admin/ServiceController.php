<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceFaq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::with('faqs')->orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'tagline' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'benefits' => 'nullable|array',
            'process' => 'nullable|array',
            'featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Handle uploaded image if present
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $service = Service::create($validated);

        if ($request->filled('faqs') && is_array($request->faqs)) {
            foreach ($request->faqs as $i => $faq) {
                if (!empty($faq['question']) && !empty($faq['answer'])) {
                    ServiceFaq::create([
                        'service_id' => $service->id,
                        'question' => $faq['question'],
                        'answer' => $faq['answer'],
                        'order' => $i + 1,
                    ]);
                }
            }
        }

        return back()->with('success', 'Service added successfully!');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug,' . $service->id,
            'tagline' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'benefits' => 'nullable|array',
            'process' => 'nullable|array',
            'featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $service->update($validated);

        if ($request->has('faqs') && is_array($request->faqs)) {
            $service->faqs()->delete();
            foreach ($request->faqs as $i => $faq) {
                if (!empty($faq['question']) && !empty($faq['answer'])) {
                    ServiceFaq::create([
                        'service_id' => $service->id,
                        'question' => $faq['question'],
                        'answer' => $faq['answer'],
                        'order' => $i + 1,
                    ]);
                }
            }
        }

        return back()->with('success', 'Service updated successfully!');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();
        return back()->with('success', 'Service deleted successfully!');
    }
}
