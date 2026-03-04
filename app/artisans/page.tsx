'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import artisansData from '@/data/artisans.json';
import { ArtisanCard } from '@/components/artisan/ArtisanCard';
import type { Artisan } from '@/types';

const artisans = artisansData as Artisan[];
const SPECIALTIES = ['All', 'Wood', 'Bamboo', 'Cane'] as const;

export default function ArtisansPage() {
    const [filter, setFilter] = useState<string>('All');
    const filtered = filter === 'All' ? artisans : artisans.filter((a) => a.specialty === filter);

    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900">
            {/* Hero banner */}
            <div className="bg-forest text-white py-20 px-4 text-center relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=40)',
                        backgroundSize: 'cover'
                    }}
                />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-orange font-body text-sm font-semibold uppercase tracking-widest mb-3"
                    >
                        The Hands Behind the Craft
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-4xl md:text-5xl font-bold mb-4"
                    >
                        Our Artisans
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="font-body text-white/75 text-lg"
                    >
                        Every piece carries the story of a master craftsperson. Meet the people who make NatureCraft possible.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter tabs */}
                <div className="flex items-center gap-2 flex-wrap mb-10">
                    {SPECIALTIES.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${filter === s ? 'bg-forest text-white shadow-luxury' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-forest hover:text-forest'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((artisan, i) => (
                        <ArtisanCard key={artisan.id} artisan={artisan} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
