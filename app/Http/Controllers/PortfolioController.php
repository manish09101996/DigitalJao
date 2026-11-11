<?php

namespace App\Http\Controllers;

use App\Models\PortfolioCategory;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = PortfolioCategory::all();
        $selectedCategory = $request->query('category', 'all');

        $query = PortfolioProject::published()->with(['category', 'media'])->orderBy('order', 'asc');

        if ($selectedCategory !== 'all') {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('slug', $selectedCategory);
            });
        }

        $projects = $query->get();

        return Inertia::render('Portfolio/Index', [
            'categories' => $categories,
            'projects' => $projects,
            'activeCategory' => $selectedCategory,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = PortfolioProject::where('slug', $slug)
            ->where('is_published', true)
            ->with(['category', 'media'])
            ->firstOrFail();

        $moreProjects = PortfolioProject::published()
            ->where('id', '!=', $project->id)
            ->with('category')
            ->take(3)
            ->get();

        return Inertia::render('Portfolio/Show', [
            'project' => $project,
            'moreProjects' => $moreProjects,
        ]);
    }
}
