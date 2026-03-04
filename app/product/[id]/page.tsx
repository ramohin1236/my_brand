'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    StarIcon,
    HeartIcon,
    ShoppingCartIcon,
    TruckIcon,
    ShieldCheckIcon,
    RotateCcwIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
    MinusIcon,
    CheckIcon
} from 'lucide-react';
import productsData from '@/data/products.json';
import { ProductCard } from '@/components/ui/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/wishlistSlice';
import type { Product } from '@/types';

const allProducts = productsData as Product[];

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const product = useMemo(() => allProducts.find((p) => p.id === id), [id]);
    const isInWishlist = useAppSelector(selectIsInWishlist(product?.id || ''));

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'dimensions'>('description');

    const relatedProducts = useMemo(
        () => allProducts.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4),
        [product, id]
    );

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="text-center">
                    <p className="font-heading text-2xl text-gray-400 mb-3">Product not found</p>
                    <Link href="/products" className="text-forest font-body text-sm hover:text-orange transition-colors">
                        ← Back to products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    const savings = product.originalPrice - product.price;

    return (
        <div className="min-h-screen bg-cream">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-xs font-body text-gray-400">
                        <Link href="/" className="hover:text-forest transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-forest transition-colors capitalize">
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-forest font-medium line-clamp-1">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden bg-white shadow-card aspect-square">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={product.images[activeImage]}
                                    alt={`${product.name} - image ${activeImage + 1}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.isNew && <Badge variant="new">New</Badge>}
                                {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                                {product.isFlashDeal && <Badge variant="flash">Flash Deal</Badge>}
                            </div>

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                    >
                                        <ChevronLeftIcon className="w-4 h-4 text-forest" />
                                    </button>
                                    <button
                                        onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                    >
                                        <ChevronRightIcon className="w-4 h-4 text-forest" />
                                    </button>
                                </>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${i === activeImage ? 'ring-2 ring-forest ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-3">
                            {product.category} · {product.subcategory}
                        </p>
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="font-body text-sm text-gray-600">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="font-heading text-4xl font-bold text-forest">
                                ৳{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="font-body text-lg text-gray-400 line-through">
                                    ৳{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                            {product.discount > 0 && (
                                <span className="bg-orange/10 text-orange font-body text-sm font-bold px-2 py-0.5 rounded">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                        {savings > 0 && (
                            <p className="font-body text-sm text-green-600 mb-6">
                                You save ৳{savings.toLocaleString()}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="text-xs font-body bg-forest/5 text-forest px-3 py-1.5 rounded-full">
                                Material: {product.material}
                            </span>
                            <span className="text-xs font-body bg-forest/5 text-forest px-3 py-1.5 rounded-full">
                                {product.dimensions.width}W × {product.dimensions.height}H × {product.dimensions.depth}D cm
                            </span>
                            <span className="text-xs font-body bg-forest/5 text-forest px-3 py-1.5 rounded-full">
                                {product.weight} kg
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-body text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-forest hover:bg-forest/5 transition-colors"
                                >
                                    <MinusIcon className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-body font-semibold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-forest hover:bg-forest/5 transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                whileTap={{ scale: 0.97 }}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded font-body font-semibold text-sm transition-all ${addedToCart ? 'bg-green-600 text-white' : product.inStock ? 'bg-forest text-white hover:bg-forest-light shadow-luxury hover:shadow-luxury-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                {addedToCart ? (
                                    <>
                                        <CheckIcon className="w-4 h-4" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCartIcon className="w-4 h-4" />
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </>
                                )}
                            </motion.button>

                            <button
                                onClick={() => dispatch(toggleWishlist(product))}
                                className={`w-14 h-14 rounded border-2 flex items-center justify-center transition-all ${isInWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'}`}
                            >
                                <HeartIcon className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-forest/5 rounded-xl">
                            <div className="flex flex-col items-center text-center gap-1.5">
                                <TruckIcon className="w-5 h-5 text-forest" />
                                <span className="text-xs font-body text-gray-600">Free Delivery above ₹5K</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-1.5">
                                <ShieldCheckIcon className="w-5 h-5 text-forest" />
                                <span className="text-xs font-body text-gray-600">2 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-1.5">
                                <RotateCcwIcon className="w-5 h-5 text-forest" />
                                <span className="text-xs font-body text-gray-600">30-Day Returns</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex border-b border-gray-200 mb-5">
                                {(['description', 'features', 'dimensions'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2.5 text-sm font-body font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-forest text-forest' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'description' && <p className="font-body text-sm text-gray-600 leading-relaxed">{product.description}</p>}
                                    {activeTab === 'features' && (
                                        <ul className="space-y-2">
                                            {product.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-gray-600">
                                                    <CheckIcon className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {activeTab === 'dimensions' && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-forest/5 rounded-lg p-3 text-center">
                                                    <p className="font-heading text-lg font-bold text-forest">{product.dimensions.width}</p>
                                                    <p className="text-xs font-body text-gray-500">Width (cm)</p>
                                                </div>
                                                <div className="bg-forest/5 rounded-lg p-3 text-center">
                                                    <p className="font-heading text-lg font-bold text-forest">{product.dimensions.height}</p>
                                                    <p className="text-xs font-body text-gray-500">Height (cm)</p>
                                                </div>
                                                <div className="bg-forest/5 rounded-lg p-3 text-center">
                                                    <p className="font-heading text-lg font-bold text-forest">{product.dimensions.depth}</p>
                                                    <p className="text-xs font-body text-gray-500">Depth (cm)</p>
                                                </div>
                                            </div>
                                            <p className="text-xs font-body text-gray-500">Weight: {product.weight} kg</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <section aria-labelledby="related-heading">
                        <div className="mb-8">
                            <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-2">You Might Also Like</p>
                            <h2 id="related-heading" className="font-heading text-3xl font-bold text-forest">Related Products</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
