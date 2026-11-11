import { usePage } from '@inertiajs/react';

export default function ApplicationLogo({ className = 'h-10 w-auto' }) {
    const { settings, logo_url } = usePage().props;
    const logoSrc = settings?.site_logo || logo_url || (typeof window !== 'undefined' && window.Ziggy ? `${window.Ziggy.url}/images/digitaljao-logo.png` : '/images/digitaljao-logo.png');

    return (
        <img
            src={logoSrc}
            alt="DigitalJao"
            className={`object-contain transition-transform duration-300 ${className}`}
        />
    );
}
