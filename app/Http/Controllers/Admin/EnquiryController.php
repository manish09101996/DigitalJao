<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\EnquiryNote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;
use Inertia\Response;

class EnquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $type = $request->query('type');
        $search = $request->query('search');

        $query = Enquiry::with('notes.user')->latest();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $enquiries = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => $enquiries,
            'filters' => [
                'status' => $status ?? 'all',
                'type' => $type ?? 'all',
                'search' => $search ?? '',
            ],
        ]);
    }

    public function updateStatus(Request $request, Enquiry $enquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,in_progress,completed,spam',
        ]);

        $enquiry->update(['status' => $validated['status']]);

        return back()->with('success', 'Enquiry status updated to ' . $validated['status']);
    }

    public function addNote(Request $request, Enquiry $enquiry): RedirectResponse
    {
        $validated = $request->validate([
            'note' => 'required|string|max:2000',
        ]);

        EnquiryNote::create([
            'enquiry_id' => $enquiry->id,
            'user_id' => $request->user()->id,
            'note' => $validated['note'],
        ]);

        return back()->with('success', 'Internal note recorded.');
    }

    public function destroy(Enquiry $enquiry): RedirectResponse
    {
        $enquiry->delete();
        return back()->with('success', 'Enquiry deleted successfully.');
    }

    public function export(): StreamedResponse
    {
        $enquiries = Enquiry::latest()->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="digitaljao-enquiries-' . date('Y-m-d') . '.csv"',
        ];

        return response()->stream(function () use ($enquiries) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Type', 'Name', 'Email', 'Phone', 'Service/Category', 'Budget', 'Date', 'Status', 'Message', 'Created At']);

            foreach ($enquiries as $row) {
                fputcsv($handle, [
                    $row->id,
                    $row->type,
                    $row->name,
                    $row->email,
                    $row->phone,
                    $row->service ?: $row->production_category,
                    $row->budget,
                    $row->event_date,
                    $row->status,
                    $row->message,
                    $row->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}
