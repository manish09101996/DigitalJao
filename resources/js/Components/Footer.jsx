import { Link, usePage } from '@inertiajs/react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from '@/Components/SocialIcons';

export default function Footer() {
    const { settings, logo_url } = usePage().props;
    const logoSrc = settings?.site_logo || logo_url || (typeof window !== 'undefined' && window.Ziggy ? `${window.Ziggy.url}/images/digitaljao-logo.jpg` : '/images/digitaljao-logo.jpg');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const services = [
        { name: 'Digital Marketing', slug: 'digital-marketing' },
        { name: 'Social Media Marketing', slug: 'social-media-marketing' },
        { name: 'LinkedIn Management', slug: 'linkedin-management' },
        { name: 'Google Business Profile', slug: 'google-business-profile' },
        { name: 'Lead Generation', slug: 'lead-generation' },
        { name: 'Meta & Google Ads', slug: 'facebook-instagram-ads' },
    ];

    const production = [
        { name: 'Wedding Shoots', cat: 'wedding-shoots' },
        { name: 'Pre-Wedding Shoots', cat: 'pre-wedding-shoots' },
        { name: 'Birthday & Family Events', cat: 'birthday-celebrations' },
        { name: 'Car & Bike Deliveries', cat: 'car-delivery-shoots' },
        { name: 'Grand Openings', cat: 'grand-openings' },
        { name: 'Brand & Corporate Films', cat: 'events-celebrations' },
    ];

    return (
        <footer className="relative bg-[#020914] text-slate-300 border-t border-[#1769FF]/20 pt-16 pb-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#1769FF]/10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href={route('home')} className="inline-block group py-1">
                            <img
                                src={logoSrc}
                                alt="DigitalJao Logo"
                                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-xl font-bold font-display text-white">
                            Your Brand Deserves to Be Seen.
                        </p>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            {settings?.footer_bio ||
                                'Strategy, creativity and execution – all in one place. Digital growth and cinematic visual storytelling engineered to win market leadership.'}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            {settings?.social_instagram && (
                                <a
                                    href={settings.social_instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="p-2.5 rounded-xl bg-[#061A3A] border border-slate-800 text-slate-400 hover:text-[#19C8F5] hover:border-[#19C8F5]/40 transition-colors"
                                >
                                    <InstagramIcon className="w-4 h-4" />
                                </a>
                            )}
                            {settings?.social_facebook && (
                                <a
                                    href={settings.social_facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                    className="p-2.5 rounded-xl bg-[#061A3A] border border-slate-800 text-slate-400 hover:text-[#19C8F5] hover:border-[#19C8F5]/40 transition-colors"
                                >
                                    <FacebookIcon className="w-4 h-4" />
                                </a>
                            )}
                            {settings?.social_linkedin && (
                                <a
                                    href={settings.social_linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="p-2.5 rounded-xl bg-[#061A3A] border border-slate-800 text-slate-400 hover:text-[#19C8F5] hover:border-[#19C8F5]/40 transition-colors"
                                >
                                    <LinkedinIcon className="w-4 h-4" />
                                </a>
                            )}
                            {settings?.social_youtube && (
                                <a
                                    href={settings.social_youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="YouTube"
                                    className="p-2.5 rounded-xl bg-[#061A3A] border border-slate-800 text-slate-400 hover:text-[#19C8F5] hover:border-[#19C8F5]/40 transition-colors"
                                >
                                    <YoutubeIcon className="w-4 h-4" />
                                </a>
                            )}
                            {settings?.social_x && (
                                <a
                                    href={settings.social_x}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="X Twitter"
                                    className="p-2.5 rounded-xl bg-[#061A3A] border border-slate-800 text-slate-400 hover:text-[#19C8F5] hover:border-[#19C8F5]/40 transition-colors"
                                >
                                    <TwitterIcon className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Marketing Services */}
                    <div>
                        <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
                            Marketing Hub
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {services.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={route('services.show', item.slug)}
                                        className="text-slate-400 hover:text-[#19C8F5] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Production Categories */}
                    <div>
                        <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
                            Production Studio
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {production.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={`${route('production.index')}?category=${item.cat}`}
                                        className="text-slate-400 hover:text-[#19C8F5] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Studio Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
                            Connect
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {settings?.contact_phone && (
                                <li className="flex items-start gap-2.5 text-slate-400">
                                    <Phone className="w-4 h-4 text-[#19C8F5] shrink-0 mt-0.5" />
                                    <a href={`tel:${settings.contact_phone}`} className="hover:text-white transition-colors">
                                        {settings.contact_phone}
                                    </a>
                                </li>
                            )}
                            {settings?.contact_email && (
                                <li className="flex items-start gap-2.5 text-slate-400">
                                    <Mail className="w-4 h-4 text-[#19C8F5] shrink-0 mt-0.5" />
                                    <a href={`mailto:${settings.contact_email}`} className="hover:text-white transition-colors">
                                        {settings.contact_email}
                                    </a>
                                </li>
                            )}
                            {settings?.contact_address && (
                                <li className="flex items-start gap-2.5 text-slate-400">
                                    <MapPin className="w-4 h-4 text-[#19C8F5] shrink-0 mt-0.5" />
                                    <span>{settings.contact_address}</span>
                                </li>
                            )}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-800/80">
                            <Link
                                href={route('contact.index')}
                                className="text-xs font-semibold text-[#19C8F5] hover:underline flex items-center gap-1"
                            >
                                Book a Strategy Consultation →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} DigitalJao Agency & Production. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href={route('about')} className="hover:text-slate-300 transition-colors">About Us</Link>
                        <Link href={route('services.index')} className="hover:text-slate-300 transition-colors">Services</Link>
                        <Link href={route('production.index')} className="hover:text-slate-300 transition-colors">Production</Link>
                        <Link href={route('portfolio.index')} className="hover:text-slate-300 transition-colors">Portfolio</Link>
                        <Link href={route('contact.index')} className="hover:text-slate-300 transition-colors">Contact</Link>
                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Scroll back to top"
                            className="p-2 rounded-lg bg-[#061A3A] border border-[#1769FF]/30 text-slate-300 hover:text-white hover:border-[#19C8F5] transition-colors ml-2"
                        >
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
