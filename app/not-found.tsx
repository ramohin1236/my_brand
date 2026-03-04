'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon, ShoppingBagIcon, UsersIcon } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-8xl mb-6"
                >
                    🪵
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-orange font-body text-sm font-semibold uppercase tracking-widest mb-3">Page Not Found</p>
                    <h1 className="font-heading text-5xl font-bold text-forest dark:text-white mb-4">
                        Our Artisans Are
                        <br />
                        Working On It
                    </h1>
                    <p className="font-body text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
                        This page is still being crafted with the same care and attention as our furniture. Check back soon — good things take time.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link href="/" className="flex items-center gap-2 bg-forest text-white font-body font-semibold px-6 py-3 rounded hover:bg-forest-light transition-colors">
                        <HomeIcon className="w-4 h-4" /> Back to Home
                    </Link>
                    <Link href="/products" className="flex items-center gap-2 border-2 border-forest text-forest dark:text-white dark:border-white font-body font-semibold px-6 py-3 rounded hover:bg-forest hover:text-white transition-all">
                        <ShoppingBagIcon className="w-4 h-4" /> Browse Products
                    </Link>
                    <Link href="/artisans" className="flex items-center gap-2 text-sm font-body text-gray-500 dark:text-gray-400 hover:text-forest dark:hover:text-orange transition-colors">
                        <UsersIcon className="w-4 h-4" /> Meet Artisans
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
