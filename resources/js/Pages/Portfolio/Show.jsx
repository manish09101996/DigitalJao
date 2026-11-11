import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import LightboxModal from '@/Components/LightboxModal';
import {
    TrendingUp,
    ArrowUpRight,
    ArrowLeft,
    User,
    CheckCircle2,
    Play,
    Calendar,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortfolioShow({ project, moreProjects }) {
    const [selectedLightbox, setSelectedLightbox] = useState(null);

    return (
        <PublicLayout
            title={project.meta_title || project.title}
            description={project.meta_description || project.summary}
            image={project.featured_image}
        >
            {/* HERO BANNER */}
            <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#030E1F] to-[#041228] border-b border-[#1769FF]/20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('portfolio.index')}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#19C8F5] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to All Work</span>
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1769FF] text-white">
                            {project.category?.name || 'Case Study'}
                        </span>
                        {project.client_name && (
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-[#19C8F5]" />
                                Client: <span className="text-white font-semibold">{project.client_name}</span>
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
                        {project.title}
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
                        {project.summary}
                    </p>

                    {/* Results Metrics Highlight Bar */}
                    {project.results_metric && (
                        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#061A3A]/90 border border-[#19C8F5]/40 shadow-neon flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                                    Primary Verified Metric
                                </span>
                                <div className="text-3xl sm:text-4xl font-black font-display text-[#19C8F5]">
                                    {project.results_metric}
                                </div>
                                <div className="text-xs text-slate-300 font-medium">
                                    {project.results_label || 'Outcome'}
                                </div>
                            </div>

                            {project.services_used && project.services_used.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.services_used.map((service, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#082046] text-[#19C8F5] border border-[#1769FF]/30"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* MAIN CONTENT & MEDIA */}
            <section className="py-16 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Featured Media / Video */}
                    {project.video_url ? (
                        <div className="rounded-3xl overflow-hidden aspect-video border border-[#1769FF]/30 shadow-2xl bg-black">
                            {project.video_url.includes('youtube') || project.video_url.includes('youtu.be') ? (
                                <iframe
                                    src={project.video_url.replace('watch?v=', 'embed/')}
                                    title={project.title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={project.video_url}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-[#1769FF]/30 shadow-2xl">
                            <img
                                src={project.featured_image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Detailed Case Study Narrative */}
                    <div className="p-8 sm:p-12 rounded-3xl bg-[#061A3A]/60 border border-[#1769FF]/20 shadow-glass">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-6">
                            Project Narrative & Strategy Breakdown
                        </h2>
                        <div className="text-slate-300 leading-relaxed text-base sm:text-lg whitespace-pre-line space-y-4">
                            {project.description}
                        </div>
                    </div>

                    {/* Image Gallery */}
                    {project.media && project.media.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold font-display text-white mb-6">
                                Visual Showcase Gallery
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {project.media.map((m) => (
                                    <div
                                        key={m.id}
                                        onClick={() => setSelectedLightbox({ ...m, title: project.title })}
                                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#1769FF]/30 hover:border-[#19C8F5] transition-all cursor-pointer shadow-glass"
                                    >
                                        <img
                                            src={m.file_path}
                                            alt={m.caption || project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                            <span className="text-xs text-white font-medium">
                                                {m.caption || 'Click to view full size'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* MORE PROJECTS */}
            {moreProjects && moreProjects.length > 0 && (
                <section className="py-20 bg-[#041228] border-t border-[#1769FF]/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-8">
                            Explore More Client Success Stories
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {moreProjects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={route('portfolio.show', p.slug)}
                                    className="group rounded-2xl overflow-hidden bg-[#061A3A]/70 border border-[#1769FF]/20 hover:border-[#19C8F5] transition-all flex flex-col"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={p.featured_image}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold text-white group-hover:text-[#19C8F5] transition-colors line-clamp-1">
                                            {p.title}
                                        </h4>
                                        <span className="text-xs text-[#19C8F5] font-semibold mt-1 inline-block">
                                            Read Case Study →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <LightboxModal
                isOpen={!!selectedLightbox}
                item={selectedLightbox}
                onClose={() => setSelectedLightbox(null)}
            />
        </PublicLayout>
    );
}
