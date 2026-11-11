import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full shadow-2xl"
            >
                <div
                    className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl ${
                        type === 'success'
                            ? 'bg-[#061A3A]/90 border-emerald-500/40 text-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.2)]'
                            : 'bg-[#1a0808]/90 border-rose-500/40 text-rose-200 shadow-[0_10px_30px_rgba(244,63,94,0.2)]'
                    }`}
                >
                    {type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 text-sm font-medium leading-relaxed">{message}</div>
                    <button
                        onClick={() => setVisible(false)}
                        className="text-slate-400 hover:text-white p-1 rounded-lg"
                        aria-label="Close notification"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
