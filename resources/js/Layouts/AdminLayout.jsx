import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Briefcase,
    FolderKanban,
    Camera,
    Inbox,
    Home,
    Settings,
    Globe,
    LogOut,
    Menu,
    X,
    ChevronRight,
    User
} from 'lucide-react';
import FlashMessage from '@/Components/FlashMessage';

export default function AdminLayout({ children, title }) {
    const { url } = usePage();
    const { auth, settings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logoSrc = settings?.site_logo || (typeof window !== 'undefined' && window.Ziggy ? `${window.Ziggy.url}/images/digitaljao-logo.png` : '/images/digitaljao-logo.png');

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), routeName: 'admin.dashboard', icon: LayoutDashboard },
        { name: 'Services', href: route('admin.services.index'), routeName: 'admin.services.index', icon: Briefcase },
        { name: 'Portfolio', href: route('admin.portfolio.index'), routeName: 'admin.portfolio.index', icon: FolderKanban },
        { name: 'Production Studio', href: route('admin.production.index'), routeName: 'admin.production.index', icon: Camera },
        { name: 'Enquiries', href: route('admin.enquiries.index'), routeName: 'admin.enquiries.index', icon: Inbox },
        { name: 'Homepage Content', href: route('admin.homepage.index'), routeName: 'admin.homepage.index', icon: Home },
        { name: 'Website Settings', href: route('admin.settings.index'), routeName: 'admin.settings.index', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#020A16] text-slate-100 flex">
            <FlashMessage />

            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#041226] border-r border-[#1769FF]/20 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-2.5">
                        <img
                            src={logoSrc}
                            alt="DigitalJao"
                            className="h-8 w-auto object-contain"
                        />
                        <div>
                            <span className="font-bold text-white tracking-wide text-sm block">DIGITALJAO</span>
                            <span className="text-[10px] text-[#19C8F5] uppercase tracking-wider font-semibold">Admin Panel</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                        Management Hub
                    </div>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = typeof route !== 'undefined' ? (route().current(item.routeName) || (item.routeName !== 'admin.dashboard' && route().current(item.routeName.replace('.index', '') + '.*'))) : false;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon'
                                        : 'text-slate-300 hover:bg-[#061A3A] hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer Controls */}
                <div className="p-3 border-t border-slate-800 space-y-2">
                    <Link
                        href={route('home')}
                        target="_blank"
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#061A3A] hover:bg-[#082046] text-[#19C8F5] border border-[#1769FF]/30 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Live Website
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-7 h-7 rounded-full bg-[#1769FF]/30 flex items-center justify-center text-xs text-[#19C8F5] font-bold">
                                {auth?.user?.name ? auth.user.name.charAt(0) : 'A'}
                            </div>
                            <div className="truncate">
                                <p className="text-xs font-medium text-white truncate">{auth?.user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-slate-400 truncate">{auth?.user?.email}</p>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-[#041226]/80 backdrop-blur-md border-b border-[#1769FF]/20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg bg-[#061A3A] text-slate-300 hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-white tracking-wide">{title || 'Dashboard'}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            System Active
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
