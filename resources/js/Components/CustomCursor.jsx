import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices or reduced motion
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, select, textarea, .hover-target');
            setIsHovered(!!target);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {/* Small center dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#19C8F5]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovered ? 0 : 1,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
            />
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full border border-[#1769FF] bg-[#1769FF]/10 backdrop-blur-[1px]"
                animate={{
                    x: mousePosition.x - (isHovered ? 24 : 16),
                    y: mousePosition.y - (isHovered ? 24 : 16),
                    width: isHovered ? 48 : 32,
                    height: isHovered ? 48 : 32,
                    borderColor: isHovered ? '#19C8F5' : 'rgba(23, 105, 255, 0.6)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.15 }}
            />
        </div>
    );
}
