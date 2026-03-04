import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedCategories } from '@/components/sections/FeaturedCategories';
import { BestSellers } from '@/components/sections/BestSellers';
import { OurStory } from '@/components/sections/OurStory';
import { FlashDeals } from '@/components/sections/FlashDeals';
import { Testimonials } from '@/components/sections/Testimonials';
import { Newsletter } from '@/components/sections/Newsletter';
import { InstagramGrid } from '@/components/sections/InstagramGrid';

export const metadata: Metadata = {
    title: "NatureCraft — Luxury Wood, Bamboo & Cane Furniture",
    description: "Discover handcrafted luxury furniture in wood, bamboo, and cane. Sustainably sourced, artisan-made pieces for the discerning home. Free shipping on orders above ₹5,000.",
    openGraph: {
        title: "NatureCraft — Where Nature Meets Craft",
        description: "Handcrafted luxury furniture from sustainably sourced wood, bamboo, and cane. Each piece tells a story of artisan skill and nature's beauty.",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"],
    },
    keywords: ["luxury furniture", "wood furniture", "bamboo furniture", "cane furniture", "handcrafted", "sustainable", "artisan", "India"],
};

export default function Home() {
    return (
        <main>
            <HeroSection />
            <FeaturedCategories />
            <BestSellers />
            <OurStory />
            <FlashDeals />
            <Testimonials />
            <Newsletter />
            <InstagramGrid />
        </main>
    );
}
