# DigitalJao – Complete Modern Digital Marketing & Production Website

![DigitalJao Logo](public/images/digitaljao-logo.jpg)

> **"Your Brand Deserves to Be Seen."**  
> *Strategy, creativity and execution – all in one place.*

---

## 🌟 Project Overview

**DigitalJao** is a world-class, premium digital marketing agency and cinematic production platform. Built with a robust **Laravel 12** backend and a reactive **Inertia.js + React + Tailwind CSS** frontend, the website combines high-performance acquisition funnels with Hollywood-grade visual storytelling.

### Core Value Hubs:
1. **DigitalJao Marketing Hub**: Full-funnel digital marketing, social media marketing, LinkedIn management, Google Business local SEO, branding & visual identity, lead generation, Facebook/Instagram Meta ads, Google ads PPC, video editing, and on-location video shoots.
2. **DigitalJao Production**: A photography-first cinematic experience (*"Every Moment Deserves a Story. Thoughtful shoots. Beautiful edits. Memories that stay."*) covering weddings, pre-weddings, birthday celebrations, family functions, car delivery shoots, bike delivery shoots, grand retail openings, and corporate galas.
3. **Dynamic Admin Panel (`/admin`)**: Real-time management of marketing services, portfolio case studies, production galleries, CRM enquiries with status tracking and internal notes, homepage hero copy, testimonials, and website settings.

---

## 🛠️ Technology Stack

- **Backend Framework**: Laravel 12 (PHP 8.2+)
- **Frontend Stack**: React 18 with Inertia.js (SPA feel, zero API boilerplate)
- **Styling**: Tailwind CSS with custom brand theme
- **Database**: MySQL 8.0+ / MariaDB (`digitaljao_db`)
- **Animations**: GSAP & Framer Motion (word reveals, magnetic interactions, smooth entrances)
- **Smooth Scrolling**: Lenis (`@studio-freight/lenis`) with prefers-reduced-motion accessibility
- **Iconography**: Lucide React + custom branded vector icons
- **Admin Dashboard**: Custom responsive Inertia Admin Dashboard at `/admin`
- **File Storage**: Laravel Public Storage symlink
- **Authentication**: Laravel Authentication with role authorization middleware
- **Email Notifications**: Laravel Mailer with SMTP / Log driver

---

## 🎨 Brand Design System

- **Deep Navy**: `#061A3A` (Primary background foundation)
- **Electric Blue**: `#1769FF` (Signature brand accent & energetic CTAs)
- **Cyan**: `#19C8F5` (High-contrast glow, typography gradients & highlights)
- **Pure White**: `#FFFFFF` (Crisp typography & high-contrast elements)
- **Light Accent**: `#F5F8FF` (Subtle modern light sections)
- **Original Logo**: Full preservation of the authentic DigitalJao brand emblem.

---

## 🚀 Key Features

### 1. Animated Public Website
- **Cinematic Homepage**:
  - Animated Hero with word reveals, stats counters, and dual CTAs.
  - Value proposition ("Digital growth, built around your business") with 3 pillars.
  - Interactive grid featuring all **10 Core Services**.
  - DigitalJao Production promotional showcase.
  - Selected work with verified outcome badges (`+460% ROAS`, `+180k Followers`, `$45M Sales`).
  - Genuine client testimonials.
  - Interactive FAQ accordion.
  - High-conversion bottom CTA banner.
- **About Us**: Narrative, brand vision, mission, methodology, and values.
- **Services (10 Individual Pages)**:
  1. `/services/digital-marketing`
  2. `/services/social-media-marketing`
  3. `/services/linkedin-management`
  4. `/services/google-business-profile`
  5. `/services/branding`
  6. `/services/lead-generation`
  7. `/services/facebook-instagram-ads`
  8. `/services/google-ads`
  9. `/services/video-editing`
  10. `/services/video-shoots`
  *Each service page includes hero banner, strategic intro, key benefits checklist, 4-step delivery roadmap, related case studies, FAQs, and a dedicated sticky enquiry form.*
- **DigitalJao Production Studio (`/production`)**:
  - Full-width hero with cinematic photography.
  - Masonry gallery with category filters (Weddings, Pre-Weddings, Birthdays, Car Deliveries, Bike Deliveries, Openings, Celebrations).
  - High-resolution interactive Lightbox modal with video player support.
  - "Book a Shoot" booking modal with event date and category picker.
- **Portfolio & Case Studies (`/portfolio`)**:
  - Filterable project directory.
  - Individual detail pages (`/portfolio/{slug}`) with strategy narratives, metrics, and image galleries.
- **Contact Us (`/contact`)**:
  - Multi-field enquiry form with service and budget selector.
  - WhatsApp click-to-chat direct button with prefilled greeting.
  - Embedded Google Maps and verified studio contact coordinates.
- **SEO & Performance**:
  - Dynamic Open Graph meta tags and title tags per page.
  - Auto-generated XML sitemap at `/sitemap.xml`.
  - Configurable `robots.txt` at `/robots.txt`.
  - Custom neon scroll progress bar.
  - Interactive custom cursor on desktop (with automatic touch and reduced-motion detection).

### 2. Complete Admin Control Panel (`/admin`)
- **Dashboard Overview**: Summary counters for new enquiries, active services, portfolio count, and production media.
- **Service Management**: Add, edit, delete, reorder services, customize slugs, SEO tags, and service-specific FAQs.
- **Portfolio Management**: Create case studies with verified outcome metrics, tags, image galleries, and YouTube/video embeds.
- **Production Management**: Create custom categories and upload photos/videos with custom aspect ratios (`landscape`, `portrait`, `square`).
- **Enquiries & CRM**:
  - Filter by status (`new`, `contacted`, `in_progress`, `completed`, `spam`) and type.
  - Instant status updater dropdown.
  - Internal staff notes system per enquiry.
  - One-click CSV Export (`/admin/enquiries/export`).
- **Homepage CMS**: Edit hero headline, tagline, CTA labels, statistics, testimonials, and global FAQs.
- **Website Settings**: Configure official phone, WhatsApp number, email, address, social media URLs, and Google Analytics ID.

---

## 🔑 Default Admin Credentials

- **Admin URL**: `http://localhost:8000/admin` (or `http://localhost:8000/login`)
- **Email**: `admin@digitaljao.com`
- **Password**: `password123`

---

## 💻 Setup & Installation Guide

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js (v20+) and npm
- MySQL / MariaDB (via XAMPP or standalone)

### 1. Clone & Install Dependencies
```bash
# Clone the repository (or navigate to workspace)
cd c:\xampp\htdocs\DigitalJao

# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### 2. Environment Configuration
Verify your `.env` settings:
```env
APP_NAME=DigitalJao
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=digitaljao_db
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public
```

### 3. Database Migration & Seeding
```bash
# Run migrations and seed complete sample dataset
php artisan migrate --seed

# Create storage symlink
php artisan storage:link
```

### 4. Build Frontend Assets
```bash
# Build for production
npm run build

# Or run Vite dev server for hot reload
npm run dev
```

### 5. Start the Application Server
```bash
php artisan serve --port=8000
```
Open **`http://localhost:8000`** in your browser to experience the site.

---

## 🧪 Automated Testing

All features are covered by automated unit and feature tests:
```bash
php artisan test
```

Test suite validates:
- Public route rendering (Home, About, Services, Production, Portfolio, Contact)
- Contact and photoshoot booking form submissions
- Database persistence and validation
- Dynamic SEO sitemap and robots.txt
- Admin authentication and authorization guardrails

---

## 🔒 Security Best Practices Implemented
- Strict CSRF protection on all Inertia form requests.
- Server-side input validation on every contact and booking submission.
- Middleware protection on `/admin` checking `isAdmin()` authorization.
- XSS prevention via Inertia and Blade sanitization.
- Parameterized SQL queries via Eloquent ORM.

---

## 📄 License
Proprietary software developed exclusively for **DigitalJao**.
