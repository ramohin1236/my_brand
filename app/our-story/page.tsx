'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LeafIcon, UsersIcon, AwardIcon, HeartIcon } from 'lucide-react';

const MILESTONES = [
    {
        year: '1996',
        title: 'The First Workshop',
        body: 'Karim Uddin opens a small wood carving workshop in Rajshahi with two apprentices and a single hand-lathe.'
    },
    {
        year: '2005',
        title: 'The Collective Forms',
        body: 'Five artisans from across Bangladesh join forces, combining wood, bamboo, and cane expertise under one roof.'
    },
    {
        year: '2012',
        title: 'Going Digital',
        body: 'NatureCraft launches its first online catalogue, bringing Bangladeshi craft to customers in Dhaka and Chattogram.'
    },
    {
        year: '2018',
        title: 'National Recognition',
        body: 'Awarded the Bangladesh Craft Excellence Award for preserving and modernizing traditional furniture-making techniques.'
    },
    {
        year: '2024',
        title: 'Delivering Nationwide',
        body: 'Now delivering to every district in Bangladesh, with a community of 40+ artisans and 10,000+ happy homes.'
    }
];

const VALUES = [
    {
        Icon: LeafIcon,
        title: 'Sustainably Sourced',
        body: 'Every material is harvested from managed forests and bamboo groves, replanted annually.'
    },
    {
        Icon: UsersIcon,
        title: 'Community First',
        body: 'We employ artisans from rural Bangladesh, paying fair wages and providing skill training.'
    },
    {
        Icon: AwardIcon,
        title: 'Craft Excellence',
        body: 'Each piece undergoes a 12-point quality check before leaving our workshops.'
    },
    {
        Icon: HeartIcon,
        title: 'Made with Love',
        body: 'No machines, no shortcuts. Every joint, weave, and finish is done by human hands.'
    }
];

export default function OurStoryPage() {
    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
                    alt="NatureCraft workshop"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-orange font-body text-sm font-semibold uppercase tracking-widest mb-3"
                        >
                            Since 1996
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading text-5xl md:text-6xl font-bold text-white mb-4"
                        >
                            Our Story
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="font-body text-white/80 text-xl max-w-lg"
                        >
                            From a single workshop in Rajshahi to Bangladesh's most loved craft furniture brand.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-2">What We Stand For</p>
                    <h2 className="font-heading text-4xl font-bold text-forest dark:text-white">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {VALUES.map(({ Icon, title, body }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-card text-center"
                        >
                            <div className="w-14 h-14 bg-forest/10 dark:bg-forest/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon className="w-7 h-7 text-forest dark:text-green-400" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-forest dark:text-white mb-2">{title}</h3>
                            <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-forest text-white py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-2">Our Journey</p>
                        <h2 className="font-heading text-4xl font-bold">Milestones</h2>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />
                        <div className="space-y-10">
                            {MILESTONES.map(({ year, title, body }, i) => (
                                <motion.div
                                    key={year}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 pl-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange rounded-full flex items-center justify-center text-white font-heading font-bold text-xs z-10">
                                        {year.slice(2)}
                                    </div>
                                    <div className="pt-1.5">
                                        <p className="text-orange font-body text-xs font-semibold mb-0.5">{year}</p>
                                        <h3 className="font-heading text-lg font-bold text-white mb-1">{title}</h3>
                                        <p className="font-body text-sm text-white/70 leading-relaxed">{body}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="font-heading text-3xl font-bold text-forest dark:text-white mb-4">Meet the People Behind the Craft</h2>
                <p className="font-body text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                    Every piece has a maker. Discover the artisans whose hands and hearts go into every NatureCraft product.
                </p>
                <Link href="/artisans" className="inline-flex items-center gap-2 bg-forest text-white font-body font-semibold px-8 py-4 rounded hover:bg-forest-light transition-colors">
                    Meet Our Artisans →
                </Link>
            </section>
        </div>
    );
}
