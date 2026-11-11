<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $settings = WebsiteSetting::allKeyed();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->except(['_token', 'site_logo_file']);

        if ($request->hasFile('site_logo_file')) {
            $path = $request->file('site_logo_file')->store('settings', 'public');
            $data['site_logo'] = '/storage/' . $path;
        }

        foreach ($data as $key => $value) {
            WebsiteSetting::set($key, (string)$value);
        }

        return back()->with('success', 'Website settings updated successfully!');
    }
}
