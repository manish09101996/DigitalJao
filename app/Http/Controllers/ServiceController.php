<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::active()->with('faqs')->get();

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->where('is_active', true)
            ->with('faqs')
            ->firstOrFail();

        // Get related projects
        $relatedProjects = PortfolioProject::published()
            ->with('category')
            ->take(3)
            ->get();

        $allServices = Service::active()->select('id', 'title', 'slug', 'icon')->get();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'relatedProjects' => $relatedProjects,
            'allServices' => $allServices,
        ]);
    }
}
