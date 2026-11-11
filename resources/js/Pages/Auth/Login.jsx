import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'admin@digitaljao.com',
        password: 'password123',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Sign In" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold font-display text-white">Sign In to Dashboard</h2>
                <p className="text-xs text-slate-400 mt-1">
                    Enter your authorized administrative credentials
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-700 bg-slate-900 text-[#1769FF]"
                        />
                        <span>Remember credentials</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[#19C8F5] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1769FF] to-[#19C8F5] text-white shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        {processing ? 'Authenticating...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
