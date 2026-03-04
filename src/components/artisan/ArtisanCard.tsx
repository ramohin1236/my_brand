"use client";

import React from 'react';
// ============================================================
// ARTISAN CARD — listing card for artisans page
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPinIcon, AwardIcon, ArrowRightIcon } from 'lucide-react';
import type { Artisan } from '../../types';
interface ArtisanCardProps {
  artisan: Artisan;
  index?: number;
}
const SPECIALTY_COLORS: Record<string, string> = {
  Wood: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Bamboo:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Cane: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
};
export function ArtisanCard({ artisan, index = 0 }: ArtisanCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.1
      }}>

      <Link href={`/artisans/${artisan.id}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-shadow duration-300">
          {/* Cover image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={artisan.coverImage}
              alt={artisan.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {artisan.featured &&
              <span className="absolute top-3 right-3 bg-orange text-white text-xs font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <AwardIcon className="w-3 h-3" /> Featured
              </span>
            }
            {/* Avatar */}
            <div className="absolute bottom-0 left-5 translate-y-1/2">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg" />

            </div>
          </div>

          {/* Content */}
          <div className="pt-10 px-5 pb-5">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-heading text-lg font-bold text-forest dark:text-white group-hover:text-orange transition-colors">
                {artisan.name}
              </h3>
              <span
                className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${SPECIALTY_COLORS[artisan.specialty]}`}>

                {artisan.specialty}
              </span>
            </div>
            <p className="font-body text-sm text-orange font-medium mb-2">
              {artisan.title}
            </p>
            <div className="flex items-center gap-1 text-xs font-body text-gray-500 dark:text-gray-400 mb-3">
              <MapPinIcon className="w-3.5 h-3.5" />
              {artisan.location} · {artisan.experience} yrs experience
            </div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
              {artisan.shortBio}
            </p>
            <div className="flex items-center gap-1.5 text-sm font-body font-semibold text-forest dark:text-orange group-hover:gap-3 transition-all">
              Read Story <ArrowRightIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>);

}