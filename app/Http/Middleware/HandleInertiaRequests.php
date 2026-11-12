<?php

namespace App\Http\Middleware;

use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        if (file_exists($manifest = public_path('build/manifest.json'))) {
            return md5_file($manifest);
        }

        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = [];
        try {
            if (Schema::hasTable('website_settings')) {
                $settings = WebsiteSetting::allKeyed();
            }
        } catch (\Throwable $e) {
            $settings = [];
        }

        // Ensure site_logo resolves to full URL
        if (!empty($settings['site_logo'])) {
            if (!str_starts_with($settings['site_logo'], 'http')) {
                $settings['site_logo'] = asset(ltrim($settings['site_logo'], '/'));
            }
        } else {
            $settings['site_logo'] = asset('images/digitaljao-logo.png');
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'is_admin' => $request->user() ? $request->user()->isAdmin() : false,
            ],
            'settings' => $settings,
            'logo_url' => $settings['site_logo'],
            'app_url' => url('/'),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
