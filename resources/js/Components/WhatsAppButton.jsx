import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const { settings } = usePage().props;
    const whatsappNumber = settings?.contact_whatsapp || '+919876543210';
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

    const message = encodeURIComponent("Hi DigitalJao! I'm interested in scaling my brand with your marketing & production services.");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with DigitalJao"
            className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline-block pr-1">Chat on WhatsApp</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        </a>
    );
}
