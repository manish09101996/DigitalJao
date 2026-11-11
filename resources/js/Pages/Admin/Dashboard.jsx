import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Inbox,
    Briefcase,
    FolderKanban,
    Camera,
    Plus,
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertCircle,
    User,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';

export default function AdminDashboard({ metrics, statusCounts, recentEnquiries }) {
    const handleStatusChange = (enquiryId, newStatus) => {
        router.put(route('admin.enquiries.status', enquiryId), { status: newStatus }, { preserveScroll: true });
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
        <AdminLayout title="DigitalJao Control Centre">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Total Enquiries */}
                <div className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enquiries</span>
                        <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-[#19C8F5]">
                            <Inbox className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white">{metrics.totalEnquiries}</div>
                    <div className="mt-2 text-xs text-cyan-400 font-medium flex items-center gap-1">
                        <span>{metrics.newEnquiries} new pending review</span>
                    </div>
                </div>

                {/* Services Count */}
                <div className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</span>
                        <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-[#1769FF]">
                            <Briefcase className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white">{metrics.totalServices}</div>
                    <Link href={route('admin.services.index')} className="mt-2 text-xs text-slate-400 hover:text-white flex items-center gap-1">
                        <span>Manage Services →</span>
                    </Link>
                </div>

                {/* Portfolio Projects */}
                <div className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Portfolio Projects</span>
                        <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-emerald-400">
                            <FolderKanban className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white">{metrics.totalPortfolio}</div>
                    <Link href={route('admin.portfolio.index')} className="mt-2 text-xs text-slate-400 hover:text-white flex items-center gap-1">
                        <span>Manage Projects →</span>
                    </Link>
                </div>

                {/* Production Media */}
                <div className="p-6 rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Production Media</span>
                        <div className="w-10 h-10 rounded-xl bg-[#082046] border border-[#1769FF]/40 flex items-center justify-center text-purple-400">
                            <Camera className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white">{metrics.totalProduction}</div>
                    <Link href={route('admin.production.index')} className="mt-2 text-xs text-slate-400 hover:text-white flex items-center gap-1">
                        <span>Manage Studios →</span>
                    </Link>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-6 rounded-2xl bg-[#061A3A]/40 border border-[#1769FF]/20 mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-bold text-white">Management Shortcuts</h3>
                    <p className="text-xs text-slate-400">Quickly create new entries or update homepage content</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={route('admin.services.index')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1769FF]/20 hover:bg-[#1769FF]/30 text-[#19C8F5] border border-[#1769FF]/40 flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Service
                    </Link>
                    <Link
                        href={route('admin.portfolio.index')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1769FF]/20 hover:bg-[#1769FF]/30 text-[#19C8F5] border border-[#1769FF]/40 flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Project
                    </Link>
                    <Link
                        href={route('admin.production.index')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1769FF]/20 hover:bg-[#1769FF]/30 text-[#19C8F5] border border-[#1769FF]/40 flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Upload Shoot Media
                    </Link>
                    <Link
                        href={route('admin.homepage.index')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#082046] hover:bg-[#0a2754] text-white border border-slate-700 transition-colors"
                    >
                        Edit Homepage
                    </Link>
                </div>
            </div>

            {/* Recent Enquiries Table */}
            <div className="rounded-2xl bg-[#061A3A]/70 border border-[#1769FF]/20 shadow-glass overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">Recent Client Inquiries & Bookings</h3>
                        <p className="text-xs text-slate-400">Inbound leads from contact forms and photoshoot booking modules</p>
                    </div>
                    <Link
                        href={route('admin.enquiries.index')}
                        className="text-xs font-semibold text-[#19C8F5] hover:underline flex items-center gap-1"
                    >
                        <span>View All & Export</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#041228] text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Client Name</th>
                                <th className="px-6 py-4">Type / Service</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {recentEnquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-[#082046]/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-white">{enquiry.name}</div>
                                        <div className="text-xs text-slate-400 line-clamp-1">{enquiry.message}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-[#19C8F5]">
                                            {enquiry.service || enquiry.production_category || 'General'}
                                        </span>
                                        {enquiry.budget && (
                                            <span className="block text-xs text-slate-400">{enquiry.budget}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        <div className="text-slate-300">{enquiry.email}</div>
                                        <div className="text-slate-400">{enquiry.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={enquiry.status}
                                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border bg-transparent cursor-pointer ${statusBadgeColor(enquiry.status)}`}
                                        >
                                            <option value="new" className="bg-[#061A3A] text-white">New</option>
                                            <option value="contacted" className="bg-[#061A3A] text-white">Contacted</option>
                                            <option value="in_progress" className="bg-[#061A3A] text-white">In Progress</option>
                                            <option value="completed" className="bg-[#061A3A] text-white">Completed</option>
                                            <option value="spam" className="bg-[#061A3A] text-white">Spam</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                                        {new Date(enquiry.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={route('admin.enquiries.index', { search: enquiry.email })}
                                            className="text-xs font-medium text-[#19C8F5] hover:underline"
                                        >
                                            Details / Notes
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
