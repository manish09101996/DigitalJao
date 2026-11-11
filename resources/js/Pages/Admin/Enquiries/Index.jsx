import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Inbox,
    Download,
    Search,
    Filter,
    MessageSquare,
    Trash2,
    Calendar,
    Phone,
    Mail,
    Send,
    User
} from 'lucide-react';

export default function EnquiriesAdmin({ enquiries, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [activeEnquiryForNotes, setActiveEnquiryForNotes] = useState(null);

    const noteForm = useForm({
        note: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.enquiries.index'), { ...filters, search }, { preserveState: true });
    };

    const handleStatusFilter = (status) => {
        router.get(route('admin.enquiries.index'), { ...filters, status }, { preserveState: true });
    };

    const handleTypeFilter = (type) => {
        router.get(route('admin.enquiries.index'), { ...filters, type }, { preserveState: true });
    };

    const handleStatusChange = (enquiryId, newStatus) => {
        router.put(route('admin.enquiries.status', enquiryId), { status: newStatus }, { preserveScroll: true });
    };

    const handleDelete = (enquiry) => {
        if (confirm(`Delete enquiry from ${enquiry.name}?`)) {
            router.delete(route('admin.enquiries.destroy', enquiry.id));
        }
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        noteForm.post(route('admin.enquiries.notes', activeEnquiryForNotes.id), {
            onSuccess: () => {
                noteForm.reset();
                setActiveEnquiryForNotes(null);
            },
        });
    };

    const statusBadgeColor = (status) => {
        switch (status) {
            case 'new': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
            case 'contacted': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'in_progress': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            case 'completed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            case 'spam': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
            default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
        }
    };

    return (
        <AdminLayout title="Manage Inquiries & CRM Pipeline">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Client Enquiries & Shoot Bookings</h2>
                    <p className="text-xs text-slate-400">Track client requests, update status pipeline, and record internal notes</p>
                </div>
                <a
                    href={route('admin.enquiries.export')}
                    className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#082046] hover:bg-[#0a2856] text-[#19C8F5] border border-[#1769FF]/40 flex items-center gap-1.5 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span>Export to CSV</span>
                </a>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="w-full md:w-80 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs"
                    />
                </form>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <span className="text-xs text-slate-400 font-semibold mr-1">Status:</span>
                    {['all', 'new', 'contacted', 'in_progress', 'completed', 'spam'].map((st) => (
                        <button
                            key={st}
                            onClick={() => handleStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                                filters.status === st
                                    ? 'bg-[#1769FF] text-white shadow-neon'
                                    : 'bg-[#041228] text-slate-400 hover:text-white'
                            }`}
                        >
                            {st.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Enquiries List */}
            <div className="space-y-4">
                {enquiries.data.map((enquiry) => (
                    <div
                        key={enquiry.id}
                        className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass hover:border-[#1769FF]/40 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-base font-bold text-white">{enquiry.name}</h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#082046] text-[#19C8F5] border border-[#1769FF]/30">
                                        {enquiry.type.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5 text-[#1769FF]" />
                                        <a href={`mailto:${enquiry.email}`} className="hover:text-white">{enquiry.email}</a>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Phone className="w-3.5 h-3.5 text-[#19C8F5]" />
                                        <a href={`tel:${enquiry.phone}`} className="hover:text-white">{enquiry.phone}</a>
                                    </span>
                                    {enquiry.event_date && (
                                        <span className="flex items-center gap-1 text-cyan-300">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Shoot Date: {enquiry.event_date}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <select
                                    value={enquiry.status}
                                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border bg-transparent cursor-pointer ${statusBadgeColor(enquiry.status)}`}
                                >
                                    <option value="new" className="bg-[#061A3A] text-white">New</option>
                                    <option value="contacted" className="bg-[#061A3A] text-white">Contacted</option>
                                    <option value="in_progress" className="bg-[#061A3A] text-white">In Progress</option>
                                    <option value="completed" className="bg-[#061A3A] text-white">Completed</option>
                                    <option value="spam" className="bg-[#061A3A] text-white">Spam</option>
                                </select>

                                <button
                                    onClick={() => setActiveEnquiryForNotes(enquiry)}
                                    className="p-2 text-slate-400 hover:text-[#19C8F5] rounded-lg hover:bg-slate-800 transition-colors"
                                    title="Add Internal Note"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => handleDelete(enquiry)}
                                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Message body */}
                        <div className="pt-4">
                            <div className="flex items-center gap-2 text-xs text-[#19C8F5] font-semibold mb-2">
                                <span>Requested: {enquiry.service || enquiry.production_category || 'General Inbound'}</span>
                                {enquiry.budget && <span>• Budget: {enquiry.budget}</span>}
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed bg-[#041228]/50 p-4 rounded-xl border border-slate-800/80">
                                {enquiry.message}
                            </p>
                        </div>

                        {/* Internal Notes */}
                        {enquiry.notes && enquiry.notes.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                                <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Internal Notes</span>
                                {enquiry.notes.map((n) => (
                                    <div key={n.id} className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
                                        <span className="font-semibold text-amber-400">{n.user?.name || 'Staff'}: </span>
                                        {n.note}
                                        <span className="text-[10px] text-slate-400 ml-2">({new Date(n.created_at).toLocaleDateString()})</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {enquiries.data.length === 0 && (
                    <div className="text-center py-20 text-slate-400 rounded-2xl bg-[#061A3A]/40 border border-[#1769FF]/20">
                        No enquiries match the selected filter.
                    </div>
                )}
            </div>

            {/* Note Modal */}
            {activeEnquiryForNotes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="relative max-w-md w-full bg-[#061A3A] border border-[#1769FF]/40 rounded-3xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-base font-bold text-white">Add Note for {activeEnquiryForNotes.name}</h3>
                            <button onClick={() => setActiveEnquiryForNotes(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleAddNote} className="space-y-4 mt-4">
                            <textarea
                                rows="4"
                                required
                                placeholder="e.g. Spoke on phone, client interested in 3-day wedding package. Follow up on Tuesday..."
                                value={noteForm.data.note}
                                onChange={(e) => noteForm.setData('note', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setActiveEnquiryForNotes(null)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={noteForm.processing}
                                    className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white rounded-xl shadow-neon"
                                >
                                    Save Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
