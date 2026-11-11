import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/SectionHeading';
import {
    TrendingUp,
    Share2,
    Briefcase,
    MapPin,
    Palette,
    Target,
    Flame,
    Search,
    Film,
    Video,
    Sparkles,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
    TrendingUp,
    Share2,
    Briefcase,
    MapPin,
    Palette,
    Target,
    Flame,
    Search,
    Film,
    Video,
    Sparkles,
};

export default function ServicesIndex({ services }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = services.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PublicLayout
            title="Our Services"
            description="Explore DigitalJao's 10 core digital marketing and media production capabilities engineered for scale."
        >
            {/* HERO BANNER */}
            <section className="relative py-20 sm:py-28 overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1769FF]/15 blur-[130px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-6">
                        <Sparkles className="w-4 h-4" />
                        WHAT WE DO BEST
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-black font-display text-white max-w-4xl mx-auto tracking-tight leading-tight">
                        Engineered for Brand Dominance &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                            High Conversion.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        From precision performance media buying to full-scale cinematic shoots, our 10 core disciplines drive verified revenue and lasting brand prestige.
                    </p>

                    {/* Search filter input */}
                    <div className="mt-10 max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by service or capability..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#061A3A]/80 border border-[#1769FF]/30 text-white placeholder-slate-400 focus:outline-none focus:border-[#19C8F5] focus:ring-1 focus:ring-[#19C8F5] transition-all text-sm backdrop-blur-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-16 sm:py-24 bg-[#041228] border-t border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Sparkles;

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                    className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 hover:border-[#19C8F5]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-glass"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-[#19C8F5] group-hover:bg-gradient-to-br group-hover:from-[#1769FF] group-hover:to-[#19C8F5] group-hover:text-white transition-all shadow-neon">
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-[#19C8F5] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#1769FF] uppercase tracking-wider mb-4">
                                            {service.tagline}
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            {service.short_description}
                                        </p>

                                        {service.benefits && service.benefits.length > 0 && (
                                            <div className="space-y-2 pt-2">
                                                {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                                                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#19C8F5] shrink-0 mt-0.5" />
                                                        <span>{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                                        <Link
                                            href={route('services.show', service.slug)}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#19C8F5] transition-colors"
                                        >
                                            <span>Full Service Details</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-20 text-slate-400">
                            No service matches your search "{searchQuery}".
                        </div>
                    )}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-20 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Need a Custom Marketing Solution?
                    </h2>
                    <p className="text-slate-300 mb-8">
                        Every brand has specific requirements. We design custom packages combining media buying, production, and funnels.
                    </p>
                    <Link
                        href={route('contact.index')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                    >
                        <span>Discuss Your Requirements</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
