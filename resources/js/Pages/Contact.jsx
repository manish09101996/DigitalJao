import { useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/SectionHeading';
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact({ services }) {
    const { settings } = usePage().props;

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        service: services[0]?.title || 'Digital Marketing',
        budget: '$1,000 - $3,000',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    const whatsappNumber = settings?.contact_whatsapp || '+919876543210';
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello DigitalJao! I want to discuss a new marketing and production project.")}`;

    return (
        <PublicLayout
            title="Contact Us"
            description="Get in touch with DigitalJao. Speak directly with senior digital growth strategists and production directors."
        >
            {/* HERO BANNER */}
            <section className="relative py-20 sm:py-28 overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1769FF]/15 blur-[130px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-6">
                        <Sparkles className="w-4 h-4 text-[#19C8F5]" />
                        START THE CONVERSATION
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-black font-display text-white max-w-4xl mx-auto tracking-tight leading-tight">
                        Your Brand Deserves to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                            Be Seen.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Whether you need a predictable client acquisition funnel or full-scale cinematic film production, we are here to execute.
                    </p>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-12 pb-28 bg-[#041228] border-t border-[#1769FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="p-8 sm:p-12 rounded-3xl bg-[#061A3A]/80 border border-[#1769FF]/30 shadow-2xl backdrop-blur-xl">
                                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
                                    Send Us an Enquiry
                                </h2>
                                <p className="text-slate-400 text-sm mb-8">
                                    Fill in your details below and a DigitalJao director will respond within 24 hours.
                                </p>

                                {recentlySuccessful && (
                                    <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>Thank you! Your enquiry has been received. We will contact you shortly.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl glass-input text-sm"
                                            placeholder="e.g. Vikram Singhania"
                                        />
                                        {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                                Business Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm"
                                                placeholder="vikram@brand.com"
                                            />
                                            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm"
                                                placeholder="+91 98765 43210"
                                            />
                                            {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                                Select Primary Service
                                            </label>
                                            <select
                                                value={data.service}
                                                onChange={(e) => setData('service', e.target.value)}
                                                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm"
                                            >
                                                {services.map((s) => (
                                                    <option key={s.id} value={s.title}>
                                                        {s.title}
                                                    </option>
                                                ))}
                                                <option value="Production Shoot">DigitalJao Production Shoot</option>
                                                <option value="General Consultation">Full-Stack Custom Package</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                                Estimated Budget
                                            </label>
                                            <select
                                                value={data.budget}
                                                onChange={(e) => setData('budget', e.target.value)}
                                                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm"
                                            >
                                                <option value="$1,000 - $3,000">$1,000 - $3,000 / month</option>
                                                <option value="$3,000 - $7,000">$3,000 - $7,000 / month</option>
                                                <option value="$7,000+">$7,000+ / month (Enterprise)</option>
                                                <option value="Custom Quote">Custom Quote / Shoot</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                            How Can We Help You? *
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Tell us about your brand, current bottlenecks, target goals, or event dates..."
                                            className="w-full px-4 py-3.5 rounded-xl glass-input text-sm resize-none"
                                        />
                                        {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{processing ? 'Submitting...' : 'Send Message'}</span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info & WhatsApp */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* WhatsApp Direct Card */}
                            <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass">
                                <h3 className="text-xl font-bold font-display text-white mb-2">
                                    Instant WhatsApp Connect
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Prefer real-time chat? Connect with our business development team directly on WhatsApp for immediate queries.
                                </p>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all"
                                >
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </div>

                            {/* Contact Details */}
                            <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass space-y-6">
                                <h3 className="text-xl font-bold font-display text-white mb-4">
                                    Studio Information
                                </h3>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/30 flex items-center justify-center text-[#19C8F5] shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-semibold text-slate-400 block">Phone</span>
                                        <a href={`tel:${settings?.contact_phone}`} className="text-white font-medium hover:text-[#19C8F5] transition-colors text-sm">
                                            {settings?.contact_phone || '+91 98765 43210'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/30 flex items-center justify-center text-[#19C8F5] shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-semibold text-slate-400 block">Email</span>
                                        <a href={`mailto:${settings?.contact_email}`} className="text-white font-medium hover:text-[#19C8F5] transition-colors text-sm">
                                            {settings?.contact_email || 'contact@digitaljao.com'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/30 flex items-center justify-center text-[#19C8F5] shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-semibold text-slate-400 block">Location</span>
                                        <p className="text-white font-medium text-sm">
                                            {settings?.contact_address || 'DigitalJao Creative Hub, Sector 62, Cyber City, India'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="rounded-3xl overflow-hidden border border-[#1769FF]/30 shadow-glass aspect-[16/9]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.27702847993!2d77.01804245607374!3d28.632429188825706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="DigitalJao Headquarters Map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
