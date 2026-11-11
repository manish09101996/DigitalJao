import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (windowHeight > 0) {
                const scroll = (totalScroll / windowHeight) * 100;
                setProgress(scroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-[#1769FF] to-[#19C8F5] transition-all duration-75 shadow-[0_0_12px_#19C8F5]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
