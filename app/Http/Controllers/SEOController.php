<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use App\Models\Service;
use Illuminate\Http\Response;

class SEOController extends Controller
{
    public function sitemap(): Response
    {
        $baseUrl = config('app.url', url('/'));
        $services = Service::active()->get();
        $projects = PortfolioProject::published()->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Static routes
        $staticRoutes = [
            '/',
            '/about',
            '/services',
            '/production',
            '/portfolio',
            '/contact',
        ];

        foreach ($staticRoutes as $route) {
            $xml .= '<url>';
            $xml .= '<loc>' . rtrim($baseUrl, '/') . $route . '</loc>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>' . ($route === '/' ? '1.0' : '0.8') . '</priority>';
            $xml .= '</url>';
        }

        // Services
        foreach ($services as $service) {
            $xml .= '<url>';
            $xml .= '<loc>' . rtrim($baseUrl, '/') . '/services/' . $service->slug . '</loc>';
            $xml .= '<lastmod>' . $service->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.9</priority>';
            $xml .= '</url>';
        }

        // Projects
        foreach ($projects as $project) {
            $xml .= '<url>';
            $xml .= '<loc>' . rtrim($baseUrl, '/') . '/portfolio/' . $project->slug . '</loc>';
            $xml .= '<lastmod>' . $project->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }

    public function robots(): Response
    {
        $baseUrl = config('app.url', url('/'));
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin\n";
        $content .= "Disallow: /admin/*\n";
        $content .= "Disallow: /dashboard\n";
        $content .= "Sitemap: " . rtrim($baseUrl, '/') . "/sitemap.xml\n";

        return response($content, 200)->header('Content-Type', 'text/plain');
    }
}
