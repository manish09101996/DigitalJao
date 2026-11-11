<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\EnquiryController as AdminEnquiryController;
use App\Http\Controllers\Admin\HomepageController as AdminHomepageController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\ProductionController as AdminProductionController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SEOController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Frontend Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/production', [ProductionController::class, 'index'])->name('production.index');
Route::post('/production/book', [ProductionController::class, 'book'])->name('production.book');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// SEO Routes
Route::get('/sitemap.xml', [SEOController::class, 'sitemap'])->name('seo.sitemap');
Route::get('/robots.txt', [SEOController::class, 'robots'])->name('seo.robots');

/*
|--------------------------------------------------------------------------
| Admin Panel Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Manage Services
    Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');

    // Manage Portfolio
    Route::get('/portfolio', [AdminPortfolioController::class, 'index'])->name('portfolio.index');
    Route::post('/portfolio', [AdminPortfolioController::class, 'store'])->name('portfolio.store');
    Route::put('/portfolio/{project}', [AdminPortfolioController::class, 'update'])->name('portfolio.update');
    Route::delete('/portfolio/{project}', [AdminPortfolioController::class, 'destroy'])->name('portfolio.destroy');

    // Manage DigitalJao Production
    Route::get('/production', [AdminProductionController::class, 'index'])->name('production.index');
    Route::post('/production/categories', [AdminProductionController::class, 'storeCategory'])->name('production.categories.store');
    Route::post('/production/media', [AdminProductionController::class, 'storeMedia'])->name('production.media.store');
    Route::put('/production/media/{media}', [AdminProductionController::class, 'updateMedia'])->name('production.media.update');
    Route::delete('/production/media/{media}', [AdminProductionController::class, 'destroyMedia'])->name('production.media.destroy');

    // Manage Enquiries
    Route::get('/enquiries', [AdminEnquiryController::class, 'index'])->name('enquiries.index');
    Route::get('/enquiries/export', [AdminEnquiryController::class, 'export'])->name('enquiries.export');
    Route::put('/enquiries/{enquiry}/status', [AdminEnquiryController::class, 'updateStatus'])->name('enquiries.status');
    Route::post('/enquiries/{enquiry}/notes', [AdminEnquiryController::class, 'addNote'])->name('enquiries.notes');
    Route::delete('/enquiries/{enquiry}', [AdminEnquiryController::class, 'destroy'])->name('enquiries.destroy');

    // Manage Homepage Content
    Route::get('/homepage', [AdminHomepageController::class, 'index'])->name('homepage.index');
    Route::post('/homepage/hero', [AdminHomepageController::class, 'updateHero'])->name('homepage.hero');
    Route::post('/homepage/intro', [AdminHomepageController::class, 'updateIntro'])->name('homepage.intro');
    Route::post('/homepage/testimonials', [AdminHomepageController::class, 'storeTestimonial'])->name('homepage.testimonials.store');
    Route::delete('/homepage/testimonials/{testimonial}', [AdminHomepageController::class, 'destroyTestimonial'])->name('homepage.testimonials.destroy');
    Route::post('/homepage/faqs', [AdminHomepageController::class, 'storeFaq'])->name('homepage.faqs.store');
    Route::delete('/homepage/faqs/{faq}', [AdminHomepageController::class, 'destroyFaq'])->name('homepage.faqs.destroy');

    // Manage Website Settings
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});

// User Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        if (request()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('home');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
