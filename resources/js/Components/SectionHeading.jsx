import { motion } from 'framer-motion';

export default function SectionHeading({
    badge,
    title,
    highlight,
    subtitle,
    align = 'center',
    className = '',
}) {
    const isCenter = align === 'center';

    return (
        <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1769FF]/10 text-[#19C8F5] border border-[#1769FF]/30 mb-4 shadow-[0_0_15px_rgba(25,200,245,0.15)]`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19C8F5] animate-ping" />
                    {badge}
                </motion.div>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight"
            >
                {title}{' '}
                {highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#19C8F5] to-white">
                        {highlight}
                    </span>
                )}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
