<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioCategory;
use App\Models\PortfolioProject;
use App\Models\PortfolioMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        $projects = PortfolioProject::with(['category', 'media'])->orderBy('order', 'asc')->get();
        $categories = PortfolioCategory::all();

        return Inertia::render('Admin/Portfolio/Index', [
            'projects' => $projects,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:portfolio_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:portfolio_projects,slug',
            'client_name' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'video_url' => 'nullable|string',
            'results_metric' => 'nullable|string',
            'results_label' => 'nullable|string',
            'services_used' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('portfolio', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        $project = PortfolioProject::create($validated);

        if (!empty($project->featured_image)) {
            PortfolioMedia::create([
                'portfolio_project_id' => $project->id,
                'file_path' => $project->featured_image,
                'media_type' => 'image',
                'caption' => $project->title . ' key visual',
                'order' => 1,
            ]);
        }

        return back()->with('success', 'Project created successfully!');
    }

    public function update(Request $request, PortfolioProject $project): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:portfolio_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:portfolio_projects,slug,' . $project->id,
            'client_name' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'video_url' => 'nullable|string',
            'results_metric' => 'nullable|string',
            'results_label' => 'nullable|string',
            'services_used' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('portfolio', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        $project->update($validated);

        return back()->with('success', 'Project updated successfully!');
    }

    public function destroy(PortfolioProject $project): RedirectResponse
    {
        $project->delete();
        return back()->with('success', 'Project deleted successfully!');
    }
}
