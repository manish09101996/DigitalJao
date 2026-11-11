<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\HomepageSection;
use App\Models\PortfolioProject;
use App\Models\ProductionCategory;
use App\Models\ProductionMedia;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $hero = HomepageSection::getByKey('hero');
        $intro = HomepageSection::getByKey('intro');
        $productionPromo = HomepageSection::getByKey('production_promo');

        $featuredServices = Service::active()->take(6)->get();
        $allServices = Service::active()->get();
        $featuredProjects = PortfolioProject::published()->with('category')->take(4)->get();
        $productionCategories = ProductionCategory::with(['media' => fn($q) => $q->take(4)])->orderBy('order', 'asc')->get();
        $featuredProductionMedia = ProductionMedia::where('featured', true)->with('category')->take(6)->get();
        $testimonials = Testimonial::active()->take(6)->get();
        $faqs = Faq::active()->take(6)->get();

        return Inertia::render('Home', [
            'hero' => $hero,
            'intro' => $intro,
            'productionPromo' => $productionPromo,
            'featuredServices' => $featuredServices,
            'allServices' => $allServices,
            'featuredProjects' => $featuredProjects,
            'productionCategories' => $productionCategories,
            'featuredProductionMedia' => $featuredProductionMedia,
            'testimonials' => $testimonials,
            'faqs' => $faqs,
        ]);
    }
}
