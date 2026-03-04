'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SlidersHorizontalIcon,
    XIcon,
} from 'lucide-react';
import productsData from '@/data/products.json';
import { ProductCard } from '@/components/ui/ProductCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { Product } from '@/types';

const allProducts = productsData as Product[];
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function ProductListingPage() {
    const params = useParams();
    const category = params.category as string | undefined;
    const searchParams = useSearchParams();
    const filterParam = searchParams.get('filter');
    const subParam = searchParams.get('sub');

    // Filter state
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        category ? [category.charAt(0).toUpperCase() + category.slice(1)] : []
    );
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isLoading] = useState(false);

    // Add size and color filter state
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    // Get page title
    const pageTitle = category ?
        `${category.charAt(0).toUpperCase() + category.slice(1)} Furniture` :
        filterParam === 'bestseller' ?
            'Best Sellers' :
            filterParam === 'new' ?
                'New Arrivals' :
                'All Products';

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];
        if (selectedCategories.length > 0) {
            result = result.filter((p) =>
                selectedCategories.some(
                    (c) => c.toLowerCase() === p.category.toLowerCase()
                )
            );
        }
        if (subParam) {
            const sub = subParam.replace(/-/g, ' ');
            result = result.filter((p) =>
                p.subcategory.toLowerCase().includes(sub.toLowerCase())
            );
        }
        if (filterParam === 'bestseller')
            result = result.filter((p) => p.isBestSeller);
        if (filterParam === 'new') result = result.filter((p) => p.isNew);
        if (filterParam === 'sale') result = result.filter((p) => p.discount > 0);
        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
        if (inStockOnly) result = result.filter((p) => p.inStock);
        if (selectedSizes.length > 0)
            result = result.filter((p) =>
                p.sizes?.some((s) => selectedSizes.includes(s))
            );
        if (selectedColors.length > 0)
            result = result.filter((p) =>
                p.colors?.some((c) => selectedColors.includes(c))
            );

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result = result.
                    filter((p) => p.isNew).
                    concat(result.filter((p) => !p.isNew));
                break;
            default:
                result.sort(
                    (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
                );
        }
        return result;
    }, [
        selectedCategories,
        priceRange,
        inStockOnly,
        sortBy,
        filterParam,
        subParam,
        selectedSizes,
        selectedColors
    ]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const ALL_SIZES = ['S', 'M', 'L', 'XL', '2-Seater', '3-Seater', 'Single', 'Double', 'King'];
    const ALL_COLORS = ['#8B4513', '#D2691E', '#F5DEB3', '#228B22', '#2F4F4F', '#000000', '#FFFFFF', '#C0C0C0'];

    const toggleSize = (s: string) =>
        setSelectedSizes((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    const toggleColor = (c: string) =>
        setSelectedColors((prev) =>
            prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
        );

    const FilterSidebar = () => (
        <div className="space-y-7">
            <div>
                <h3 className="font-heading text-sm font-semibold text-forest dark:text-white mb-3 uppercase tracking-wider">
                    Category
                </h3>
                <div className="space-y-2">
                    {['Wood', 'Bamboo', 'Cane'].map((cat) => (
                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                                className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest/30 cursor-pointer"
                            />
                            <span className="font-body text-sm text-gray-700 dark:text-gray-300 group-hover:text-forest transition-colors">
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-heading text-sm font-semibold text-forest dark:text-white mb-3 uppercase tracking-wider">
                    Price Range
                </h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min={0}
                        max={3000}
                        step={50}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full"
                        aria-label="Maximum price"
                    />
                    <div className="flex justify-between text-xs font-body text-gray-500 dark:text-gray-400">
                        <span>৳{priceRange[0].toLocaleString()}</span>
                        <span>৳{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-heading text-sm font-semibold text-forest dark:text-white mb-3 uppercase tracking-wider">
                    Size
                </h3>
                <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((s) => (
                        <button
                            key={s}
                            onClick={() => toggleSize(s)}
                            className={`px-3 py-1.5 text-xs font-body font-medium rounded border transition-all ${selectedSizes.includes(s) ? 'bg-forest text-white border-forest' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-forest hover:text-forest'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-heading text-sm font-semibold text-forest dark:text-white mb-3 uppercase tracking-wider">
                    Color
                </h3>
                <div className="flex flex-wrap gap-2">
                    {ALL_COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            aria-label={`Filter by color ${color}`}
                            style={{ backgroundColor: color }}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color) ? 'border-forest scale-110 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:scale-105'}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest/30 cursor-pointer"
                    />
                    <span className="font-body text-sm text-gray-700 dark:text-gray-300 group-hover:text-forest transition-colors">
                        In Stock Only
                    </span>
                </label>
            </div>

            <button
                onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 3000]);
                    setInStockOnly(false);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                }}
                className="text-xs font-body text-orange hover:text-orange-dark transition-colors underline"
            >
                Reset all filters
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream">
            {/* Page header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs font-body text-gray-400 mb-4">
                        <Link href="/" className="hover:text-forest transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-forest font-medium">{pageTitle}</span>
                    </nav>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest">
                        {pageTitle}
                    </h1>
                    <p className="font-body text-gray-500 mt-2 text-sm">
                        {filteredProducts.length} products found
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Desktop filter sidebar */}
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-xl p-6 shadow-card">
                            <h2 className="font-heading text-base font-semibold text-forest mb-6">
                                Filters
                            </h2>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                            {/* Mobile filter toggle */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-sm font-body font-medium text-forest border border-forest/20 px-4 py-2 rounded hover:bg-forest/5 transition-colors"
                            >
                                <SlidersHorizontalIcon className="w-4 h-4" />
                                Filters
                            </button>

                            {/* Sort */}
                            <div className="flex items-center gap-2 ml-auto">
                                <label htmlFor="sort" className="text-xs font-body text-gray-500 whitespace-nowrap">
                                    Sort by:
                                </label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="text-sm font-body border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest/30 bg-white text-gray-700"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Products grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="font-heading text-2xl text-gray-400 mb-3">
                                    No products found
                                </p>
                                <p className="font-body text-gray-500 text-sm">
                                    Try adjusting your filters
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile filter drawer */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMobileFilterOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 p-6 overflow-y-auto shadow-luxury-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-heading text-lg font-semibold text-forest">
                                    Filters
                                </h2>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <FilterSidebar />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
