import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/SectionHeading';
import {
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    Filter,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortfolioIndex({ categories, projects, activeCategory }) {
    const handleCategoryClick = (slug) => {
        router.get(route('portfolio.index'), { category: slug }, { preserveState: true, preserveScroll: true });
    };

    return (
        <PublicLayout
            title="Our Work & Case Studies"
            description="Proven client transformations, ROAS multipliers, and cinematic visual campaigns executed by DigitalJao."
        >
            {/* HERO BANNER */}
            <section className="relative py-20 sm:py-28 overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1769FF]/15 blur-[130px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-6">
                        <TrendingUp className="w-4 h-4 text-[#19C8F5]" />
                        PROVEN RECORD OF EXECUTION
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-black font-display text-white max-w-4xl mx-auto tracking-tight leading-tight">
                        Selected Work & Transformative{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                            Outcomes.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Explore our case studies in performance marketing, brand identity, and cinematic media production. Real metrics. Zero fluff.
                    </p>
                </div>
            </section>

            {/* CATEGORY FILTER */}
            <section className="py-6 bg-[#041228] border-y border-[#1769FF]/20 sticky top-20 z-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick('all')}
                            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                                activeCategory === 'all'
                                    ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                                    : 'bg-[#061A3A] text-slate-300 hover:text-white hover:bg-[#082046] border border-[#1769FF]/20'
                            }`}
                        >
                            All Case Studies
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                                    activeCategory === cat.slug
                                        ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                                        : 'bg-[#061A3A] text-slate-300 hover:text-white hover:bg-[#082046] border border-[#1769FF]/20'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS GRID */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {projects.map((project, idx) => (
                            <Link
                                key={project.id}
                                href={route('portfolio.show', project.slug)}
                                className="group rounded-3xl overflow-hidden bg-[#061A3A]/70 border border-[#1769FF]/20 hover:border-[#19C8F5]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-glass"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={project.featured_image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A3A] via-transparent to-transparent opacity-85" />

                                    {/* Results Metric Badge */}
                                    {project.results_metric && (
                                        <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-[#061A3A]/90 backdrop-blur-md border border-[#19C8F5]/40 shadow-neon">
                                            <span className="text-base sm:text-lg font-black text-[#19C8F5]">
                                                {project.results_metric}
                                            </span>
                                            <span className="block text-[10px] text-slate-300 font-semibold uppercase tracking-wider">
                                                {project.results_label || 'Verified Outcome'}
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
                                        <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-3">
                                            {project.summary}
                                        </p>
                                    </div>

                                    {project.services_used && project.services_used.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.services_used.map((s, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#082046] text-slate-300 border border-[#1769FF]/20"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#19C8F5]">
                                        <span>Explore Case Study</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-24 text-slate-400">
                            No projects currently found in this category.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
