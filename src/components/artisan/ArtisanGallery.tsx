"use client";

import React, { useState } from 'react';
// ============================================================
// ARTISAN GALLERY — lightbox-style image grid
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface ArtisanGalleryProps {
  images: string[];
  artisanName: string;
}
export function ArtisanGallery({ images, artisanName }: ArtisanGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : 0
    );
  const next = () =>
    setLightboxIndex((i) => i !== null ? (i + 1) % images.length : 0);
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) =>
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-square rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-forest"
            aria-label={`View image ${i + 1}`}>

            <img
              src={img}
              alt={`${artisanName} work ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />

          </button>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 p-2 text-white/70 hover:text-white">

              <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{
                scale: 0.9,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              src={images[lightboxIndex]}
              alt={`${artisanName} work ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()} />

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 p-2 text-white/70 hover:text-white">

              <ChevronRightIcon className="w-8 h-8" />
            </button>
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white">

              <XIcon className="w-6 h-6" />
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}