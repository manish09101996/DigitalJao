<?php

namespace Database\Seeders;

use App\Models\Enquiry;
use App\Models\Faq;
use App\Models\HomepageSection;
use App\Models\PortfolioCategory;
use App\Models\PortfolioProject;
use App\Models\PortfolioMedia;
use App\Models\ProductionCategory;
use App\Models\ProductionMedia;
use App\Models\Service;
use App\Models\ServiceFaq;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\WebsiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@digitaljao.com'],
            [
                'name' => 'DigitalJao Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'is_admin' => true,
            ]
        );

        // 2. Website Settings
        $settings = [
            'site_name' => 'DigitalJao',
            'site_tagline' => 'Your Brand Deserves to Be Seen.',
            'site_subtagline' => 'Strategy, creativity and execution – all in one place.',
            'site_logo' => '/images/digitaljao-logo.jpg',
            'contact_email' => 'contact@digitaljao.com',
            'contact_phone' => '+91 98765 43210',
            'contact_whatsapp' => '+919876543210',
            'contact_address' => 'DigitalJao Creative Hub, Sector 62, Cyber City, India',
            'social_instagram' => 'https://instagram.com/digitaljao',
            'social_facebook' => 'https://facebook.com/digitaljao',
            'social_linkedin' => 'https://linkedin.com/company/digitaljao',
            'social_youtube' => 'https://youtube.com/@digitaljao',
            'social_x' => 'https://x.com/digitaljao',
            'footer_bio' => 'DigitalJao is a premier growth marketing agency and cinematic production studio delivering measurable ROI, magnetic brand stories, and hyper-targeted lead generation.',
            'google_analytics_id' => 'G-DJMARKETING01',
            'meta_title' => 'DigitalJao | Premier Digital Marketing Agency & Production Studio',
            'meta_description' => 'Scale your revenue and amplify your visual presence with DigitalJao. Specialized in Performance Ads, Lead Gen, Social Growth, and Cinematic Media Production.',
        ];

        foreach ($settings as $key => $val) {
            WebsiteSetting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        // 3. Homepage Sections
        HomepageSection::updateOrCreate(
            ['section_key' => 'hero'],
            [
                'title' => 'Your Brand Deserves to Be Seen.',
                'subtitle' => 'Strategy, creativity and execution – all in one place.',
                'tagline' => 'Full-Funnel Digital Growth & Cinematic Production',
                'cta_text' => "Let's Talk",
                'cta_url' => '/contact',
                'content' => [
                    'secondary_cta_text' => 'Explore Services',
                    'secondary_cta_url' => '/services',
                    'badge' => '⚡ Premier Digital Marketing & Production Agency',
                    'stats' => [
                        ['number' => '10x', 'label' => 'Average ROAS Multiplier'],
                        ['number' => '50M+', 'label' => 'Organic Impressions Generated'],
                        ['number' => '500+', 'label' => 'Shoots & Campaigns Executed'],
                        ['number' => '98%', 'label' => 'Client Retention Rate'],
                    ]
                ]
            ]
        );

        HomepageSection::updateOrCreate(
            ['section_key' => 'intro'],
            [
                'title' => 'Digital growth, built around your business.',
                'subtitle' => 'We reject generic templates and cookie-cutter funnels. Every brand has a unique pulse—we craft bespoke data-driven marketing campaigns and cinematic visual content that captivate and convert.',
                'tagline' => 'WHO WE ARE',
                'cta_text' => 'About Our Agency',
                'cta_url' => '/about',
                'content' => [
                    'pillars' => [
                        [
                            'title' => 'Targeted Performance',
                            'desc' => 'High-intent acquisition campaigns across Meta, Google, and LinkedIn that systematically turn cold traffic into high-ticket clients.'
                        ],
                        [
                            'title' => 'Cinematic Storytelling',
                            'desc' => 'Premium video production, photography, and editing that positions your brand as the undisputed authority in your niche.'
                        ],
                        [
                            'title' => 'Relentless Optimization',
                            'desc' => 'Continuous A/B split-testing, conversion rate optimization (CRO), and real-time ROAS tracking to maximize every ad rupee spent.'
                        ]
                    ]
                ]
            ]
        );

        HomepageSection::updateOrCreate(
            ['section_key' => 'production_promo'],
            [
                'title' => 'Every Moment Deserves a Story.',
                'subtitle' => 'Thoughtful shoots. Beautiful edits. Memories that stay.',
                'tagline' => 'DIGITALJAO PRODUCTION',
                'cta_text' => 'Explore Production Studio',
                'cta_url' => '/production',
                'content' => [
                    'categories_preview' => [
                        'Weddings & Pre-Weddings',
                        'Grand Openings',
                        'Automobile Deliveries',
                        'Brand & Corporate Films'
                    ]
                ]
            ]
        );

        // 4. The 10 Services
        $servicesData = [
            [
                'title' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'tagline' => 'End-to-End Growth Architecture',
                'short_description' => 'Comprehensive multi-channel digital strategies designed to build brand dominance, capture market share, and drive consistent customer acquisition.',
                'description' => "Our Digital Marketing service takes an omnichannel approach to scale your business. We engineer full-funnel customer journeys from initial discovery to retention, integrating content marketing, SEO, paid media, and marketing automation into a seamless revenue machine.\n\nWhether you're entering a competitive market or looking to solidify category leadership, our data-backed methodologies ensure every touchpoint is optimized for maximum conversions.",
                'benefits' => [
                    'Omnichannel attribution and real-time dashboard analytics',
                    'Consistent qualified inbound customer flow',
                    'Tailored go-to-market strategies built on competitor gap analysis',
                    'Measurable ROI with transparent bi-weekly performance reporting',
                    'Full integration of creative assets, landing pages, and lead forms'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Market & Brand Audit', 'desc' => 'Deep dive into your industry, competitors, audience personas, and existing funnel performance.'],
                    ['step' => '02', 'title' => 'Growth Blueprint', 'desc' => 'Custom multi-channel strategy blueprint allocating budget across optimal high-conversion channels.'],
                    ['step' => '03', 'title' => 'Agile Execution', 'desc' => 'Deploying creative collateral, search optimization, landing pages, and automated email/SMS workflows.'],
                    ['step' => '04', 'title' => 'Optimization & Scale', 'desc' => 'Analyzing conversion heatmaps, trimming inefficient spend, and doubling down on winning segments.']
                ],
                'icon' => 'TrendingUp',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 1,
                'meta_title' => 'Full-Funnel Digital Marketing Services | DigitalJao',
                'meta_description' => 'Accelerate business revenue with holistic digital marketing campaigns. Strategy, media buying, CRO, and analytics executed by DigitalJao.',
                'faqs' => [
                    ['q' => 'How soon can we expect results from digital marketing?', 'a' => 'Paid media channels (Google, Meta) produce qualified leads within 7-14 days. Comprehensive inbound SEO and brand compounding deliver sustained exponential gains over 60-90 days.'],
                    ['q' => 'How does DigitalJao track campaign success?', 'a' => 'We focus on bottom-line business metrics: Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), Qualified Pipeline Value, and Customer Lifetime Value (LTV), backed by transparent dashboards.']
                ]
            ],
            [
                'title' => 'Social Media Marketing',
                'slug' => 'social-media-marketing',
                'tagline' => 'Build a Magnetic, Loyal Audience',
                'short_description' => 'Transform your social channels into active client acquisition engines with trendsetting creatives, viral reels, and hyper-engaged communities.',
                'description' => "Social media is no longer about posting pretty pictures—it is your brand's digital front door. At DigitalJao, we combine thumb-stopping visual aesthetics with psychological hooks that turn casual scrollers into paying evangelists.\n\nFrom viral short-form video concepts to interactive storytelling and high-converting community management, we cultivate a brand persona that resonates and converts.",
                'benefits' => [
                    'Bespoke monthly content calendars aligned with sales goals',
                    'High-production Reels, TikToks, and Carousel graphics',
                    'Proactive community engagement to spark word-of-mouth',
                    'Influencer collaboration & creator outreach management',
                    'Deep demographic targeting and audience sentiment monitoring'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Aesthetic & Voice Curation', 'desc' => 'Define your brand archetype, visual style guide, and distinct communicative tone.'],
                    ['step' => '02', 'title' => 'Content Studio Production', 'desc' => 'Scripting, designing, and editing high-retention carousels, infographics, and cinematic short videos.'],
                    ['step' => '03', 'title' => 'Scheduled Broadcast', 'desc' => 'Strategic posting during peak audience engagement windows across Instagram, Facebook, and X.'],
                    ['step' => '04', 'title' => 'Community Growth', 'desc' => 'Managing DMs, comments, algorithmic hashtag strategies, and interactive stories.']
                ],
                'icon' => 'Share2',
                'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 2,
                'meta_title' => 'Organic & Paid Social Media Marketing Agency | DigitalJao',
                'meta_description' => 'Grow followers, boost engagement, and drive high-ticket sales through modern social media management and viral creative production.',
                'faqs' => [
                    ['q' => 'Do you provide the content assets or do we have to create them?', 'a' => 'DigitalJao handles end-to-end production: scripting, graphic design, video editing, caption copywriting, and hashtag research.'],
                    ['q' => 'Which platforms should our business focus on?', 'a' => 'We evaluate your ideal customer profile. Typically, B2B thrives on LinkedIn & YouTube, while lifestyle, retail, and real estate excel on Instagram & Meta.']
                ]
            ],
            [
                'title' => 'LinkedIn Management',
                'slug' => 'linkedin-management',
                'tagline' => 'B2B Authority & Executive Personal Branding',
                'short_description' => 'Position your founders and company executives as top-tier industry thought leaders while opening direct B2B pipeline conversations.',
                'description' => "LinkedIn is the world's most lucrative B2B platform. We build authoritative executive profiles that command respect from investors, partners, and high-value decision-makers.\n\nOur ghostwriting and corporate page management strategy establishes unmatched topical authority, driving organic inbound inquiries from C-level executives without sounding salesy.",
                'benefits' => [
                    'Executive ghostwriting by seasoned B2B copywriters',
                    'Topical authority and thought-leadership articles',
                    'Direct outreach campaigns targeting verified decision-makers',
                    'Company page optimization and employer brand amplification',
                    'Lead generation for enterprise software, consulting, and B2B services'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Profile Revamp', 'desc' => 'Complete overhaul of banners, headlines, featured sections, and career narratives.'],
                    ['step' => '02', 'title' => 'Executive Ghostwriting', 'desc' => 'Weekly thought leadership posts detailing unique industry insights, case studies, and frameworks.'],
                    ['step' => '03', 'title' => 'Network Expansion', 'desc' => 'Targeted connection campaigns with ideal client profiles (ICPs), VPs, and founders.'],
                    ['step' => '04', 'title' => 'Inbound Pipeline Conversion', 'desc' => 'Transforming post comments and profile views into booked exploratory calls.']
                ],
                'icon' => 'Briefcase',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 3,
                'meta_title' => 'B2B LinkedIn Marketing & Executive Branding | DigitalJao',
                'meta_description' => 'Build executive thought leadership and scale enterprise B2B sales pipeline with DigitalJao LinkedIn marketing services.',
                'faqs' => [
                    ['q' => 'How much time will the founder/executive need to invest?', 'a' => 'Just 30-45 minutes every two weeks for an idea extraction interview. We turn your raw thoughts into high-impact thought leadership content.']
                ]
            ],
            [
                'title' => 'Google Business Profile',
                'slug' => 'google-business-profile',
                'tagline' => 'Dominate Local Search & Google Maps #1',
                'short_description' => 'Capture high-intent local customers looking for your exact services right now on Google Maps and Local 3-Pack search results.',
                'description' => "When prospective customers nearby search for your services, does your business appear in the coveted Google Map 3-Pack? If not, you are losing high-ticket foot traffic and inbound phone calls to local competitors.\n\nDigitalJao optimizes your Google Business Profile (formerly GMB), manages review velocity, optimizes geo-tagged visual assets, and builds local citations that push your listing to the absolute top of local search.",
                'benefits' => [
                    'Dominant rankings in local Google 3-Pack and Google Maps',
                    'Massive surge in direct phone calls, direction requests, and website visits',
                    'Automated 5-star review acquisition strategies',
                    'Local keyword citation building and geo-tagged photo uploads',
                    'Active defense against spam listings and fake competitor reviews'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Listing Verification & Audit', 'desc' => 'Auditing categories, business hours, service menus, and primary ranking factors.'],
                    ['step' => '02', 'title' => 'Geo-Optimization', 'desc' => 'Infusing hyper-local search phrases and high-resolution geo-tagged photography.'],
                    ['step' => '03', 'title' => 'Review Generation Engine', 'desc' => 'Implementing frictionless QR & SMS workflows to generate authentic customer reviews.'],
                    ['step' => '04', 'title' => 'Ongoing Local Authority', 'desc' => 'Weekly Google Posts, Q&A seeding, and continuous local directory citation sync.']
                ],
                'icon' => 'MapPin',
                'image' => 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
                'featured' => false,
                'order' => 4,
                'meta_title' => 'Google Business Profile & Local SEO Agency | DigitalJao',
                'meta_description' => 'Rank #1 on Google Maps and capture ready-to-buy local customers with DigitalJao Google Business Profile optimization.',
                'faqs' => [
                    ['q' => 'Can you help get suspended Google profiles reinstated?', 'a' => 'Yes, our team specializes in resolving Google Business suspensions, policy guideline appeals, and profile re-verification.']
                ]
            ],
            [
                'title' => 'Branding',
                'slug' => 'branding',
                'tagline' => 'Visual Identity That Commands Market Premium',
                'short_description' => 'Craft an unforgettable brand identity, distinctive visual guidelines, and persuasive messaging that elevates you above competitors.',
                'description' => "A logo is not a brand—a brand is the emotion and expectation your customer experiences every time they interact with your company. DigitalJao delivers deep strategic branding that differentiates you from day one.\n\nFrom brand archetype discovery to luxury typography, color psychology, stationery design, digital asset kits, and comprehensive brand books, we forge an identity that justifies higher prices and sparks lasting loyalty.",
                'benefits' => [
                    'Complete Brand Identity Guidelines (Color systems, typography, imagery)',
                    'Logo systems (Primary, secondary, emblem, monochrome, favicons)',
                    'Packaging, business collateral, and digital asset templates',
                    'Brand voice, mission, vision, and core positioning statements',
                    'Unified presence across digital, physical, and experiential touchpoints'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Discovery & Persona Mapping', 'desc' => 'Unearthing your core values, target demographic psychology, and market positioning.'],
                    ['step' => '02', 'title' => 'Creative Moodboarding', 'desc' => 'Exploring visual directions, emotional palettes, and distinctive aesthetic cues.'],
                    ['step' => '03', 'title' => 'Identity Design', 'desc' => 'Crafting the logo emblem, responsive lockups, typography hierarchy, and textures.'],
                    ['step' => '04', 'title' => 'Brand Guideline Book', 'desc' => 'Delivering a master brand manual and ready-to-use vector & raster collateral files.']
                ],
                'icon' => 'Palette',
                'image' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 5,
                'meta_title' => 'Strategic Brand Identity & Design Studio | DigitalJao',
                'meta_description' => 'Elevate your enterprise with custom brand identity design, logo systems, brand manuals, and visual strategy from DigitalJao.',
                'faqs' => [
                    ['q' => 'What deliverables are included in a branding package?', 'a' => 'You receive complete vector files (.AI, .SVG, .EPS), print ready PDFs, web assets, social media branding kits, and a master 30+ page Brand Guidelines Book.']
                ]
            ],
            [
                'title' => 'Lead Generation',
                'slug' => 'lead-generation',
                'tagline' => 'Predictable, High-Ticket Client Pipelines',
                'short_description' => 'Deploy automated lead funnels and conversion-optimized landing pages that consistently deliver sales-ready prospects directly to your CRM.',
                'description' => "Stop relying on unpredictable word-of-mouth. DigitalJao engineers predictable, scalable client acquisition machines. We combine conversion rate optimized (CRO) landing pages with irresistible lead magnets and laser-targeted multi-channel traffic.\n\nOur leads are rigorously pre-qualified before they ever speak with your sales reps, ensuring your team spends time only with ready-to-buy prospects.",
                'benefits' => [
                    'Pre-qualified high-intent leads tailored to your exact budget',
                    'Custom high-converting landing pages built on modern frameworks',
                    'Instant CRM routing (HubSpot, Zoho, Salesforce, Google Sheets)',
                    'Automated WhatsApp, SMS, and email follow-up sequences',
                    'Granular cost-per-lead (CPL) and lead-to-close attribution tracking'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Offer & Magnet Architecture', 'desc' => 'Crafting an irresistible lead magnet, quiz, or consultation offer that hooks your ICP.'],
                    ['step' => '02', 'title' => 'Landing Page Engineering', 'desc' => 'Building lightning-fast, mobile-first sales pages with psychological conversion cues.'],
                    ['step' => '03', 'title' => 'Multi-Channel Traffic Activation', 'desc' => 'Driving high-intent traffic via Google Search, Meta Ads, and LinkedIn Sponsored Content.'],
                    ['step' => '04', 'title' => 'Automated Nurturing', 'desc' => 'Triggering instant WhatsApp & email sequences to warm leads within 60 seconds of submission.']
                ],
                'icon' => 'Target',
                'image' => 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 6,
                'meta_title' => 'Predictable B2B & B2C Lead Generation Agency | DigitalJao',
                'meta_description' => 'Generate qualified, sales-ready leads with custom funnels, high-converting landing pages, and automated CRM workflows.',
                'faqs' => [
                    ['q' => 'How do you prevent junk or spam leads?', 'a' => 'We implement two-step verification, OTP phone validation, smart qualifying quiz questions, and honeypot spam protection.']
                ]
            ],
            [
                'title' => 'Facebook & Instagram Ads',
                'slug' => 'facebook-instagram-ads',
                'tagline' => 'High-ROAS Meta Advertising Engines',
                'short_description' => 'Scale revenue with disruptive creative testing, machine-learning audience targeting, and ruthless budget allocation on Meta.',
                'description' => "Meta (Facebook & Instagram) remains the premier visual advertising playground on earth. But winning in today's algorithmic landscape requires dynamic creative strategy, rapid UGC testing, and sophisticated Advantage+ bidding structures.\n\nDigitalJao manages complete ad cycles: from high-retention video hooks and direct-response ad copy to custom event pixel tracking and retargeting webs that capture abandoned interest.",
                'benefits' => [
                    'Consistent 3x - 10x ROAS for eCommerce and service businesses',
                    'Rapid multi-variant creative testing (hooks, angles, formats)',
                    'Advanced CAPI (Conversions API) server-side tracking implementation',
                    'Dynamic product catalog ads and hyper-segmented custom audiences',
                    'Weekly creative refreshes to eliminate ad fatigue'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Creative Ideation & Scripts', 'desc' => 'Brainstorming angle concepts (problem/solution, UGC testimonials, demos, memes).'],
                    ['step' => '02', 'title' => 'Technical Setup & CAPI', 'desc' => 'Configuring Meta Pixel, server-side Conversions API, and custom offline event sync.'],
                    ['step' => '03', 'title' => 'Testing Sandboxes', 'desc' => 'Testing 10-20 creative iterations against broad and custom lookalike audiences.'],
                    ['step' => '04', 'title' => 'Aggressive Scaling', 'desc' => 'Scaling budgets vertically and horizontally on winning ad sets while pruning underperformers.']
                ],
                'icon' => 'Flame',
                'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 7,
                'meta_title' => 'High-Converting Meta Ads (Facebook & Instagram) Agency | DigitalJao',
                'meta_description' => 'Maximize Return on Ad Spend (ROAS) on Meta with disruptive video ads, CAPI integration, and advanced algorithmic scaling.',
                'faqs' => [
                    ['q' => 'What minimum monthly ad spend do you recommend?', 'a' => 'We recommend a minimum media budget of $1,000 - $2,500/month (or equivalent in INR) to give Meta algorithm enough data to optimize efficiently.']
                ]
            ],
            [
                'title' => 'Google Ads',
                'slug' => 'google-ads',
                'tagline' => 'Capture Immediate Buyer Intent at the Exact Moment',
                'short_description' => 'Capture customers with high commercial intent through precision Google Search, Performance Max, YouTube, and Display campaigns.',
                'description' => "When someone types a search query into Google, they are actively looking to solve a problem or make a purchase. Google Ads is the fastest way to get in front of customers at that critical decision point.\n\nDigitalJao builds tightly themed ad groups (SKAGs / STAGs), negative keyword filters to eradicate wasted spend, high-converting responsive search ads (RSAs), and intelligent Performance Max campaigns.",
                'benefits' => [
                    'Zero wasted ad spend through robust negative keyword sculpting',
                    'Top of Page Search placement for highest-converting commercial terms',
                    'Performance Max (PMax) campaigns leveraging Google AI across Maps, Gmail, Search, and YouTube',
                    'Click fraud protection and bot filtering',
                    'Transparent conversion tracking tied directly to bottom-line sales'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Commercial Keyword Research', 'desc' => 'Identifying search terms with proven buying intent, high search volume, and high commercial value.'],
                    ['step' => '02', 'title' => 'Campaign Architecture', 'desc' => 'Setting up Search, Shopping, and PMax campaigns with rigorous ad extensions and copy variants.'],
                    ['step' => '03', 'title' => 'Quality Score Optimization', 'desc' => 'Aligning ad copy, keywords, and landing page relevance to secure lower CPCs.'],
                    ['step' => '04', 'title' => 'Bid Strategy Tuning', 'desc' => 'Transitioning from Target CPA to Target ROAS bidding as statistical conversion data accumulates.']
                ],
                'icon' => 'Search',
                'image' => 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
                'featured' => false,
                'order' => 8,
                'meta_title' => 'Certified Google Ads PPC Agency | DigitalJao',
                'meta_description' => 'Get top Google rankings and generate immediate inbound sales with certified Google Ads PPC and Performance Max campaigns.',
                'faqs' => [
                    ['q' => 'How do Google Ads differ from SEO?', 'a' => 'Google Ads gives you guaranteed instant visibility on page one from day one. SEO is a long-term compounding asset that takes months to build organic ranking.']
                ]
            ],
            [
                'title' => 'Video Editing',
                'slug' => 'video-editing',
                'tagline' => 'High-Retention Visual Post-Production',
                'short_description' => 'Turn raw footage into cinematic, high-retention masterpieces with dynamic pacing, motion graphics, sound design, and color grading.',
                'description' => "In an era of fleeting human attention spans, average editing gets scrolled past. DigitalJao’s post-production team specializes in retention-focused editing that keeps viewers glued till the final frame.\n\nFrom high-energy social media reels and corporate documentary films to YouTube episodic series and TV-grade commercials, we craft compelling stories through sound effects, kinetic typography, and Hollywood-grade DaVinci color grading.",
                'benefits' => [
                    'Kinetic typography, custom 2D/3D motion graphics, and animated lower thirds',
                    'Immersive Foley sound design, soundscapes, and master audio mixing',
                    'Hollywood-grade DaVinci Resolve color grading and LUT matching',
                    'Platform-optimized aspect ratio exports (9:16, 16:9, 1:1, 4:5)',
                    'Rapid turnaround times with seamless revision workflows'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Asset Ingestion & Logging', 'desc' => 'Organizing raw 4K/8K footage, audio sync, and assembling the rough narrative cut.'],
                    ['step' => '02', 'title' => 'Dynamic Pacing & FX', 'desc' => 'Trimming pauses, adding kinetic text, motion graphics, zooms, and custom sound design.'],
                    ['step' => '03', 'title' => 'Color Grading & Audio Master', 'desc' => 'Cinematic color correction, mood matching, noise reduction, and final audio mastering.'],
                    ['step' => '04', 'title' => 'Multi-Format Export', 'desc' => 'Delivering ready-to-upload files formatted for Reels, Shorts, YouTube, and television.']
                ],
                'icon' => 'Film',
                'image' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 9,
                'meta_title' => 'Cinematic Video Editing & Post-Production | DigitalJao',
                'meta_description' => 'High-retention video editing, motion graphics, color grading, and sound design for social reels, commercials, and corporate video.',
                'faqs' => [
                    ['q' => 'What software do your video editors use?', 'a' => 'Our editors work in Premiere Pro, DaVinci Resolve Studio, After Effects, and Blender for 3D graphics.']
                ]
            ],
            [
                'title' => 'Video Shoots',
                'slug' => 'video-shoots',
                'tagline' => 'Full-Production Cinematic Filming on Location',
                'short_description' => 'Full-scale on-location video production equipped with cinema cameras, master lighting, gimbal stabilizers, and licensed drone pilots.',
                'description' => "Bring your brand vision to life with DigitalJao’s full-production filming crew. We handle everything from concept scripting and location scouting to cinematic multi-camera filming and professional on-set sound capture.\n\nWhether you need brand commercials, executive interviews, product reveal films, or event documentation, our cinema-grade gear (Sony FX series, RED, DJI Ronin, wireless audio) ensures your visuals look pristine.",
                'benefits' => [
                    'Cinema-grade 4K/6K production equipment and prime cine lenses',
                    'Professional lighting setups (Aputure, Nanlite) for dramatic visual depth',
                    'Licensed 4K drone cinematography for breathtaking aerial perspectives',
                    'Dedicated on-site director, director of photography (DP), and sound engineer',
                    'Full production insurance and seamless permits management'
                ],
                'process' => [
                    ['step' => '01', 'title' => 'Pre-Production & Scripting', 'desc' => 'Storyboarding, scriptwriting, shot list curation, and location scouting.'],
                    ['step' => '02', 'title' => 'Equipment & Crew Prep', 'desc' => 'Prepping cine cameras, lighting rigs, wireless monitors, and gimbal stabilization.'],
                    ['step' => '03', 'title' => 'Shoot Day Execution', 'desc' => 'Directing talent, capturing primary A-roll and rich B-roll, with continuous backup.'],
                    ['step' => '04', 'title' => 'Handover to Post-Production', 'desc' => 'Immediate DIT file offload to RAID storage ready for the editing suite.']
                ],
                'icon' => 'Video',
                'image' => 'https://images.unsplash.com/photo-1579632652988-699a98161741?auto=format&fit=crop&w=1200&q=80',
                'featured' => true,
                'order' => 10,
                'meta_title' => 'Professional On-Location Video Production & Shoots | DigitalJao',
                'meta_description' => 'Commercials, brand films, drone cinematography, and corporate video shoots produced with cinema cameras by DigitalJao.',
                'faqs' => [
                    ['q' => 'Do you travel for shoots outside your primary city?', 'a' => 'Yes, our production team travels across India and internationally for commercial, corporate, and destination shoots.']
                ]
            ]
        ];

        foreach ($servicesData as $sData) {
            $faqs = $sData['faqs'] ?? [];
            unset($sData['faqs']);

            $service = Service::updateOrCreate(['slug' => $sData['slug']], $sData);

            // Add FAQs
            foreach ($faqs as $i => $f) {
                ServiceFaq::updateOrCreate(
                    [
                        'service_id' => $service->id,
                        'question' => $f['q']
                    ],
                    [
                        'answer' => $f['a'],
                        'order' => $i + 1
                    ]
                );
            }
        }

        // 5. DigitalJao Production Categories
        $prodCategories = [
            [
                'name' => 'Wedding Shoots',
                'slug' => 'wedding-shoots',
                'description' => 'Timeless, emotional wedding films and royal photography capturing rituals, tears of joy, and sacred vows in high-definition brilliance.',
                'hero_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'order' => 1,
            ],
            [
                'name' => 'Pre-Wedding Shoots',
                'slug' => 'pre-wedding-shoots',
                'description' => 'Cinematic romantic escapades, sunset silhouettes, and styled location shoots portraying your unique love story before the big day.',
                'hero_image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
                'order' => 2,
            ],
            [
                'name' => 'Birthday Celebrations',
                'slug' => 'birthday-celebrations',
                'description' => 'Vibrant milestone birthday parties, baby first birthdays, and sweet sixteens filmed with candid laughter and high energy.',
                'hero_image' => 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
                'order' => 3,
            ],
            [
                'name' => 'Family Functions',
                'slug' => 'family-functions',
                'description' => 'Anniversaries, housewarmings, naming ceremonies, and reunion festivities preserved forever with generational warmth.',
                'hero_image' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
                'order' => 4,
            ],
            [
                'name' => 'Car Delivery Shoots',
                'slug' => 'car-delivery-shoots',
                'description' => 'The exhilaration of unboxing your dream luxury wheels. Slow-motion unveils, showroom celebrations, and dynamic rolling drive shots.',
                'hero_image' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                'order' => 5,
            ],
            [
                'name' => 'Bike Delivery Shoots',
                'slug' => 'bike-delivery-shoots',
                'description' => 'Superbike key handovers, engine revs, and throttle-pumping delivery reels capturing the pure passion of two-wheeled freedom.',
                'hero_image' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
                'order' => 6,
            ],
            [
                'name' => 'Grand Openings',
                'slug' => 'grand-openings',
                'description' => 'Ribbon-cutting milestones, retail store launches, restaurant inaugurations, and commercial headquarters unveiling films.',
                'hero_image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                'order' => 7,
            ],
            [
                'name' => 'Events & Celebrations',
                'slug' => 'events-celebrations',
                'description' => 'Concerts, award nights, corporate galas, and cultural festivals documented with multi-angle photography and highlights reels.',
                'hero_image' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
                'order' => 8,
            ],
        ];

        foreach ($prodCategories as $pCatData) {
            $cat = ProductionCategory::updateOrCreate(['slug' => $pCatData['slug']], $pCatData);

            // Add sample media for each category
            if ($cat->slug === 'wedding-shoots') {
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'The Royal Palace Vows of Rohan & Simran',
                        'media_type' => 'photo',
                        'client_name' => 'Rohan & Simran',
                        'location' => 'Udaipur, Rajasthan',
                        'aspect_ratio' => 'landscape',
                        'featured' => true,
                        'order' => 1
                    ]
                );
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'Sunset Sangeet Euphoria',
                        'media_type' => 'photo',
                        'client_name' => 'Aarav & Meera',
                        'location' => 'Goa Heritage Resort',
                        'aspect_ratio' => 'portrait',
                        'featured' => true,
                        'order' => 2
                    ]
                );
            } elseif ($cat->slug === 'car-delivery-shoots') {
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'Porsche 911 GT3 RS Midnight Delivery',
                        'media_type' => 'photo',
                        'client_name' => 'Vikram Singhania',
                        'location' => 'Porsche Centre Gurugram',
                        'aspect_ratio' => 'landscape',
                        'featured' => true,
                        'order' => 1
                    ]
                );
            } elseif ($cat->slug === 'bike-delivery-shoots') {
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'Ducati Panigale V4 S First Throttle',
                        'media_type' => 'photo',
                        'client_name' => 'Kabir Malhotra',
                        'location' => 'Ducati Flagship Showroom',
                        'aspect_ratio' => 'landscape',
                        'featured' => true,
                        'order' => 1
                    ]
                );
            } elseif ($cat->slug === 'grand-openings') {
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'Aura Luxury Flagship Boutique Inauguration',
                        'media_type' => 'photo',
                        'client_name' => 'Aura Jewels',
                        'location' => 'DLF Emporio Mall',
                        'aspect_ratio' => 'landscape',
                        'featured' => true,
                        'order' => 1
                    ]
                );
            } elseif ($cat->slug === 'pre-wedding-shoots') {
                ProductionMedia::updateOrCreate(
                    ['file_path' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'],
                    [
                        'production_category_id' => $cat->id,
                        'title' => 'Golden Hour Romance by the Dunes',
                        'media_type' => 'photo',
                        'client_name' => 'Aditya & Tanvi',
                        'location' => 'Jaisalmer Sands',
                        'aspect_ratio' => 'portrait',
                        'featured' => true,
                        'order' => 1
                    ]
                );
            } else {
                ProductionMedia::updateOrCreate(
                    ['file_path' => $cat->hero_image],
                    [
                        'production_category_id' => $cat->id,
                        'title' => $cat->name . ' Cinematic Premiere',
                        'media_type' => 'photo',
                        'client_name' => 'Private Client',
                        'location' => 'Metropolitan Club',
                        'aspect_ratio' => 'landscape',
                        'featured' => false,
                        'order' => 1
                    ]
                );
            }
        }

        // 6. Portfolio Categories & Projects
        $pCatMarketing = PortfolioCategory::updateOrCreate(['slug' => 'performance-marketing'], ['name' => 'Performance Marketing']);
        $pCatBranding = PortfolioCategory::updateOrCreate(['slug' => 'branding-creative'], ['name' => 'Brand Identity & Design']);
        $pCatProduction = PortfolioCategory::updateOrCreate(['slug' => 'cinematic-production'], ['name' => 'Cinematic Production']);
        $pCatSocial = PortfolioCategory::updateOrCreate(['slug' => 'social-scale'], ['name' => 'Social Scale']);

        $projects = [
            [
                'category_id' => $pCatMarketing->id,
                'title' => 'Scaling Zenovate Luxury to $1.8M ARR',
                'slug' => 'scaling-zenovate-luxury',
                'client_name' => 'Zenovate Watches',
                'summary' => 'Direct-response Meta & Google Ads scaling, resulting in a 4.6x verified blended ROAS and 22,000+ units moved.',
                'description' => "Zenovate approached DigitalJao seeking to break past a revenue plateau of $30k/month. Through precision creative iteration, high-converting landing page optimization, and segmented CAPI targeting, we scaled paid acquisition spend profitably while maintaining strict CPA guardrails.",
                'featured_image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'results_metric' => '+460% ROAS',
                'results_label' => 'Blended E-Commerce Return',
                'services_used' => ['Facebook & Instagram Ads', 'Google Ads', 'Video Editing'],
                'is_featured' => true,
                'is_published' => true,
                'order' => 1,
            ],
            [
                'category_id' => $pCatBranding->id,
                'title' => 'Aether Real Estate Group Complete Rebrand',
                'slug' => 'aether-real-estate-rebrand',
                'client_name' => 'Aether Realty',
                'summary' => 'Comprehensive luxury brand system, 3D architectural showcase reels, and lead funnel generating $45M in closed villa sales.',
                'description' => "Aether Realty required an ultra-luxury visual presence to appeal to NRI and high-net-worth investors. We redesigned their visual identity, engineered custom interactive villa floor-plans, and ran hyper-targeted LinkedIn and Meta lead gen campaigns.",
                'featured_image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'video_url' => null,
                'results_metric' => '$45M+',
                'results_label' => 'Total Property Sales Value',
                'services_used' => ['Branding', 'Lead Generation', 'Video Shoots'],
                'is_featured' => true,
                'is_published' => true,
                'order' => 2,
            ],
            [
                'category_id' => $pCatProduction->id,
                'title' => 'The Imperial Heritage Wedding Film',
                'slug' => 'imperial-heritage-wedding-film',
                'client_name' => 'Vardhan Family',
                'summary' => 'A 3-day destination royal wedding captured across 6 cinema cameras and 4K drones, accumulating over 2.4 million organic views.',
                'description' => "Set in the majestic heritage palace of Udaipur, our production team deployed cinema primes, master sound capture, and aerial cinematography to document an unforgettable union with Hollywood-level color grading and emotive pacing.",
                'featured_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'results_metric' => '2.4M+',
                'results_label' => 'Organic Video Impressions',
                'services_used' => ['Video Shoots', 'Video Editing'],
                'is_featured' => true,
                'is_published' => true,
                'order' => 3,
            ],
            [
                'category_id' => $pCatSocial->id,
                'title' => 'Zero to 180k Followers in 90 Days for FinWise',
                'slug' => 'finwise-social-growth',
                'client_name' => 'FinWise App',
                'summary' => 'Viral financial literacy short-form video series that drove 85,000 app installs with zero paid media.',
                'description' => "By transforming complex tax and investing concepts into witty, highly-relatable 30-second skits and motion-graphic reels, we catalyzed a viral wave that catapulted FinWise to the Top 5 in the App Store finance category.",
                'featured_image' => 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
                'video_url' => null,
                'results_metric' => '+180k',
                'results_label' => 'Organic Social Followers',
                'services_used' => ['Social Media Marketing', 'Video Editing'],
                'is_featured' => true,
                'is_published' => true,
                'order' => 4,
            ]
        ];

        foreach ($projects as $proj) {
            $createdProject = PortfolioProject::updateOrCreate(['slug' => $proj['slug']], $proj);

            PortfolioMedia::updateOrCreate(
                [
                    'portfolio_project_id' => $createdProject->id,
                    'file_path' => $createdProject->featured_image
                ],
                [
                    'media_type' => 'image',
                    'caption' => $createdProject->title . ' showcase shot',
                    'order' => 1
                ]
            );
        }

        // 7. Testimonials
        $testimonials = [
            [
                'client_name' => 'Aman Singhal',
                'client_role' => 'Founder & CEO',
                'company_name' => 'Zenovate Watches',
                'rating' => 5,
                'review' => 'DigitalJao completely redefined what growth means for our brand. Our previous agencies burned cash with zero accountability. The DigitalJao team delivered a 4.6x ROAS in 60 days, and their video creative team is the best in the business.',
                'project_type' => 'Meta & Google Ads Scaling',
                'order' => 1,
            ],
            [
                'client_name' => 'Dr. Radhika Kapoor',
                'client_role' => 'Managing Director',
                'company_name' => 'Aura Aesthetics Clinic',
                'rating' => 5,
                'review' => 'Our clinic was struggling to stand out locally. DigitalJao revamped our Google Business Profile and launched high-converting Instagram lead campaigns. We went from 15 consultations a week to completely booked solid 3 weeks in advance.',
                'project_type' => 'Lead Gen & Local SEO',
                'order' => 2,
            ],
            [
                'client_name' => 'Vikram & Tanya Mehra',
                'client_role' => 'Couple & Clients',
                'company_name' => 'Destination Wedding',
                'rating' => 5,
                'review' => 'DigitalJao Production created something that made our entire family cry happy tears. The wedding teaser and documentary film feel like a cinematic Netflix feature. We cannot stop watching our film!',
                'project_type' => 'Wedding Production',
                'order' => 3,
            ]
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(['client_name' => $t['client_name']], $t);
        }

        // 8. FAQs
        $faqs = [
            [
                'category' => 'general',
                'question' => 'How does DigitalJao differ from standard marketing agencies?',
                'answer' => 'Unlike traditional agencies that outsource or rely on disconnected contractors, DigitalJao combines full-stack data engineers, performance media buyers, and an in-house cinema production studio under one roof. We execute strategy, creative, and media buying in-house with zero bloat.',
                'order' => 1
            ],
            [
                'category' => 'general',
                'question' => 'How do we get started working with DigitalJao?',
                'answer' => 'Submit your project details via our Contact form or schedule a direct Discovery Call. We conduct an initial market and audit review before proposing a tailored scope of work and timeline.',
                'order' => 2
            ],
            [
                'category' => 'marketing',
                'question' => 'What is the pricing model for DigitalJao marketing retainers?',
                'answer' => 'We offer transparent tiered monthly retainers and performance-aligned models depending on business scale and ad spend. All deliverables, ad creatives, and dashboard reporting are clearly outlined upfront.',
                'order' => 3
            ],
            [
                'category' => 'production',
                'question' => 'How far in advance should we book DigitalJao Production for shoots?',
                'answer' => 'For weddings and major events, we recommend booking 2 to 4 months in advance to lock your date. For commercial shoots, car deliveries, and brand shoots, we can typically mobilize a full crew within 5-10 business days.',
                'order' => 4
            ]
        ];

        foreach ($faqs as $f) {
            Faq::updateOrCreate(['question' => $f['question']], $f);
        }

        // 9. Sample Initial Enquiries
        Enquiry::updateOrCreate(
            ['email' => 'contact@elevatebrand.io'],
            [
                'type' => 'service',
                'name' => 'Sameer Verma',
                'phone' => '+91 99887 76655',
                'service' => 'Lead Generation',
                'budget' => '$2,500 - $5,000',
                'message' => 'We are launching a new B2B SaaS platform in Q4 and need a comprehensive lead funnel and Google Ads setup.',
                'status' => 'new'
            ]
        );

        Enquiry::updateOrCreate(
            ['email' => 'rohit.oberoi@luxuryauto.in'],
            [
                'type' => 'production_booking',
                'name' => 'Rohit Oberoi',
                'phone' => '+91 91234 56789',
                'production_category' => 'Car Delivery Shoots',
                'event_date' => '2026-12-15',
                'budget' => 'Custom Quote',
                'message' => 'Delivering 3 new Mercedes-AMG vehicles to our VIP corporate clients next month. We need a cinematic delivery video and rolling shots.',
                'status' => 'contacted'
            ]
        );
    }
}
