import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
    Sparkles,
    Eye,
    EyeOff,
    ExternalLink,
    Upload,
    Image as ImageIcon
} from 'lucide-react';

export default function ServicesAdmin({ services }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [createImagePreview, setCreateImagePreview] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        title: '',
        slug: '',
        tagline: '',
        short_description: '',
        description: '',
        icon: 'Sparkles',
        image: '',
        image_file: null,
        featured: false,
        is_active: true,
        order: 0,
        meta_title: '',
        meta_description: '',
    });

    const editForm = useForm({
        title: '',
        slug: '',
        tagline: '',
        short_description: '',
        description: '',
        icon: 'Sparkles',
        image: '',
        image_file: null,
        featured: false,
        is_active: true,
        order: 0,
        meta_title: '',
        meta_description: '',
    });

    const handleOpenEdit = (service) => {
        setEditingService(service);
        setEditImagePreview(null);
        editForm.setData({
            title: service.title,
            slug: service.slug,
            tagline: service.tagline || '',
            short_description: service.short_description || '',
            description: service.description || '',
            icon: service.icon || 'Sparkles',
            image: service.image || '',
            image_file: null,
            featured: Boolean(service.featured),
            is_active: Boolean(service.is_active),
            order: service.order || 0,
            meta_title: service.meta_title || '',
            meta_description: service.meta_description || '',
        });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route('admin.services.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setCreateImagePreview(null);
                setIsCreateOpen(false);
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.post(route('admin.services.update', editingService.id), {
            forceFormData: true,
            onSuccess: () => {
                setEditingService(null);
                setEditImagePreview(null);
            },
        });
    };

    const handleDelete = (service) => {
        if (confirm(`Are you sure you want to delete the "${service.title}" service?`)) {
            router.delete(route('admin.services.destroy', service.id));
        }
    };

    return (
        <AdminLayout title="Manage Marketing Services">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Services Directory</h2>
                    <p className="text-xs text-slate-400">Manage all agency capabilities, descriptions, and SEO URLs</p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                </button>
            </div>

            {/* Services Table */}
            <div className="rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#041228] text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Slug / URL</th>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {services.map((service) => (
                                <tr key={service.id} className="hover:bg-[#082046]/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white flex items-center gap-2">
                                            <span>{service.title}</span>
                                            {service.featured && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1769FF]/30 text-[#19C8F5]">Featured</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-400 line-clamp-1">{service.tagline}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-cyan-400">
                                        /services/{service.slug}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-slate-300">
                                        {service.order}
                                    </td>
                                    <td className="px-6 py-4">
                                        {service.featured ? (
                                            <span className="text-emerald-400 text-xs font-semibold">Yes</span>
                                        ) : (
                                            <span className="text-slate-500 text-xs">No</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            service.is_active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'
                                        }`}>
                                            {service.is_active ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={route('services.show', service.slug)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                                                title="View on site"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleOpenEdit(service)}
                                                className="p-1.5 text-slate-400 hover:text-[#19C8F5] rounded-lg hover:bg-slate-800"
                                                title="Edit Service"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service)}
                                                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                                                title="Delete Service"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Service Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative max-w-2xl w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Create New Service</h3>
                            <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="e.g. Influencer Marketing"
                                    />
                                    {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug (Auto if empty)</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="influencer-marketing"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={data.tagline}
                                    onChange={(e) => setData('tagline', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    placeholder="High-Impact Creator Partnerships"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Summary (Listing)</label>
                                <textarea
                                    rows="2"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description (Detail Page)</label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>

                            {/* Cover Image Upload & URL */}
                            <div className="p-4 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Service Cover Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#030E1F] border border-[#1769FF]/40 shrink-0 flex items-center justify-center">
                                        {(createImagePreview || data.image) ? (
                                            <img
                                                src={createImagePreview || data.image}
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
                                                <span>Choose Image File</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setData('image_file', file);
                                                            setCreateImagePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {data.image_file && (
                                                <span className="text-xs text-emerald-400 font-medium truncate max-w-[180px]">
                                                    ✓ {data.image_file.name}
                                                </span>
                                            )}
                                            {createImagePreview && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCreateImagePreview(null);
                                                        setData('image_file', null);
                                                    }}
                                                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400">Upload directly from device (PNG, JPG, WebP up to 5MB)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Or Image URL</label>
                                        <input
                                            type="text"
                                            value={data.image}
                                            onChange={(e) => setData('image', e.target.value)}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Display Order</label>
                                        <input
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Mark as Featured on Homepage</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Active (Published)</span>
                                </label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    {processing ? 'Saving...' : 'Create Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Service Modal */}
            {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative max-w-2xl w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Edit Service: {editingService.title}</h3>
                            <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.title}
                                        onChange={(e) => editForm.setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.slug}
                                        onChange={(e) => editForm.setData('slug', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={editForm.data.tagline}
                                    onChange={(e) => editForm.setData('tagline', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.short_description}
                                    onChange={(e) => editForm.setData('short_description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                                <textarea
                                    rows="4"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>

                            {/* Service Cover Image Upload & URL */}
                            <div className="p-4 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Service Cover Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#030E1F] border border-[#1769FF]/40 shrink-0 flex items-center justify-center">
                                        {(editImagePreview || editForm.data.image) ? (
                                            <img
                                                src={editImagePreview || editForm.data.image}
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
                                                <span>Choose New Image File</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            editForm.setData('image_file', file);
                                                            setEditImagePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {editForm.data.image_file && (
                                                <span className="text-xs text-emerald-400 font-medium truncate max-w-[180px]">
                                                    ✓ {editForm.data.image_file.name}
                                                </span>
                                            )}
                                            {editImagePreview && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditImagePreview(null);
                                                        editForm.setData('image_file', null);
                                                    }}
                                                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400">Upload directly from device (PNG, JPG, WebP up to 5MB)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Or Image URL</label>
                                        <input
                                            type="text"
                                            value={editForm.data.image}
                                            onChange={(e) => editForm.setData('image', e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Order</label>
                                        <input
                                            type="number"
                                            value={editForm.data.order}
                                            onChange={(e) => editForm.setData('order', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.featured}
                                        onChange={(e) => editForm.setData('featured', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Featured on Homepage</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_active}
                                        onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Active (Published)</span>
                                </label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingService(null)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    {editForm.processing ? 'Updating...' : 'Update Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
