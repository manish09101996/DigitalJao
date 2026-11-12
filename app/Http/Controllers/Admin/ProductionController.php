<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionCategory;
use App\Models\ProductionMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductionController extends Controller
{
    public function index(): Response
    {
        $categories = ProductionCategory::withCount('media')->orderBy('order', 'asc')->get();
        $media = ProductionMedia::with('category')->orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Production/Index', [
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function storeMedia(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'production_category_id' => 'required|exists:production_categories,id',
            'title' => 'required|string|max:255',
            'file_path' => 'nullable|string',
            'media_type' => 'required|in:photo,video',
            'video_url' => 'nullable|string',
            'client_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'aspect_ratio' => 'required|in:landscape,portrait,square',
            'featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('media_file')) {
            $path = $request->file('media_file')->store('production', 'public');
            $validated['file_path'] = '/storage/' . $path;
        }

        if (empty($validated['file_path']) && !empty($validated['video_url'])) {
            $validated['file_path'] = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80';
        }

        ProductionMedia::create($validated);

        return back()->with('success', 'Production media item added successfully!');
    }

    public function updateMedia(Request $request, ProductionMedia $media): RedirectResponse
    {
        $validated = $request->validate([
            'production_category_id' => 'required|exists:production_categories,id',
            'title' => 'required|string|max:255',
            'file_path' => 'nullable|string',
            'media_type' => 'required|in:photo,video',
            'video_url' => 'nullable|string',
            'client_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'aspect_ratio' => 'required|in:landscape,portrait,square',
            'featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('media_file')) {
            $path = $request->file('media_file')->store('production', 'public');
            $validated['file_path'] = '/storage/' . $path;
        }

        $media->update($validated);

        return back()->with('success', 'Production media updated successfully!');
    }

    public function destroyMedia(ProductionMedia $media): RedirectResponse
    {
        $media->delete();
        return back()->with('success', 'Media item removed successfully!');
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:production_categories,slug',
            'description' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('hero_image_file')) {
            $path = $request->file('hero_image_file')->store('production_categories', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        }

        ProductionCategory::create($validated);

        return back()->with('success', 'Production category created successfully!');
    }
}
