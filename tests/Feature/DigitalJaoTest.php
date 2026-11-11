<?php

namespace Tests\Feature;

use App\Models\Enquiry;
use App\Models\PortfolioCategory;
use App\Models\PortfolioProject;
use App\Models\ProductionCategory;
use App\Models\ProductionMedia;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DigitalJaoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_home_page_renders_successfully_with_brand_vision(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee('DigitalJao');
    }

    public function test_about_page_renders(): void
    {
        $response = $this->get('/about');
        $response->assertStatus(200);
    }

    public function test_services_index_and_detail_pages_render(): void
    {
        $response = $this->get('/services');
        $response->assertStatus(200);

        $service = Service::first();
        $this->assertNotNull($service);

        $detailResponse = $this->get('/services/' . $service->slug);
        $detailResponse->assertStatus(200);
    }

    public function test_production_page_renders_and_booking_works(): void
    {
        $response = $this->get('/production');
        $response->assertStatus(200);

        $bookingData = [
            'name' => 'Aarav Singhania',
            'email' => 'aarav@example.com',
            'phone' => '+91 99999 88888',
            'production_category' => 'Car Delivery Shoots',
            'event_date' => '2026-12-20',
            'budget' => '$1,000 - $3,000',
            'message' => 'Need delivery shoot for new vehicle in Delhi.',
        ];

        $postResponse = $this->post('/production/book', $bookingData);
        $postResponse->assertSessionHas('success');

        $this->assertDatabaseHas('enquiries', [
            'email' => 'aarav@example.com',
            'type' => 'production_booking',
            'production_category' => 'Car Delivery Shoots',
        ]);
    }

    public function test_portfolio_index_and_detail_pages_render(): void
    {
        $response = $this->get('/portfolio');
        $response->assertStatus(200);

        $project = PortfolioProject::first();
        $this->assertNotNull($project);

        $detailResponse = $this->get('/portfolio/' . $project->slug);
        $detailResponse->assertStatus(200);
    }

    public function test_contact_form_submission_stores_enquiry_in_database(): void
    {
        $contactData = [
            'name' => 'Kavita Roy',
            'email' => 'kavita@royconsulting.com',
            'phone' => '+91 91111 22222',
            'service' => 'Lead Generation',
            'budget' => '$3,000 - $7,000',
            'message' => 'Looking to scale corporate B2B leads.',
        ];

        $response = $this->post('/contact', $contactData);
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('enquiries', [
            'email' => 'kavita@royconsulting.com',
            'name' => 'Kavita Roy',
            'status' => 'new',
        ]);
    }

    public function test_seo_sitemap_and_robots_return_200(): void
    {
        $sitemap = $this->get('/sitemap.xml');
        $sitemap->assertStatus(200);
        $sitemap->assertHeader('Content-Type', 'text/xml; charset=UTF-8');

        $robots = $this->get('/robots.txt');
        $robots->assertStatus(200);
        $robots->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
    }

    public function test_guests_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin');
        $response->assertRedirect('/login');
    }

    public function test_authenticated_admin_can_access_admin_panel(): void
    {
        $admin = User::where('email', 'admin@digitaljao.com')->first();
        $this->assertNotNull($admin);

        $response = $this->actingAs($admin)->get('/admin');
        $response->assertStatus(200);

        $servicesResponse = $this->actingAs($admin)->get('/admin/services');
        $servicesResponse->assertStatus(200);

        $portfolioResponse = $this->actingAs($admin)->get('/admin/portfolio');
        $portfolioResponse->assertStatus(200);

        $productionResponse = $this->actingAs($admin)->get('/admin/production');
        $productionResponse->assertStatus(200);

        $enquiriesResponse = $this->actingAs($admin)->get('/admin/enquiries');
        $enquiriesResponse->assertStatus(200);
    }
}
