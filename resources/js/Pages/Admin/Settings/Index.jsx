import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Globe, Phone, Mail, MapPin, Share2, Shield, Upload, Image as ImageIcon } from 'lucide-react';

export default function SettingsAdmin({ settings }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings?.site_name || 'DigitalJao',
        site_tagline: settings?.site_tagline || 'Your Brand Deserves to Be Seen.',
        site_subtagline: settings?.site_subtagline || 'Strategy, creativity and execution – all in one place.',
        site_logo: settings?.site_logo || '/images/digitaljao-logo.png',
        site_logo_file: null,
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

    const handleLogoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('site_logo_file', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                setData('site_logo_file', null);
            },
        });
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

                        {/* Brand Name */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                            <input
                                type="text"
                                value={data.site_name}
                                onChange={(e) => setData('site_name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                            />
                        </div>

                        {/* Website Logo Upload & Live Preview */}
                        <div className="p-5 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Website Brand Logo
                                </label>
                                {previewUrl && (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        New Image Selected (Click Save Below)
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                {/* Preview Box */}
                                <div className="p-3 rounded-2xl bg-[#030E1F] border border-[#1769FF]/40 flex items-center justify-center min-w-[200px] h-20 shadow-inner">
                                    <img
                                        src={previewUrl || data.site_logo || '/images/digitaljao-logo.png'}
                                        alt="Logo Preview"
                                        className="max-h-14 w-auto object-contain"
                                    />
                                </div>

                                {/* Upload Controls */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 active:scale-95 transition-all">
                                            <Upload className="w-4 h-4" />
                                            <span>Upload New Logo File</span>
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                                className="hidden"
                                                onChange={handleLogoFileChange}
                                            />
                                        </label>

                                        {previewUrl && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewUrl(null);
                                                    setData('site_logo_file', null);
                                                }}
                                                className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-400">
                                        Supports PNG (transparent), JPG, WebP, or SVG. File size up to 5MB.
                                    </p>
                                    {errors.site_logo_file && (
                                        <p className="text-rose-400 text-xs font-medium">{errors.site_logo_file}</p>
                                    )}
                                </div>
                            </div>

                            {/* Manual Path Fallback */}
                            <div className="pt-2 border-t border-slate-800/80">
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                                    Or Manual Asset Path / Remote URL
                                </label>
                                <input
                                    type="text"
                                    value={data.site_logo}
                                    onChange={(e) => setData('site_logo', e.target.value)}
                                    placeholder="/images/digitaljao-logo.png"
                                    className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
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
