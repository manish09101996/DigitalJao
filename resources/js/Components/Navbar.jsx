import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ArrowUpRight, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { url } = usePage();
    const { auth, settings, logo_url } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', routeName: 'home' },
        { name: 'About Us', routeName: 'about' },
        { name: 'Services', routeName: 'services.index' },
        { name: 'DigitalJao Production', routeName: 'production.index', highlight: true },
        { name: 'Our Work', routeName: 'portfolio.index' },
        { name: 'Contact', routeName: 'contact.index' },
    ];

    const logoSrc = settings?.site_logo || logo_url || (typeof window !== 'undefined' && window.Ziggy ? `${window.Ziggy.url}/images/digitaljao-logo.jpg` : '/images/digitaljao-logo.jpg');

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#030E1F]/85 backdrop-blur-md border-b border-[#1769FF]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href={route('home')} className="flex items-center group py-0.5">
                        <img
                            src={logoSrc}
                            alt="DigitalJao"
                            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(23,105,255,0.25)]"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#061A3A]/60 px-5 py-2 rounded-full border border-[#1769FF]/20 backdrop-blur-md">
                        {navLinks.map((link) => {
                            const linkHref = route(link.routeName);
                            const isActive = route().current(link.routeName) || (link.routeName === 'services.index' && route().current('services.*')) || (link.routeName === 'portfolio.index' && route().current('portfolio.*'));
                            return (
                                <Link
                                    key={link.name}
                                    href={linkHref}
                                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                                        isActive
                                            ? 'text-white bg-[#1769FF]/20 text-[#19C8F5] shadow-[0_0_15px_rgba(25,200,245,0.2)]'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.highlight && (
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#19C8F5] mr-1.5 animate-pulse" />
                                    )}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href={route('contact.index')}
                            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full overflow-hidden bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-[0_0_20px_rgba(23,105,255,0.4)] hover:shadow-[0_0_30px_rgba(25,200,245,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10">Let's Talk</span>
                            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation menu"
                            className="p-2.5 rounded-xl bg-[#061A3A] border border-[#1769FF]/30 text-slate-200 hover:text-white focus:outline-none"
                        >
                            {mobileOpen ? <X className="w-6 h-6 text-[#19C8F5]" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden bg-[#030E1F]/98 border-b border-[#1769FF]/20 backdrop-blur-xl px-4 pt-3 pb-6"
                    >
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => {
                                const linkHref = route(link.routeName);
                                const isActive = route().current(link.routeName) || (link.routeName === 'services.index' && route().current('services.*')) || (link.routeName === 'portfolio.index' && route().current('portfolio.*'));
                                return (
                                    <Link
                                        key={link.name}
                                        href={linkHref}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                            isActive
                                                ? 'bg-[#1769FF]/20 text-[#19C8F5] border border-[#19C8F5]/30'
                                                : 'text-slate-200 hover:bg-[#061A3A]'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {link.highlight && (
                                                <span className="w-2 h-2 rounded-full bg-[#19C8F5] animate-ping" />
                                            )}
                                            {link.name}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                    </Link>
                                );
                            })}
                            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                                <Link
                                    href={route('contact.index')}
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    Let's Talk
                                </Link>
                                {settings?.contact_phone && (
                                    <a
                                        href={`tel:${settings.contact_phone}`}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-300 bg-[#061A3A]/80 border border-[#1769FF]/30"
                                    >
                                        <Phone className="w-4 h-4 text-[#19C8F5]" />
                                        <span>{settings.contact_phone}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
