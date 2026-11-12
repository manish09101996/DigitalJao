import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Edit2,
    Trash2,
    ExternalLink,
    FolderKanban,
    Upload,
    Image as ImageIcon
} from 'lucide-react';

export default function PortfolioAdmin({ projects, categories }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [createImagePreview, setCreateImagePreview] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        category_id: categories[0]?.id || '',
        title: '',
        slug: '',
        client_name: '',
        summary: '',
        description: '',
        featured_image: '',
        image_file: null,
        video_url: '',
        results_metric: '+350% ROAS',
        results_label: 'Blended Return',
        is_featured: true,
        is_published: true,
        order: 0,
    });

    const editForm = useForm({
        category_id: '',
        title: '',
        slug: '',
        client_name: '',
        summary: '',
        description: '',
        featured_image: '',
        image_file: null,
        video_url: '',
        results_metric: '',
        results_label: '',
        is_featured: true,
        is_published: true,
        order: 0,
    });

    const handleOpenEdit = (project) => {
        setEditingProject(project);
        setEditImagePreview(null);
        editForm.setData({
            category_id: project.category_id || '',
            title: project.title,
            slug: project.slug,
            client_name: project.client_name || '',
            summary: project.summary || '',
            description: project.description || '',
            featured_image: project.featured_image || '',
            image_file: null,
            video_url: project.video_url || '',
            results_metric: project.results_metric || '',
            results_label: project.results_label || '',
            is_featured: Boolean(project.is_featured),
            is_published: Boolean(project.is_published),
            order: project.order || 0,
        });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route('admin.portfolio.store'), {
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
        editForm.post(route('admin.portfolio.update', editingProject.id), {
            forceFormData: true,
            onSuccess: () => {
                setEditingProject(null);
                setEditImagePreview(null);
            },
        });
    };

    const handleDelete = (project) => {
        if (confirm(`Are you sure you want to delete project "${project.title}"?`)) {
            router.delete(route('admin.portfolio.destroy', project.id));
        }
    };

    return (
        <AdminLayout title="Manage Portfolio & Case Studies">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Portfolio Projects</h2>
                    <p className="text-xs text-slate-400">Manage client success stories, verified metrics, and showcase imagery</p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Projects Table */}
            <div className="rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#041228] text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Metric</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-[#082046]/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {project.featured_image && (
                                                <img
                                                    src={project.featured_image}
                                                    alt={project.title}
                                                    className="w-12 h-9 rounded-lg object-cover border border-[#1769FF]/30"
                                                />
                                            )}
                                            <div>
                                                <div className="font-bold text-white">{project.title}</div>
                                                <div className="text-xs text-slate-400 font-mono">/portfolio/{project.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-slate-300">
                                        {project.client_name || '—'}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-[#19C8F5]">
                                        {project.category?.name || 'Unassigned'}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-extrabold text-emerald-400">
                                        {project.results_metric || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                                            project.is_published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                                        }`}>
                                            {project.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={route('portfolio.show', project.slug)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                                                title="View Live"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleOpenEdit(project)}
                                                className="p-1.5 text-slate-400 hover:text-[#19C8F5] rounded-lg hover:bg-slate-800"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                                                title="Delete"
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

            {/* Create Project Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative max-w-2xl w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Create New Project</h3>
                            <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={data.client_name}
                                        onChange={(e) => setData('client_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Verified Metric</label>
                                    <input
                                        type="text"
                                        value={data.results_metric}
                                        onChange={(e) => setData('results_metric', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                        placeholder="+460% ROAS"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Summary</label>
                                <textarea
                                    rows="2"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Case Study Description</label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>

                            {/* Featured Image Upload & URL */}
                            <div className="p-4 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Project Featured Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#030E1F] border border-[#1769FF]/40 shrink-0 flex items-center justify-center">
                                        {(createImagePreview || data.featured_image) ? (
                                            <img
                                                src={createImagePreview || data.featured_image}
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
                                        <p className="text-[11px] text-slate-400">Upload directly from your device (PNG, JPG, WebP up to 5MB)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Or Image URL</label>
                                        <input
                                            type="text"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Video URL (YouTube / MP4)</label>
                                        <input
                                            type="text"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            placeholder="https://youtube.com/..."
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Featured Project</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Published</span>
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
                                    {processing ? 'Saving...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative max-w-2xl w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Edit Project: {editingProject.title}</h3>
                            <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.title}
                                        onChange={(e) => editForm.setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                                    <select
                                        value={editForm.data.category_id}
                                        onChange={(e) => editForm.setData('category_id', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.client_name}
                                        onChange={(e) => editForm.setData('client_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Verified Metric</label>
                                    <input
                                        type="text"
                                        value={editForm.data.results_metric}
                                        onChange={(e) => editForm.setData('results_metric', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary</label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.summary}
                                    onChange={(e) => editForm.setData('summary', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                                <textarea
                                    rows="4"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                                />
                            </div>

                            {/* Featured Image Upload & URL */}
                            <div className="p-4 rounded-2xl bg-[#041228]/80 border border-[#1769FF]/30 space-y-3">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Project Featured Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#030E1F] border border-[#1769FF]/40 shrink-0 flex items-center justify-center">
                                        {(editImagePreview || editForm.data.featured_image) ? (
                                            <img
                                                src={editImagePreview || editForm.data.featured_image}
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
                                        <p className="text-[11px] text-slate-400">Upload directly from your device (PNG, JPG, WebP up to 5MB)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Or Image URL</label>
                                        <input
                                            type="text"
                                            value={editForm.data.featured_image}
                                            onChange={(e) => editForm.setData('featured_image', e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">Video URL</label>
                                        <input
                                            type="text"
                                            value={editForm.data.video_url}
                                            onChange={(e) => editForm.setData('video_url', e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl glass-input text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_featured}
                                        onChange={(e) => editForm.setData('is_featured', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Featured Project</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_published}
                                        onChange={(e) => editForm.setData('is_published', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                                    />
                                    <span>Published</span>
                                </label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingProject(null)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon"
                                >
                                    {editForm.processing ? 'Updating...' : 'Update Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
