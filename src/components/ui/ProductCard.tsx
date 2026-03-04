"use client";

import React, { useState } from 'react';
// ============================================================
// PRODUCT CARD COMPONENT
// Reusable card for displaying products in grids
// ============================================================
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, StarIcon, EyeIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/wishlistSlice';
import { Badge } from './Badge';
import type { Product } from '../../types';
interface ProductCardProps {
  product: Product;
  index?: number; // For staggered animation
}
export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart(product));
  };
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.08
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <Link href={`/product/${product.id}`} className="block group">
        <div className="product-card">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 h-64">
            {/* Loading skeleton */}
            {!imageLoaded && <div className="absolute inset-0 skeleton" />}

            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              animate={{
                scale: isHovered ? 1.06 : 1
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut'
              }} />


            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.isBestSeller &&
                <Badge variant="bestseller">Best Seller</Badge>
              }
              {product.isFlashDeal && <Badge variant="flash">Flash Deal</Badge>}
              {!product.inStock &&
                <Badge variant="outofstock">Out of Stock</Badge>
              }
            </div>

            {/* Discount badge */}
            {product.discount > 0 &&
              <div className="absolute top-3 right-3 bg-orange text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            }

            {/* Hover action buttons */}
            <motion.div
              className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{
                duration: 0.2
              }}>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-forest text-white text-xs font-body font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 hover:bg-forest-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Add ${product.name} to cart`}>

                <ShoppingCartIcon className="w-3.5 h-3.5" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-forest hover:bg-red-50 hover:text-red-500'}`}
                aria-label={
                  isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }>

                <HeartIcon
                  className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />

              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs font-body text-orange font-semibold uppercase tracking-wider mb-1">
              {product.category} · {product.subcategory}
            </p>

            {/* Name */}
            <h3 className="font-heading text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-forest transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) =>
                  <StarIcon
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />

                )}
              </div>
              <span className="text-xs font-body text-gray-500">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-forest">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price &&
                <span className="text-sm font-body text-gray-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              }
            </div>
          </div>
        </div>
      </Link>
    </motion.div>);

}