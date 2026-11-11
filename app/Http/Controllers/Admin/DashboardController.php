<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\PortfolioProject;
use App\Models\ProductionMedia;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalEnquiries = Enquiry::count();
        $newEnquiries = Enquiry::where('status', 'new')->count();
        $inProgressEnquiries = Enquiry::where('status', 'in_progress')->count();
        $completedEnquiries = Enquiry::where('status', 'completed')->count();
        $totalServices = Service::count();
        $totalPortfolio = PortfolioProject::count();
        $totalProduction = ProductionMedia::count();

        $recentEnquiries = Enquiry::with('notes.user')
            ->latest()
            ->take(8)
            ->get();

        $statusCounts = [
            'new' => $newEnquiries,
            'contacted' => Enquiry::where('status', 'contacted')->count(),
            'in_progress' => $inProgressEnquiries,
            'completed' => $completedEnquiries,
            'spam' => Enquiry::where('status', 'spam')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'totalEnquiries' => $totalEnquiries,
                'newEnquiries' => $newEnquiries,
                'inProgressEnquiries' => $inProgressEnquiries,
                'completedEnquiries' => $completedEnquiries,
                'totalServices' => $totalServices,
                'totalPortfolio' => $totalPortfolio,
                'totalProduction' => $totalProduction,
            ],
            'statusCounts' => $statusCounts,
            'recentEnquiries' => $recentEnquiries,
        ]);
    }
}
