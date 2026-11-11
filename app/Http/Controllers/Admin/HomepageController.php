<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\HomepageSection;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function index(): Response
    {
        $hero = HomepageSection::getByKey('hero');
        $intro = HomepageSection::getByKey('intro');
        $productionPromo = HomepageSection::getByKey('production_promo');
        $testimonials = Testimonial::orderBy('order', 'asc')->get();
        $faqs = Faq::orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Homepage/Index', [
            'hero' => $hero,
            'intro' => $intro,
            'productionPromo' => $productionPromo,
            'testimonials' => $testimonials,
            'faqs' => $faqs,
        ]);
    }

    public function updateHero(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'tagline' => 'nullable|string|max:255',
            'cta_text' => 'required|string|max:100',
            'cta_url' => 'required|string|max:255',
            'secondary_cta_text' => 'nullable|string|max:100',
            'secondary_cta_url' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:255',
            'stats' => 'nullable|array',
        ]);

        $content = [
            'secondary_cta_text' => $validated['secondary_cta_text'] ?? 'Explore Services',
            'secondary_cta_url' => $validated['secondary_cta_url'] ?? '/services',
            'badge' => $validated['badge'] ?? '⚡ Premier Digital Marketing & Production Agency',
            'stats' => $validated['stats'] ?? [],
        ];

        HomepageSection::updateOrCreate(
            ['section_key' => 'hero'],
            [
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'],
                'tagline' => $validated['tagline'],
                'cta_text' => $validated['cta_text'],
                'cta_url' => $validated['cta_url'],
                'content' => $content,
            ]
        );

        return back()->with('success', 'Homepage Hero section updated successfully!');
    }

    public function updateIntro(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:1000',
            'tagline' => 'nullable|string|max:255',
            'cta_text' => 'nullable|string|max:100',
            'cta_url' => 'nullable|string|max:255',
            'pillars' => 'nullable|array',
        ]);

        HomepageSection::updateOrCreate(
            ['section_key' => 'intro'],
            [
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'],
                'tagline' => $validated['tagline'],
                'cta_text' => $validated['cta_text'],
                'cta_url' => $validated['cta_url'],
                'content' => ['pillars' => $validated['pillars'] ?? []],
            ]
        );

        return back()->with('success', 'Homepage Intro section updated successfully!');
    }

    public function storeTestimonial(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_role' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:2000',
            'project_type' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        Testimonial::create($validated);
        return back()->with('success', 'Testimonial added successfully!');
    }

    public function destroyTestimonial(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();
        return back()->with('success', 'Testimonial removed successfully!');
    }

    public function storeFaq(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|in:general,marketing,production',
            'question' => 'required|string|max:500',
            'answer' => 'required|string|max:3000',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        Faq::create($validated);
        return back()->with('success', 'FAQ added successfully!');
    }

    public function destroyFaq(Faq $faq): RedirectResponse
    {
        $faq->delete();
        return back()->with('success', 'FAQ deleted successfully!');
    }
}
