import { useEffect } from 'react';
import { X, Play, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LightboxModal({ isOpen, onClose, item, onNext, onPrev }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && onNext) onNext();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen || !item) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#061A3A]/80 border border-[#1769FF]/40 text-white hover:text-[#19C8F5] transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Prev / Next controls */}
                {onPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#061A3A]/80 border border-[#1769FF]/40 text-white hover:text-[#19C8F5] transition-colors hidden sm:block"
                        aria-label="Previous item"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}
                {onNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#061A3A]/80 border border-[#1769FF]/40 text-white hover:text-[#19C8F5] transition-colors hidden sm:block"
                        aria-label="Next item"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#041228] border border-[#1769FF]/30 rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Media container */}
                    <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[72vh]">
                        {item.media_type === 'video' && item.video_url ? (
                            <div className="w-full aspect-video">
                                {item.video_url.includes('youtube') || item.video_url.includes('youtu.be') ? (
                                    <iframe
                                        src={item.video_url.replace('watch?v=', 'embed/')}
                                        title={item.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={item.video_url}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        ) : (
                            <img
                                src={item.file_path || item.featured_image}
                                alt={item.title}
                                className="max-h-[72vh] w-auto max-w-full object-contain select-none"
                            />
                        )}
                    </div>

                    {/* Metadata bar */}
                    <div className="p-4 sm:p-6 bg-[#041228] border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <span className="text-xs uppercase tracking-wider font-semibold text-[#19C8F5]">
                                {item.category?.name || 'DigitalJao Showcase'}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{item.title}</h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                            {item.client_name && (
                                <span className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-[#1769FF]" />
                                    {item.client_name}
                                </span>
                            )}
                            {item.location && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#19C8F5]" />
                                    {item.location}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
