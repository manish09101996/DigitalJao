import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Trash2,
    Camera,
    Play,
    Tag,
    Image as ImageIcon,
    Upload
} from 'lucide-react';

export default function ProductionAdmin({ categories, media }) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [mediaFilePreview, setMediaFilePreview] = useState(null);

    const mediaForm = useForm({
        production_category_id: categories[0]?.id || '',
        title: '',
        file_path: '',
        media_file: null,
        media_type: 'photo',
        video_url: '',
        client_name: '',
        location: '',
        aspect_ratio: 'landscape',
        featured: false,
        order: 0,
    });

    const [categoryImagePreview, setCategoryImagePreview] = useState(null);

    const categoryForm = useForm({
        name: '',
        slug: '',
        description: '',
        hero_image: '',
        hero_image_file: null,
        order: 0,
    });

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        mediaForm.post(route('admin.production.media.store'), {
            forceFormData: true,
            onSuccess: () => {
                mediaForm.reset();
                setMediaFilePreview(null);
                setIsUploadOpen(false);
            },
        });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        categoryForm.post(route('admin.production.categories.store'), {
            forceFormData: true,
            onSuccess: () => {
                categoryForm.reset();
                setCategoryImagePreview(null);
                setIsCategoryOpen(false);
            },
        });
    };

    const handleDeleteMedia = (item) => {
        if (confirm(`Remove media "${item.title}"?`)) {
            router.delete(route('admin.production.media.destroy', item.id));
        }
    };

    const filteredMedia = activeTab === 'all'
        ? media
        : media.filter((m) => m.production_category_id === parseInt(activeTab));

    return (
        <AdminLayout title="DigitalJao Production Studio CMS">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Cinematic Shoot & Gallery Management</h2>
                    <p className="text-xs text-slate-400">Weddings, Pre-Weddings, Vehicle Deliveries, Openings, and Celebrations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCategoryOpen(true)}
                        className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#082046] hover:bg-[#0a2856] text-white border border-[#1769FF]/40 flex items-center gap-1.5 transition-colors"
                    >
                        <Tag className="w-4 h-4 text-[#19C8F5]" />
                        <span>Add Category</span>
                    </button>
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-1.5 hover:scale-105 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Photo / Video</span>
                    </button>
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        activeTab === 'all'
                            ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                            : 'bg-[#061A3A] text-slate-300 hover:text-white border border-[#1769FF]/20'
                    }`}
                >
                    All Categories ({media.length})
                </button>
                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveTab(c.id.toString())}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            activeTab === c.id.toString()
                                ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                                : 'bg-[#061A3A] text-slate-300 hover:text-white border border-[#1769FF]/20'
                        }`}
                    >
                        {c.name} ({c.media_count || 0})
                    </button>
                ))}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedia.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/25 overflow-hidden flex flex-col justify-between group shadow-glass"
                    >
                        <div className="relative aspect-[4/3] bg-black overflow-hidden">
                            <img
                                src={item.file_path}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {item.media_type === 'video' && (
                                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white">
                                    <Play className="w-3.5 h-3.5 fill-white" />
                                </div>
                            )}
                            {item.featured && (
                                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#1769FF] text-white">
                                    Featured
                                </span>
                            )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-[#19C8F5]">
                                    {item.category?.name}
                                </span>
                                <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{item.title}</h4>
                                {(item.client_name || item.location) && (
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                                        {item.client_name} {item.location ? `• ${item.location}` : ''}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                    {item.aspect_ratio}
                                </span>
                                <button
                                    onClick={() => handleDeleteMedia(item)}
                                    className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Media Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative max-w-lg w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 shadow-2xl my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Add Photo / Video to Production</h3>
                            <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleUploadSubmit} className="space-y-4 mt-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Production Category *</label>
                                <select
                                    value={mediaForm.data.production_category_id}
                                    onChange={(e) => mediaForm.setData('production_category_id', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                >
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={mediaForm.data.title}
                                    onChange={(e) => mediaForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    placeholder="e.g. Royal Palace Vows Teaser"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Media Type</label>
                                    <select
                                        value={mediaForm.data.media_type}
                                        onChange={(e) => mediaForm.setData('media_type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    >
                                        <option value="photo">Photography</option>
                                        <option value="video">Cinematic Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Aspect Ratio</label>
                                    <select
                                        value={mediaForm.data.aspect_ratio}
                                        onChange={(e) => mediaForm.setData('aspect_ratio', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    >
                                        <option value="landscape">Landscape (16:9)</option>
                                        <option value="portrait">Portrait (9:16)</option>
                                        <option value="square">Square (1:1)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Media Photo Upload & URL */}
                            <div className="p-4 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Media Photograph / Thumbnail
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#030E1F] border border-[#1769FF]/40 shrink-0 flex items-center justify-center">
                                        {(mediaFilePreview || mediaForm.data.file_path) ? (
                                            <img
                                                src={mediaFilePreview || mediaForm.data.file_path}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-slate-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all">
                                                <Upload className="w-3.5 h-3.5" />
                                                <span>Choose Photo File</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            mediaForm.setData('media_file', file);
                                                            setMediaFilePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {mediaForm.data.media_file && (
                                                <span className="text-xs text-emerald-400 font-medium truncate max-w-[180px]">
                                                    ✓ {mediaForm.data.media_file.name}
                                                </span>
                                            )}
                                            {mediaFilePreview && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMediaFilePreview(null);
                                                        mediaForm.setData('media_file', null);
                                                    }}
                                                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400">PNG, JPG, WebP up to 10MB</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">Or Photo URL</label>
                                    <input
                                        type="text"
                                        value={mediaForm.data.file_path}
                                        onChange={(e) => mediaForm.setData('file_path', e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
                                    />
                                </div>
                            </div>

                            {mediaForm.data.media_type === 'video' && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Video Playback URL (YouTube or MP4)</label>
                                    <input
                                        type="text"
                                        value={mediaForm.data.video_url}
                                        onChange={(e) => mediaForm.setData('video_url', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={mediaForm.data.client_name}
                                        onChange={(e) => mediaForm.setData('client_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="Rohan & Simran"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={mediaForm.data.location}
                                        onChange={(e) => mediaForm.setData('location', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="Udaipur, Rajasthan"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 pt-1">
                                <input
                                    type="checkbox"
                                    checked={mediaForm.data.featured}
                                    onChange={(e) => mediaForm.setData('featured', e.target.checked)}
                                    className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                />
                                <span>Featured on Homepage</span>
                            </label>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={mediaForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    {mediaForm.processing ? 'Saving...' : 'Add Media'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {isCategoryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="relative max-w-md w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Add Production Category</h3>
                            <button onClick={() => setIsCategoryOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleCategorySubmit} className="space-y-4 mt-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Category Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={categoryForm.data.name}
                                    onChange={(e) => categoryForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    placeholder="e.g. Fashion & Editorial Shoots"
                                />
                            </div>
                            <div className="p-3.5 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-2.5">
                                <label className="block text-xs font-semibold text-slate-300">Category Hero Cover</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-12 rounded-lg bg-[#030E1F] border border-[#1769FF]/40 overflow-hidden flex items-center justify-center shrink-0">
                                        {(categoryImagePreview || categoryForm.data.hero_image) ? (
                                            <img
                                                src={categoryImagePreview || categoryForm.data.hero_image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-slate-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-105 transition-all">
                                                <Upload className="w-3 h-3" />
                                                <span>Choose Image File</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            categoryForm.setData('hero_image_file', file);
                                                            setCategoryImagePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {categoryForm.data.hero_image_file && (
                                                <span className="text-xs text-emerald-400 font-medium truncate max-w-[140px]">
                                                    ✓ {categoryForm.data.hero_image_file.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">Or Hero Image URL</label>
                                    <input
                                        type="text"
                                        value={categoryForm.data.hero_image}
                                        onChange={(e) => categoryForm.setData('hero_image', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-xl glass-input text-xs font-mono"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                                <textarea
                                    rows="2"
                                    value={categoryForm.data.description}
                                    onChange={(e) => categoryForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCategoryOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
