import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#030E1F] text-slate-100 p-4 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1769FF]/20 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#19C8F5]/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center mb-6">
                <Link href={route('home')} className="group">
                    <ApplicationLogo className="h-14 w-auto hover:scale-105 transition-transform" />
                </Link>
                <span className="mt-3 text-xs uppercase tracking-widest font-bold text-[#19C8F5]">
                    DigitalJao Management Portal
                </span>
            </div>

            <div className="relative z-10 w-full sm:max-w-md rounded-3xl bg-[#061A3A]/80 border border-[#1769FF]/30 p-8 shadow-glass backdrop-blur-xl">
                {children}
            </div>

            <div className="relative z-10 mt-8 text-center text-xs text-slate-500">
                <Link href={route('home')} className="text-[#19C8F5] hover:underline">
                    ← Back to DigitalJao Website
                </Link>
            </div>
        </div>
    );
}
