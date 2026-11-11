import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import LightboxModal from '@/Components/LightboxModal';
import {
    Camera,
    Play,
    Calendar,
    MapPin,
    User,
    CheckCircle2,
    Sparkles,
    Send,
    Film,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductionIndex({ categories, media, activeCategory }) {
    const [selectedLightbox, setSelectedLightbox] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        production_category: categories[0]?.name || 'Wedding Shoots',
        event_date: '',
        budget: '$1,000 - $3,000',
        message: '',
    });

    const handleCategoryClick = (slug) => {
        router.get(route('production.index'), { category: slug }, { preserveState: true, preserveScroll: true });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        post(route('production.book'), {
            onSuccess: () => {
                reset();
                setShowBookingModal(false);
            },
        });
    };

    return (
        <PublicLayout
            title="DigitalJao Production | Every Moment Deserves a Story"
            description="Cinematic wedding films, pre-wedding romantic shoots, car delivery unboxings, and grand inaugurations. Thoughtful shoots. Beautiful edits. Memories that stay."
        >
            {/* FULL-WIDTH CINEMATIC HERO */}
            <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-24 overflow-hidden">
                {/* Background image / video atmosphere */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
                        alt="Cinematic Wedding Production"
                        className="w-full h-full object-cover object-center filter brightness-40 scale-105 animate-pulse duration-[10000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030E1F] via-[#030E1F]/70 to-[#020A16]/90" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#1769FF]/20 text-[#19C8F5] border border-[#19C8F5]/40 mb-8 backdrop-blur-md shadow-neon"
                    >
                        <Camera className="w-4 h-4 text-[#19C8F5]" />
                        DIGITALJAO PRODUCTION STUDIO
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-white tracking-tight leading-[1.08]"
                    >
                        Every Moment{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white drop-shadow-[0_0_30px_rgba(25,200,245,0.4)]">
                            Deserves a Story.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-6 text-xl sm:text-2xl text-slate-200 max-w-2xl mx-auto font-medium"
                    >
                        Thoughtful shoots. Beautiful edits. Memories that stay.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            type="button"
                            onClick={() => setShowBookingModal(true)}
                            className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Book a Shoot</span>
                        </button>
                        <a
                            href="#gallery"
                            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base bg-[#061A3A]/80 hover:bg-[#082046] text-white border border-[#1769FF]/40 backdrop-blur-md transition-colors"
                        >
                            Explore Galleries
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* CATEGORY FILTER STRIP */}
            <section id="gallery" className="py-8 bg-[#041228] border-y border-[#1769FF]/20 sticky top-20 z-30 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick('all')}
                            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                                activeCategory === 'all'
                                    ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                                    : 'bg-[#061A3A] text-slate-300 hover:text-white hover:bg-[#082046] border border-[#1769FF]/20'
                            }`}
                        >
                            All Categories
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

            {/* MASONRY PHOTOGRAPHY & VIDEO GALLERY */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {media.map((item, idx) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedLightbox(item)}
                                className="group relative rounded-3xl overflow-hidden bg-[#061A3A] border border-[#1769FF]/30 hover:border-[#19C8F5] transition-all duration-300 cursor-pointer shadow-glass break-inside-avoid"
                            >
                                <img
                                    src={item.file_path}
                                    alt={item.title}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020A16] via-[#020A16]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#19C8F5]">
                                        {item.category?.name}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mt-1">
                                        {item.title}
                                    </h3>
                                    {(item.client_name || item.location) && (
                                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                                            {item.client_name && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3 text-[#1769FF]" />
                                                    {item.client_name}
                                                </span>
                                            )}
                                            {item.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-[#19C8F5]" />
                                                    {item.location}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Video Play Pill if video */}
                                {item.media_type === 'video' && (
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                        <Play className="w-4 h-4 fill-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {media.length === 0 && (
                        <div className="text-center py-24 text-slate-400">
                            No media currently published under this category.
                        </div>
                    )}
                </div>
            </section>

            {/* BOOK A SHOOT CTA STRIP */}
            <section className="py-20 bg-[#041228] border-t border-[#1769FF]/20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-5xl font-black font-display text-white mb-4">
                        Capture Your Unforgettable Moment
                    </h2>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
                        Weddings, vehicle deliveries, milestone celebrations, or retail inaugurations—our cinema crews are ready to travel.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowBookingModal(true)}
                        className="px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all"
                    >
                        Book Your Shoot Now
                    </button>
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            <LightboxModal
                isOpen={!!selectedLightbox}
                item={selectedLightbox}
                onClose={() => setSelectedLightbox(null)}
            />

            {/* BOOK A SHOOT MODAL */}
            <AnimatePresence>
                {showBookingModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative max-w-lg w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-xl font-bold font-display text-white">
                                        Book a Shoot with DigitalJao
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Tell us about your event and our Director will connect promptly.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="e.g. Rahul Sharma"
                                    />
                                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                            placeholder="rahul@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Phone / WhatsApp *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Shoot Category *
                                        </label>
                                        <select
                                            value={data.production_category}
                                            onChange={(e) => setData('production_category', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        >
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.name}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Tentative Event Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.event_date}
                                            onChange={(e) => setData('event_date', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Budget / Shoot Details
                                    </label>
                                    <textarea
                                        rows="3"
                                        required
                                        placeholder="Event location, specific requirements, number of hours, drone needs..."
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                    />
                                    {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? 'Submitting...' : 'Confirm Shoot Request'}</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
