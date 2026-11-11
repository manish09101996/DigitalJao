import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/SectionHeading';
import LightboxModal from '@/Components/LightboxModal';
import {
    ArrowUpRight,
    Sparkles,
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
    CheckCircle2,
    Camera,
    Play,
    Star,
    ChevronDown,
    Zap,
    ShieldCheck,
    BarChart3,
    Layers,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping string names to Lucide icons
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

export default function Home({
    hero,
    intro,
    productionPromo,
    featuredServices,
    allServices,
    featuredProjects,
    productionCategories,
    featuredProductionMedia,
    testimonials,
    faqs,
}) {
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedLightbox, setSelectedLightbox] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const heroStats = hero?.content?.stats || [
        { number: '10x', label: 'Average ROAS Multiplier' },
        { number: '50M+', label: 'Organic Impressions' },
        { number: '500+', label: 'Shoots & Campaigns' },
        { number: '98%', label: 'Client Retention' },
    ];

    const pillars = intro?.content?.pillars || [
        {
            title: 'Targeted Performance',
            desc: 'High-intent acquisition campaigns across Meta, Google, and LinkedIn turning cold traffic into paying clients.'
        },
        {
            title: 'Cinematic Storytelling',
            desc: 'Premium video production, photography, and editing that positions your brand as an undisputed authority.'
        },
        {
            title: 'Relentless Optimization',
            desc: 'Continuous A/B testing, conversion rate optimization (CRO), and real-time ROAS tracking to maximize every ad rupee.'
        }
    ];

    const workingProcess = [
        {
            step: '01',
            title: 'Deep Market & Brand Audit',
            desc: 'We analyze your current unit economics, competitors, audience demographics, and conversion leakages to discover high-yield opportunities.',
            icon: Search,
        },
        {
            step: '02',
            title: 'Custom Growth Blueprint',
            desc: 'We engineer a bespoke roadmap pairing high-converting landing funnels, targeted media buying, and cinema-grade creative content.',
            icon: Layers,
        },
        {
            step: '03',
            title: 'High-Velocity Execution',
            desc: 'Our in-house production crew and media buyers launch, film, edit, and iterate campaigns with rapid turnaround times.',
            icon: Zap,
        },
        {
            step: '04',
            title: 'Scale & Market Dominance',
            desc: 'Once cost-per-acquisition is validated, we scale ad budgets aggressively while maintaining strict profit margins.',
            icon: TrendingUp,
        },
    ];

    return (
        <PublicLayout title="Your Brand Deserves to Be Seen">
            {/* HERO SECTION */}
            <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden">
                {/* Modern Radial & Gradient Glow Backgrounds */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-[#1769FF]/20 via-[#19C8F5]/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
                <div className="absolute -top-24 right-10 w-96 h-96 bg-[#1769FF]/10 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#19C8F5]/10 blur-[110px] pointer-events-none rounded-full" />

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#061A3A15_1px,transparent_1px),linear-gradient(to_bottom,#061A3A15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#061A3A]/90 border border-[#1769FF]/40 text-[#19C8F5] mb-8 shadow-neon backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-[#19C8F5]" />
                        <span>{hero?.content?.badge || '⚡ Premier Digital Marketing & Production Agency'}</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
                    >
                        Your Brand Deserves to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white drop-shadow-[0_0_35px_rgba(25,200,245,0.3)]">
                            Be Seen.
                        </span>
                    </motion.h1>

                    {/* Supporting Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mt-6 sm:mt-8 text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        {hero?.subtitle || 'Strategy, creativity and execution – all in one place.'}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                    >
                        <Link
                            href={route('contact.index')}
                            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-[0_0_30px_rgba(23,105,255,0.5)] hover:shadow-[0_0_40px_rgba(25,200,245,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <span>{hero?.cta_text || "Let's Talk"}</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>

                        <Link
                            href={route('services.index')}
                            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base bg-[#061A3A]/80 hover:bg-[#082046] text-white border border-[#1769FF]/40 hover:border-[#19C8F5] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
                        >
                            <span>{hero?.content?.secondary_cta_text || 'Explore Services'}</span>
                            <ArrowRight className="w-4 h-4 text-[#19C8F5]" />
                        </Link>
                    </motion.div>

                    {/* Stats Counter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
                    >
                        {heroStats.map((stat, i) => (
                            <div
                                key={i}
                                className="p-5 sm:p-6 rounded-2xl bg-[#061A3A]/50 border border-[#1769FF]/20 backdrop-blur-md hover:border-[#19C8F5]/40 transition-colors text-center group"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#19C8F5] group-hover:to-[#1769FF] transition-all">
                                    {stat.number}
                                </div>
                                <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* INTRODUCTION / VALUE PROPOSITION */}
            <section className="py-20 sm:py-28 relative bg-[#041228] border-y border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="WHO WE ARE"
                        title="Digital growth, built around"
                        highlight="your business."
                        subtitle={intro?.subtitle || "We reject generic templates and cookie-cutter funnels. Every brand has a unique pulse—we craft bespoke data-driven marketing campaigns and cinematic visual content that captivate and convert."}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                className="relative p-8 rounded-3xl bg-[#061A3A]/60 border border-[#1769FF]/20 hover:border-[#19C8F5]/50 transition-all duration-300 hover:-translate-y-2 group shadow-glass"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#19C8F5] flex items-center justify-center text-white mb-6 shadow-neon">
                                    {idx === 0 && <Target className="w-6 h-6" />}
                                    {idx === 1 && <Camera className="w-6 h-6" />}
                                    {idx === 2 && <TrendingUp className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-[#19C8F5] transition-colors">
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES OVERVIEW (10 Core Services) */}
            <section className="py-24 sm:py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                Growth Capabilities
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
                                Full-Stack Marketing & Media{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] to-[#19C8F5]">
                                    Solutions
                                </span>
                            </h2>
                        </div>
                        <Link
                            href={route('services.index')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#19C8F5] hover:text-white transition-colors group"
                        >
                            <span>View All 10 Services</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {allServices?.slice(0, 6).map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Sparkles;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-[#061A3A]/50 border border-[#1769FF]/25 hover:border-[#19C8F5]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-glass"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-[#19C8F5] group-hover:bg-gradient-to-br group-hover:from-[#1769FF] group-hover:to-[#19C8F5] group-hover:text-white transition-all duration-300 shadow-neon">
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-[#19C8F5] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#1769FF] uppercase tracking-wider mb-3">
                                            {service.tagline}
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                            {service.short_description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                                        <Link
                                            href={route('services.show', service.slug)}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#19C8F5] transition-colors"
                                        >
                                            <span>Explore Service</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* DIGITALJAO PRODUCTION PROMO */}
            <section className="py-24 sm:py-32 relative bg-gradient-to-b from-[#030E1F] via-[#020914] to-[#041228] border-t border-[#1769FF]/20 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769FF]/15 blur-[120px] pointer-events-none rounded-full" />
                <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#19C8F5]/10 blur-[130px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/15 text-[#19C8F5] border border-[#1769FF]/40 mb-4 shadow-neon">
                            <Camera className="w-3.5 h-3.5" />
                            DIGITALJAO PRODUCTION
                        </span>
                        <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
                            Every Moment Deserves{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                                a Story.
                            </span>
                        </h2>
                        <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium">
                            Thoughtful shoots. Beautiful edits. Memories that stay.
                        </p>
                    </div>

                    {/* Production Categories Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        {productionCategories?.slice(0, 8).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`${route('production.index')}?category=${cat.slug}`}
                                className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#1769FF]/30 hover:border-[#19C8F5] transition-all duration-300 shadow-glass"
                            >
                                <img
                                    src={cat.hero_image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020A16] via-[#020A16]/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#19C8F5] transition-colors leading-snug">
                                        {cat.name}
                                    </h4>
                                    <span className="text-[11px] font-semibold text-[#19C8F5] inline-flex items-center gap-1 mt-1">
                                        View Gallery →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href={route('production.index')}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                        >
                            <span>Explore Full Production Studio</span>
                            <Camera className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* OUR WORKING PROCESS */}
            <section className="py-24 sm:py-32 relative bg-[#041228]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="METHODOLOGY"
                        title="Our Proven Growth"
                        highlight="Framework"
                        subtitle="How we take brands from overlooked to industry leaders in four battle-tested phases."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {workingProcess.map((proc, idx) => {
                            const ProcIcon = proc.icon;
                            return (
                                <motion.div
                                    key={proc.step}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 relative hover:border-[#19C8F5]/60 transition-all duration-300 group shadow-glass"
                                >
                                    <div className="text-5xl font-black font-display text-slate-700/60 group-hover:text-[#1769FF]/30 transition-colors mb-4">
                                        {proc.step}
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[#082046] border border-[#1769FF]/30 flex items-center justify-center text-[#19C8F5] mb-5 group-hover:scale-110 transition-transform">
                                        <ProcIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold font-display text-white mb-3">
                                        {proc.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {proc.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SELECTED WORK / PORTFOLIO */}
            <section className="py-24 sm:py-32 relative border-t border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-4">
                                <TrendingUp className="w-3.5 h-3.5" />
                                Case Studies
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
                                Selected Work & Verified{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] to-[#19C8F5]">
                                    Outcomes
                                </span>
                            </h2>
                        </div>
                        <Link
                            href={route('portfolio.index')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#19C8F5] hover:text-white transition-colors group"
                        >
                            <span>Browse All Projects</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredProjects?.map((project) => (
                            <Link
                                key={project.id}
                                href={route('portfolio.show', project.slug)}
                                className="group rounded-3xl overflow-hidden bg-[#061A3A]/60 border border-[#1769FF]/20 hover:border-[#19C8F5]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-glass"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={project.featured_image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A3A] via-transparent to-transparent opacity-80" />

                                    {/* Metric Badge */}
                                    {project.results_metric && (
                                        <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-[#061A3A]/90 backdrop-blur-md border border-[#19C8F5]/40 shadow-neon">
                                            <span className="text-base font-extrabold text-[#19C8F5]">
                                                {project.results_metric}
                                            </span>
                                            <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                                                {project.results_label || 'Outcome'}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1769FF] text-white">
                                            {project.category?.name || 'Performance'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="text-xs font-semibold text-[#19C8F5] uppercase tracking-wider">
                                            {project.client_name}
                                        </span>
                                        <h3 className="text-2xl font-bold font-display text-white mt-1 group-hover:text-[#19C8F5] transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-2">
                                            {project.summary}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#19C8F5]">
                                        <span>Read Full Case Study</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 sm:py-32 relative bg-[#041228] border-y border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="CLIENT VOICES"
                        title="Trusted by Fast-Growing"
                        highlight="Brands & Families"
                        subtitle="Genuine verified testimonials from partners who experienced transformational growth and unforgettable visual storytelling."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {testimonials?.map((t, index) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 flex flex-col justify-between shadow-glass hover:border-[#19C8F5]/40 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-1 text-amber-400 mb-6">
                                        {[...Array(t.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                                        "{t.review}"
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1769FF] to-[#19C8F5] flex items-center justify-center font-bold text-white text-sm">
                                        {t.client_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{t.client_name}</h4>
                                        <p className="text-xs text-slate-400">
                                            {t.client_role} {t.company_name ? `• ${t.company_name}` : ''}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="py-24 sm:py-32 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="FAQS"
                        title="Everything You Need"
                        highlight="to Know"
                        subtitle="Answers to common questions about our marketing retainers, shoot production timelines, and ROI metrics."
                    />

                    <div className="space-y-4">
                        {faqs?.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={faq.id}
                                    className="rounded-2xl bg-[#061A3A]/60 border border-[#1769FF]/25 overflow-hidden transition-colors"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-lg focus:outline-none"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#19C8F5] transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="px-6 pb-6 text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CONVERSION CTA BANNER */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 overflow-hidden bg-gradient-to-r from-[#061A3A] via-[#0A2552] to-[#041228] border border-[#1769FF]/40 shadow-2xl text-center">
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#1769FF]/30 blur-[100px] pointer-events-none rounded-full" />
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#19C8F5]/30 blur-[100px] pointer-events-none rounded-full" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
                                Ready to Turn Attention into{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C8F5] to-white">
                                    Predictable Revenue?
                                </span>
                            </h2>
                            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
                                Schedule your complimentary brand audit & growth discovery session. Let's build a strategy that puts you ahead of the market.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={route('contact.index')}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                                >
                                    Claim Your Discovery Call
                                </Link>
                                <Link
                                    href={route('production.index')}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base bg-[#041228] hover:bg-[#061A3A] text-white border border-[#1769FF]/40 transition-colors"
                                >
                                    Book a Shoot
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <LightboxModal
                isOpen={!!selectedLightbox}
                item={selectedLightbox}
                onClose={() => setSelectedLightbox(null)}
            />
        </PublicLayout>
    );
}
