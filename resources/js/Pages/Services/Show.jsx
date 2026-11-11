import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
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
    CheckCircle2,
    ChevronDown,
    ArrowRight,
    ArrowUpRight,
    Send,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ServiceShow({ service, relatedProjects, allServices }) {
    const [openFaq, setOpenFaq] = useState(null);
    const IconComponent = iconMap[service.icon] || Sparkles;

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        service: service.title,
        budget: '$1,000 - $3,000',
        message: `I am interested in scaling my business through ${service.title}.`,
    });

    const submitEnquiry = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    return (
        <PublicLayout
            title={service.meta_title || service.title}
            description={service.meta_description || service.short_description}
            image={service.image}
        >
            {/* HERO BANNER */}
            <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#030E1F] to-[#041228] border-b border-[#1769FF]/20">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1769FF]/15 blur-[130px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/15 text-[#19C8F5] border border-[#1769FF]/30 mb-6">
                                <IconComponent className="w-4 h-4" />
                                {service.tagline || 'Specialized Capability'}
                            </div>

                            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
                                {service.title}
                            </h1>

                            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                                {service.short_description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <a
                                    href="#enquiry-form"
                                    className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                                >
                                    Enquire About {service.title}
                                </a>
                                <Link
                                    href={route('services.index')}
                                    className="px-6 py-3.5 rounded-full font-semibold text-sm bg-[#061A3A] border border-[#1769FF]/30 text-slate-300 hover:text-white transition-colors"
                                >
                                    Browse All Services
                                </Link>
                            </div>
                        </div>

                        {/* Image Showcase */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-[#1769FF]/30 shadow-2xl">
                                <img
                                    src={service.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#041228] via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE BREAKDOWN & BENEFITS */}
            <section className="py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Description */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <span className="text-xs font-bold text-[#19C8F5] uppercase tracking-wider block mb-2">
                                    Strategic Depth
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-6">
                                    How We Accelerate Results with {service.title}
                                </h2>
                                <div className="text-slate-300 leading-relaxed text-base sm:text-lg whitespace-pre-line space-y-4">
                                    {service.description}
                                </div>
                            </div>

                            {/* Key Benefits */}
                            {service.benefits && service.benefits.length > 0 && (
                                <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/30 shadow-glass">
                                    <h3 className="text-xl font-bold font-display text-white mb-6">
                                        Measurable Advantages You Gain
                                    </h3>
                                    <div className="space-y-4">
                                        {service.benefits.map((b, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#1769FF]/20 border border-[#19C8F5]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#19C8F5]">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <span className="text-slate-200 text-sm sm:text-base font-medium">
                                                    {b}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process Steps */}
                            {service.process && service.process.length > 0 && (
                                <div className="pt-6">
                                    <h3 className="text-2xl font-bold font-display text-white mb-8">
                                        Our Execution Roadmap
                                    </h3>
                                    <div className="space-y-6">
                                        {service.process.map((p, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-5 p-6 rounded-2xl bg-[#061A3A]/40 border border-[#1769FF]/20"
                                            >
                                                <span className="text-2xl font-black font-display text-[#19C8F5]">
                                                    {p.step || `0${idx + 1}`}
                                                </span>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white mb-1">
                                                        {p.title}
                                                    </h4>
                                                    <p className="text-slate-400 text-sm leading-relaxed">
                                                        {p.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: Sticky Enquiry Form */}
                        <div className="lg:col-span-5" id="enquiry-form">
                            <div className="sticky top-28 p-8 rounded-3xl bg-[#061A3A]/90 border border-[#1769FF]/40 shadow-2xl backdrop-blur-xl">
                                <h3 className="text-2xl font-bold font-display text-white mb-2">
                                    Get Started with {service.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-6">
                                    Speak directly with our senior growth strategists.
                                </p>

                                <form onSubmit={submitEnquiry} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                                            placeholder="e.g. John Doe"
                                        />
                                        {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Phone / WhatsApp *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Estimated Monthly Budget
                                        </label>
                                        <select
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                                        >
                                            <option value="$1,000 - $3,000">$1,000 - $3,000 / month</option>
                                            <option value="$3,000 - $7,000">$3,000 - $7,000 / month</option>
                                            <option value="$7,000+">$7,000+ / month (Enterprise)</option>
                                            <option value="Custom Quote">Custom / One-time Project</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Project Brief or Goals
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{processing ? 'Submitting...' : 'Send Enquiry'}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE SPECIFIC FAQS */}
            {service.faqs && service.faqs.length > 0 && (
                <section className="py-20 bg-[#041228] border-y border-[#1769FF]/20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge="SERVICE QUESTIONS"
                            title="Frequently Asked Questions about"
                            highlight={service.title}
                        />

                        <div className="space-y-4">
                            {service.faqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div
                                        key={faq.id}
                                        className="rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 overflow-hidden"
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
                                                    className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800 pt-4"
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
            )}

            {/* RELATED PORTFOLIO PROJECTS */}
            {relatedProjects && relatedProjects.length > 0 && (
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge="TRACK RECORD"
                            title="Proven Results in"
                            highlight="Action"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={route('portfolio.show', p.slug)}
                                    className="group rounded-3xl overflow-hidden bg-[#061A3A]/60 border border-[#1769FF]/20 hover:border-[#19C8F5]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-glass"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={p.featured_image}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {p.results_metric && (
                                            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#061A3A]/90 text-[#19C8F5] font-black text-xs border border-[#19C8F5]/40">
                                                {p.results_metric}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-white group-hover:text-[#19C8F5] transition-colors">
                                            {p.title}
                                        </h4>
                                        <p className="mt-2 text-slate-400 text-xs line-clamp-2">
                                            {p.summary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
