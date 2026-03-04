"use client";

import React, { useState } from 'react';
// ============================================================
// BEST SELLERS SECTION
// Displays top-selling products in a responsive grid
// ============================================================

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import productsData from '../../data/products.json';
import { ProductCard } from '../ui/ProductCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import type { Product } from '../../types';
const products = productsData as Product[];
export function BestSellers() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'Wood' | 'Bamboo' | 'Cane'>(
      'all');
  const [isLoading] = useState(false);
  // Filter best sellers by category
  const bestSellers = products.filter((p) => p.isBestSeller);
  const filtered =
    activeFilter === 'all' ?
      bestSellers :
      bestSellers.filter((p) => p.category === activeFilter);
  const filters: Array<{
    label: string;
    value: 'all' | 'Wood' | 'Bamboo' | 'Cane';
  }> = [
      {
        label: 'All',
        value: 'all'
      },
      {
        label: 'Wood',
        value: 'Wood'
      },
      {
        label: 'Bamboo',
        value: 'Bamboo'
      },
      {
        label: 'Cane',
        value: 'Cane'
      }];

  return (
    <section className="py-20 bg-white" aria-labelledby="bestsellers-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">

          <div>
            <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase mb-3">
              Customer Favourites
            </p>
            <h2
              id="bestsellers-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-forest">

              Best Sellers
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) =>
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 text-sm font-body font-medium rounded transition-all ${activeFilter === filter.value ? 'bg-forest text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>

                {filter.label}
              </button>
            )}
          </div>
        </motion.div>

        {/* Products grid */}
        {isLoading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) =>
              <SkeletonCard key={i} />
            )}
          </div> :

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filtered.slice(0, 8).map((product, index) =>
              <ProductCard key={product.id} product={product} index={index} />
            )}
          </motion.div>
        }

        {/* View all CTA */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          className="text-center mt-12">

          <Link
            href="/products?filter=bestseller"
            className="inline-flex items-center gap-2 font-body font-semibold text-forest hover:text-orange transition-colors group">

            View All Best Sellers
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>);

}