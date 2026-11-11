import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Save,
    Plus,
    Trash2,
    Star,
    Sparkles,
    ChevronDown,
    Home
} from 'lucide-react';

export default function HomepageAdmin({ hero, intro, testimonials, faqs }) {
    const [activeTab, setActiveTab] = useState('hero');
    const [isTestimonialOpen, setIsTestimonialOpen] = useState(false);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Hero Form
    const heroForm = useForm({
        title: hero?.title || 'Your Brand Deserves to Be Seen.',
        subtitle: hero?.subtitle || 'Strategy, creativity and execution – all in one place.',
        tagline: hero?.tagline || 'Full-Funnel Digital Growth & Cinematic Production',
        cta_text: hero?.cta_text || "Let's Talk",
        cta_url: hero?.cta_url || '/contact',
        secondary_cta_text: hero?.content?.secondary_cta_text || 'Explore Services',
        secondary_cta_url: hero?.content?.secondary_cta_url || '/services',
        badge: hero?.content?.badge || '⚡ Premier Digital Marketing & Production Agency',
    });

    // Intro Form
    const introForm = useForm({
        title: intro?.title || 'Digital growth, built around your business.',
        subtitle: intro?.subtitle || 'We reject generic templates and cookie-cutter funnels. Every brand has a unique pulse—we craft bespoke data-driven marketing campaigns and cinematic visual content that captivate and convert.',
        tagline: intro?.tagline || 'WHO WE ARE',
        cta_text: intro?.cta_text || 'About Our Agency',
        cta_url: intro?.cta_url || '/about',
    });

    // Testimonial Form
    const testimonialForm = useForm({
        client_name: '',
        client_role: 'Founder & CEO',
        company_name: '',
        rating: 5,
        review: '',
        project_type: 'Growth Marketing',
        is_active: true,
        order: 0,
    });

    // FAQ Form
    const faqForm = useForm({
        category: 'general',
        question: '',
        answer: '',
        order: 0,
        is_active: true,
    });

    const handleHeroSubmit = (e) => {
        e.preventDefault();
        heroForm.post(route('admin.homepage.hero'));
    };

    const handleIntroSubmit = (e) => {
        e.preventDefault();
        introForm.post(route('admin.homepage.intro'));
    };

    const handleTestimonialSubmit = (e) => {
        e.preventDefault();
        testimonialForm.post(route('admin.homepage.testimonials.store'), {
            onSuccess: () => {
                testimonialForm.reset();
                setIsTestimonialOpen(false);
            },
        });
    };

    const handleDeleteTestimonial = (item) => {
        if (confirm(`Delete testimonial from ${item.client_name}?`)) {
            router.delete(route('admin.homepage.testimonials.destroy', item.id));
        }
    };

    const handleFaqSubmit = (e) => {
        e.preventDefault();
        faqForm.post(route('admin.homepage.faqs.store'), {
            onSuccess: () => {
                faqForm.reset();
                setIsFaqOpen(false);
            },
        });
    };

    const handleDeleteFaq = (faq) => {
        if (confirm(`Delete FAQ "${faq.question}"?`)) {
            router.delete(route('admin.homepage.faqs.destroy', faq.id));
        }
    };

    return (
        <AdminLayout title="Manage Homepage Content">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        activeTab === 'hero' ? 'bg-[#1769FF] text-white shadow-neon' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    Hero Section
                </button>
                <button
                    onClick={() => setActiveTab('intro')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        activeTab === 'intro' ? 'bg-[#1769FF] text-white shadow-neon' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    Introduction Section
                </button>
                <button
                    onClick={() => setActiveTab('testimonials')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        activeTab === 'testimonials' ? 'bg-[#1769FF] text-white shadow-neon' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    Testimonials ({testimonials.length})
                </button>
                <button
                    onClick={() => setActiveTab('faqs')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        activeTab === 'faqs' ? 'bg-[#1769FF] text-white shadow-neon' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    FAQs ({faqs.length})
                </button>
            </div>

            {/* HERO SECTION TAB */}
            {activeTab === 'hero' && (
                <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass max-w-3xl">
                    <h3 className="text-lg font-bold text-white mb-2">Homepage Hero Configuration</h3>
                    <p className="text-xs text-slate-400 mb-6">Edit main headline, supporting tagline, and call-to-action buttons</p>

                    <form onSubmit={handleHeroSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={heroForm.data.badge}
                                onChange={(e) => heroForm.setData('badge', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Heading *</label>
                            <input
                                type="text"
                                required
                                value={heroForm.data.title}
                                onChange={(e) => heroForm.setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subheading / Tagline *</label>
                            <textarea
                                rows="3"
                                required
                                value={heroForm.data.subtitle}
                                onChange={(e) => heroForm.setData('subtitle', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Label</label>
                                <input
                                    type="text"
                                    value={heroForm.data.cta_text}
                                    onChange={(e) => heroForm.setData('cta_text', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA URL</label>
                                <input
                                    type="text"
                                    value={heroForm.data.cta_url}
                                    onChange={(e) => heroForm.setData('cta_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Label</label>
                                <input
                                    type="text"
                                    value={heroForm.data.secondary_cta_text}
                                    onChange={(e) => heroForm.setData('secondary_cta_text', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA URL</label>
                                <input
                                    type="text"
                                    value={heroForm.data.secondary_cta_url}
                                    onChange={(e) => heroForm.setData('secondary_cta_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={heroForm.processing}
                                className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>{heroForm.processing ? 'Saving...' : 'Update Hero Section'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* INTRO SECTION TAB */}
            {activeTab === 'intro' && (
                <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass max-w-3xl">
                    <h3 className="text-lg font-bold text-white mb-2">Introduction Section Configuration</h3>
                    <p className="text-xs text-slate-400 mb-6">Manage "Digital growth, built around your business" copy and narrative</p>

                    <form onSubmit={handleIntroSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Section Tagline</label>
                            <input
                                type="text"
                                value={introForm.data.tagline}
                                onChange={(e) => introForm.setData('tagline', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Heading *</label>
                            <input
                                type="text"
                                required
                                value={introForm.data.title}
                                onChange={(e) => introForm.setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                            <textarea
                                rows="4"
                                required
                                value={introForm.data.subtitle}
                                onChange={(e) => introForm.setData('subtitle', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={introForm.processing}
                                className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>{introForm.processing ? 'Saving...' : 'Update Intro Section'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold text-white">Client Testimonials</h3>
                        <button
                            onClick={() => setIsTestimonialOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-1.5"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Testimonial</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-300 italic mb-4">"{t.review}"</p>
                                </div>
                                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-white">{t.client_name}</div>
                                        <div className="text-[10px] text-slate-400">{t.client_role} • {t.company_name}</div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteTestimonial(t)}
                                        className="text-slate-500 hover:text-rose-400 p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isTestimonialOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                            <div className="relative max-w-md w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                    <h4 className="text-base font-bold text-white">Add New Testimonial</h4>
                                    <button onClick={() => setIsTestimonialOpen(false)} className="text-slate-400">✕</button>
                                </div>
                                <form onSubmit={handleTestimonialSubmit} className="space-y-3 mt-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={testimonialForm.data.client_name}
                                            onChange={(e) => testimonialForm.setData('client_name', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                                            <input
                                                type="text"
                                                value={testimonialForm.data.client_role}
                                                onChange={(e) => testimonialForm.setData('client_role', e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={testimonialForm.data.company_name}
                                                onChange={(e) => testimonialForm.setData('company_name', e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Review *</label>
                                        <textarea
                                            rows="3"
                                            required
                                            value={testimonialForm.data.review}
                                            onChange={(e) => testimonialForm.setData('review', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsTestimonialOpen(false)}
                                            className="px-3 py-1.5 text-xs text-slate-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white rounded-xl shadow-neon"
                                        >
                                            Save Testimonial
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* FAQS TAB */}
            {activeTab === 'faqs' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold text-white">Frequently Asked Questions</h3>
                        <button
                            onClick={() => setIsFaqOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-1.5"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add FAQ</span>
                        </button>
                    </div>

                    <div className="space-y-3 max-w-3xl">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="p-5 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 flex items-start justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#19C8F5] bg-[#082046] px-2 py-0.5 rounded">
                                        {faq.category}
                                    </span>
                                    <h4 className="text-sm font-bold text-white mt-1">{faq.question}</h4>
                                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{faq.answer}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteFaq(faq)}
                                    className="text-slate-500 hover:text-rose-400 p-1 shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {isFaqOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                            <div className="relative max-w-md w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                    <h4 className="text-base font-bold text-white">Add New FAQ</h4>
                                    <button onClick={() => setIsFaqOpen(false)} className="text-slate-400">✕</button>
                                </div>
                                <form onSubmit={handleFaqSubmit} className="space-y-3 mt-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                                        <select
                                            value={faqForm.data.category}
                                            onChange={(e) => faqForm.setData('category', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                                        >
                                            <option value="general">General</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="production">Production</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Question *</label>
                                        <input
                                            type="text"
                                            required
                                            value={faqForm.data.question}
                                            onChange={(e) => faqForm.setData('question', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">Answer *</label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={faqForm.data.answer}
                                            onChange={(e) => faqForm.setData('answer', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsFaqOpen(false)}
                                            className="px-3 py-1.5 text-xs text-slate-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white rounded-xl shadow-neon"
                                        >
                                            Save FAQ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
