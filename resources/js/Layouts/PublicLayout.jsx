import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SmoothScroll from '@/Components/SmoothScroll';
import CustomCursor from '@/Components/CustomCursor';
import ScrollProgress from '@/Components/ScrollProgress';
import FlashMessage from '@/Components/FlashMessage';
import WhatsAppButton from '@/Components/WhatsAppButton';

export default function PublicLayout({ children, title, description, image }) {
    const { settings } = usePage().props;
    const siteTitle = title ? `${title} | DigitalJao` : (settings?.meta_title || 'DigitalJao | Your Brand Deserves to Be Seen');
    const metaDesc = description || (settings?.meta_description || 'Strategy, creativity and execution – all in one place. Premier digital marketing agency and cinematic production studio.');
    const ogImage = image || (settings?.site_logo || '/images/digitaljao-logo.jpg');

    return (
        <SmoothScroll>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content={ogImage} />
            </Head>

            <CustomCursor />
            <ScrollProgress />
            <FlashMessage />

            <div className="min-h-screen flex flex-col bg-[#030E1F] text-slate-100 selection:bg-[#1769FF] selection:text-white">
                <Navbar />
                <main className="flex-1 pt-20">
                    {children}
                </main>
                <WhatsAppButton />
                <Footer />
            </div>
        </SmoothScroll>
    );
}
