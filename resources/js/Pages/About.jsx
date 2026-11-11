import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/SectionHeading';
import {
    Target,
    Eye,
    Zap,
    ShieldCheck,
    Users,
    Award,
    TrendingUp,
    Sparkles,
    ArrowUpRight,
    Camera,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ testimonials }) {
    const values = [
        {
            icon: Target,
            title: 'Radical ROI Alignment',
            desc: 'We don’t celebrate vanity metrics like impressions or clicks unless they convert into qualified leads and verifiable revenue.',
        },
        {
            icon: Camera,
            title: 'Hollywood-Grade Aesthetics',
            desc: 'Our video production and design team treats every client brand like a luxury franchise, crafting visuals that command market authority.',
        },
        {
            icon: Zap,
            title: 'High-Velocity Execution',
            desc: 'The digital landscape changes weekly. We test, iterate, and deploy ad creative and funnels with rapid agility.',
        },
        {
            icon: ShieldCheck,
            title: 'Transparent Collaboration',
            desc: 'No hidden agency markups or smoke-and-mirrors dashboards. Complete transparency into ad spend, cost per lead, and pipeline metrics.',
        },
    ];

    const stats = [
        { label: 'Shoots & Campaigns', value: '500+' },
        { label: 'Organic Impressions', value: '50M+' },
        { label: 'Average ROAS Multiplier', value: '10x' },
        { label: 'Client Retention Rate', value: '98%' },
    ];

    return (
        <PublicLayout
            title="About Us"
            description="Learn how DigitalJao blends high-performance marketing architecture with cinematic production to scale visionary brands."
        >
            {/* HERO SECTION */}
            <section className="relative py-20 sm:py-28 overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1769FF]/15 blur-[120px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-6">
                        <Sparkles className="w-4 h-4 text-[#19C8F5]" />
                        OUR STORY & VISION
                    </span>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white max-w-4xl mx-auto tracking-tight leading-tight">
                        Strategy, Creativity & Execution —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                            All In One Place.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        DigitalJao was founded with a singular conviction: <span className="text-white font-semibold">Your Brand Deserves to Be Seen.</span> We bridged the chasm between performance media buyers and high-end cinematic creators.
                    </p>
                </div>
            </section>

            {/* VISION & MISSION */}
            <section className="py-20 bg-[#041228] border-y border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Mission */}
                        <div className="p-8 sm:p-12 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/25 shadow-glass">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#19C8F5] flex items-center justify-center text-white mb-6 shadow-neon">
                                <Target className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-4">
                                Our Mission
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                                To engineer world-class digital growth systems and cinematic visual assets that empower ambitious brands to dominate their categories, multiply revenue, and build generational brand equity.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="p-8 sm:p-12 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/25 shadow-glass">
                            <div className="w-14 h-14 rounded-2xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-[#19C8F5] mb-6 shadow-neon">
                                <Eye className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-4">
                                Our Vision
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                                To become the global gold-standard agency where cutting-edge data science, performance advertising algorithms, and cinematic filmmaking converge to create unforgettable brand experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY BUSINESSES CHOOSE DIGITALJAO */}
            <section className="py-24 sm:py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="WHY DIGITALJAO"
                        title="Built for Leaders Who Demand"
                        highlight="Real Results"
                        subtitle="We eliminate the friction of managing separate video production teams, ad agencies, and web developers."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-8 rounded-3xl bg-[#061A3A]/60 border border-[#1769FF]/20 hover:border-[#19C8F5]/60 transition-all duration-300 group shadow-glass"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#082046] border border-[#1769FF]/30 flex items-center justify-center text-[#19C8F5] mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold font-display text-white mb-3">
                                        {v.title}
                                    </h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {v.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="py-16 bg-[#041228] border-y border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((s, i) => (
                            <div key={i} className="p-6">
                                <div className="text-4xl sm:text-5xl font-black font-display text-[#19C8F5]">
                                    {s.value}
                                </div>
                                <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white mb-6">
                        Ready to Partner with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] to-[#19C8F5]">
                            DigitalJao?
                        </span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                        Let’s talk about your upcoming growth milestones and how our team can help you surpass them.
                    </p>
                    <Link
                        href={route('contact.index')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                    >
                        <span>Schedule a Discovery Call</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
