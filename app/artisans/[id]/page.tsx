'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    MapPinIcon,
    AwardIcon,
    InstagramIcon,
    ArrowLeftIcon
} from 'lucide-react';
import artisansData from '@/data/artisans.json';
import { ArtisanGallery } from '@/components/artisan/ArtisanGallery';
import { SocialShareBar } from '@/components/artisan/SocialShareBar';
import type { Artisan } from '@/types';

const artisans = artisansData as Artisan[];

export default function ArtisanDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const artisan = artisans.find((a) => a.id === id);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    if (!artisan) {
        return (
            <div className="min-h-screen bg-cream dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="font-heading text-2xl text-gray-400 mb-3">Artisan not found</p>
                    <Link href="/artisans" className="text-forest font-body text-sm hover:text-orange">
                        ← Back to Artisans
                    </Link>
                </div>
            </div>
        );
    }

    const pageUrl = `${origin}/artisans/${artisan.id}`;

    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900">
            {/* Cover hero */}
            <div className="relative h-[50vh] min-h-[340px] overflow-hidden">
                <img src={artisan.coverImage} alt={artisan.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <Link href="/artisans" className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm font-body transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" /> All Artisans
                </Link>
                <div className="absolute bottom-8 left-0 right-0 px-6 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-2">{artisan.specialty} Specialist</p>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">{artisan.name}</h1>
                        <p className="font-body text-white/80 text-lg">{artisan.title}</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
                            <img src={artisan.avatar} alt={artisan.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange/30" />
                            <h2 className="font-heading text-xl font-bold text-forest dark:text-white mb-1">{artisan.name}</h2>
                            <p className="font-body text-sm text-orange font-medium mb-3">{artisan.title}</p>
                            <div className="space-y-2 text-sm font-body text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="w-4 h-4 text-forest flex-shrink-0" />
                                    {artisan.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <AwardIcon className="w-4 h-4 text-forest flex-shrink-0" />
                                    {artisan.experience} years of experience
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-4">
                                {artisan.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-body bg-forest/10 dark:bg-forest/20 text-forest dark:text-green-300 px-2.5 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {artisan.instagram && (
                                <a href={`https://instagram.com/${artisan.instagram}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-sm font-body text-gray-500 hover:text-orange transition-colors">
                                    <InstagramIcon className="w-4 h-4" /> @{artisan.instagram}
                                </a>
                            )}
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
                            <p className="font-heading text-sm font-semibold text-forest dark:text-white mb-3">Share this story</p>
                            <SocialShareBar url={pageUrl} title={`${artisan.name} — ${artisan.title}`} description={artisan.shortBio} image={artisan.coverImage} />
                        </div>
                    </aside>

                    <div className="lg:col-span-2 space-y-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
                            <h2 className="font-heading text-2xl font-bold text-forest dark:text-white mb-5">The Story</h2>
                            <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed text-base">{artisan.fullStory}</p>
                        </motion.div>

                        {artisan.gallery.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
                                <h2 className="font-heading text-2xl font-bold text-forest dark:text-white mb-5">Gallery</h2>
                                <ArtisanGallery images={artisan.gallery} artisanName={artisan.name} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
