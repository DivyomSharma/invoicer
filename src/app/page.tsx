import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { CursorBackground } from '@/components/landing/CursorBackground';

export default function Home() {
    return (
        <main className="min-h-screen relative">
            <CursorBackground />
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </main>
    );
}
