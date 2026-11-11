import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Globe, Phone, Mail, MapPin, Share2, Shield } from 'lucide-react';

export default function SettingsAdmin({ settings }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        site_name: settings?.site_name || 'DigitalJao',
        site_tagline: settings?.site_tagline || 'Your Brand Deserves to Be Seen.',
        site_subtagline: settings?.site_subtagline || 'Strategy, creativity and execution – all in one place.',
        site_logo: settings?.site_logo || '/images/digitaljao-logo.jpg',
        contact_email: settings?.contact_email || 'contact@digitaljao.com',
        contact_phone: settings?.contact_phone || '+91 98765 43210',
        contact_whatsapp: settings?.contact_whatsapp || '+919876543210',
        contact_address: settings?.contact_address || 'DigitalJao Creative Hub, Sector 62, Cyber City, India',
        social_instagram: settings?.social_instagram || '',
        social_facebook: settings?.social_facebook || '',
        social_linkedin: settings?.social_linkedin || '',
        social_youtube: settings?.social_youtube || '',
        social_x: settings?.social_x || '',
        footer_bio: settings?.footer_bio || '',
        google_analytics_id: settings?.google_analytics_id || '',
        meta_title: settings?.meta_title || '',
        meta_description: settings?.meta_description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="Global Website Settings">
            <div className="max-w-4xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">System & Brand Configuration</h2>
                    <p className="text-xs text-slate-400">Configure business information, contact links, and SEO defaults</p>
                </div>

                {recentlySuccessful && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                        Settings saved successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Brand & Identity */}
                    <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass space-y-4">
                        <div className="flex items-center gap-2 text-[#19C8F5] text-sm font-bold uppercase tracking-wider mb-2">
                            <Globe className="w-4 h-4" />
                            <span>Brand Identity</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Logo Asset Path</label>
                                <input
                                    type="text"
                                    value={data.site_logo}
                                    onChange={(e) => setData('site_logo', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Tagline</label>
                            <input
                                type="text"
                                value={data.site_tagline}
                                onChange={(e) => setData('site_tagline', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Bio</label>
                            <textarea
                                rows="2"
                                value={data.footer_bio}
                                onChange={(e) => setData('footer_bio', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* Contact & WhatsApp */}
                    <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass space-y-4">
                        <div className="flex items-center gap-2 text-[#19C8F5] text-sm font-bold uppercase tracking-wider mb-2">
                            <Phone className="w-4 h-4" />
                            <span>Contact & Messaging</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number (with country code)</label>
                                <input
                                    type="text"
                                    value={data.contact_whatsapp}
                                    onChange={(e) => setData('contact_whatsapp', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    placeholder="+919876543210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Headquarters Address</label>
                            <input
                                type="text"
                                value={data.contact_address}
                                onChange={(e) => setData('contact_address', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass space-y-4">
                        <div className="flex items-center gap-2 text-[#19C8F5] text-sm font-bold uppercase tracking-wider mb-2">
                            <Share2 className="w-4 h-4" />
                            <span>Social Media Profiles</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram URL</label>
                                <input
                                    type="text"
                                    value={data.social_instagram}
                                    onChange={(e) => setData('social_instagram', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                                <input
                                    type="text"
                                    value={data.social_linkedin}
                                    onChange={(e) => setData('social_linkedin', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook URL</label>
                                <input
                                    type="text"
                                    value={data.social_facebook}
                                    onChange={(e) => setData('social_facebook', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube URL</label>
                                <input
                                    type="text"
                                    value={data.social_youtube}
                                    onChange={(e) => setData('social_youtube', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO & Tracking */}
                    <div className="p-8 rounded-3xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass space-y-4">
                        <div className="flex items-center gap-2 text-[#19C8F5] text-sm font-bold uppercase tracking-wider mb-2">
                            <Shield className="w-4 h-4" />
                            <span>SEO & Analytics</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Default Meta Title</label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Google Analytics Measurement ID</label>
                                <input
                                    type="text"
                                    value={data.google_analytics_id}
                                    onChange={(e) => setData('google_analytics_id', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Default Meta Description</label>
                            <textarea
                                rows="2"
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-2 hover:scale-105 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : 'Save All Settings'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
