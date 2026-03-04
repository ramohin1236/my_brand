"use client";

import React, { useEffect, useState } from 'react';
// ============================================================
// NAVBAR COMPONENT
// Luxury mega-menu navigation with categories/subcategories
// ============================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCartIcon,
  HeartIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon
} from
  'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleCart } from '../../store/cartSlice';
import { selectCartCount } from '../../store/cartSlice';
import { selectWishlistCount } from '../../store/wishlistSlice';
// Mega menu data structure
const CATEGORIES = [
  {
    name: 'Wood',
    href: '/category/wood',
    description: 'Solid hardwood furniture crafted to last generations',
    subcategories: [
      {
        name: 'Dining Tables',
        href: '/category/wood?sub=dining-tables'
      },
      {
        name: 'Chairs',
        href: '/category/wood?sub=chairs'
      },
      {
        name: 'Shelves',
        href: '/category/wood?sub=shelves'
      },
      {
        name: 'Bed Frames',
        href: '/category/wood?sub=bed-frames'
      }],

    featured: {
      name: 'Artisan Oak Dining Table',
      image:
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80',
      href: '/product/wood-001'
    }
  },
  {
    name: 'Bamboo',
    href: '/category/bamboo',
    description: 'Sustainable bamboo pieces for eco-conscious living',
    subcategories: [
      {
        name: 'Baskets',
        href: '/category/bamboo?sub=baskets'
      },
      {
        name: 'Trays',
        href: '/category/bamboo?sub=trays'
      },
      {
        name: 'Lamps',
        href: '/category/bamboo?sub=lamps'
      },
      {
        name: 'Room Dividers',
        href: '/category/bamboo?sub=room-dividers'
      }],

    featured: {
      name: 'Pendant Bamboo Lamp',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      href: '/product/bamboo-003'
    }
  },
  {
    name: 'Cane',
    href: '/category/cane',
    description: 'Hand-woven cane furniture with timeless elegance',
    subcategories: [
      {
        name: 'Sofas',
        href: '/category/cane?sub=sofas'
      },
      {
        name: 'Armchairs',
        href: '/category/cane?sub=armchairs'
      },
      {
        name: 'Coffee Tables',
        href: '/category/cane?sub=coffee-tables'
      },
      {
        name: 'Outdoor Sets',
        href: '/category/cane?sub=outdoor-sets'
      }],

    featured: {
      name: 'Peacock Cane Armchair',
      image:
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80',
      href: '/product/cane-002'
    }
  }];

export function Navbar() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);
  // Helper: is this path active?
  const isActive = (path: string) =>
    path === '/' ?
      pathname === '/' :
      pathname.startsWith(path);
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-luxury border-b border-gray-100 dark:border-gray-800' : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'}`}>

        {/* Top announcement bar */}
        <div className="bg-forest text-white text-xs font-body text-center py-2 px-4">
          🌿 Free shipping on orders above ৳5,000 · Delivering across Bangladesh
        </div>

        {/* Main navbar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-forest rounded flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">
                  N
                </span>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-forest dark:text-white leading-none block">
                  NatureCraft
                </span>
                <span className="text-xs font-body text-gray-400 dark:text-gray-500 tracking-widest uppercase leading-none">
                  Luxury Living
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-body font-medium transition-colors ${isActive('/') ? 'text-forest dark:text-orange font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange'}`}>

                Home
              </Link>

              {CATEGORIES.map((category) =>
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(category.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}>

                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors ${isActive(`/category/${category.name.toLowerCase()}`) ? 'text-forest dark:text-orange font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange'}`}>

                    {category.name}
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === category.name ? 'rotate-180' : ''}`} />

                  </button>
                  {/* Mega Menu — unchanged */}
                  <AnimatePresence>
                    {activeMegaMenu === category.name &&
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        exit={{
                          opacity: 0,
                          y: -8
                        }}
                        transition={{
                          duration: 0.15
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-white dark:bg-gray-800 rounded-xl shadow-luxury-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

                        <div className="p-6 grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-body font-semibold text-orange uppercase tracking-wider mb-3">
                              Browse {category.name}
                            </p>
                            <p className="text-xs font-body text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                              {category.description}
                            </p>
                            <ul className="space-y-2">
                              {category.subcategories.map((sub) =>
                                <li key={sub.name}>
                                  <Link
                                    href={sub.href}
                                    className="text-sm font-body text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange hover:translate-x-1 transition-all inline-flex items-center gap-1.5">

                                    <span className="w-1 h-1 rounded-full bg-orange inline-block" />
                                    {sub.name}
                                  </Link>
                                </li>
                              )}
                            </ul>
                            <Link
                              href={category.href}
                              className="mt-4 inline-flex items-center text-xs font-body font-semibold text-forest dark:text-orange hover:text-orange transition-colors">

                              View all {category.name} →
                            </Link>
                          </div>
                          <div>
                            <p className="text-xs font-body font-semibold text-orange uppercase tracking-wider mb-3">
                              Featured
                            </p>
                            <Link
                              href={category.featured.href}
                              className="block group">

                              <div className="rounded-lg overflow-hidden mb-2">
                                <img
                                  src={category.featured.image}
                                  alt={category.featured.name}
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />

                              </div>
                              <p className="text-sm font-heading font-semibold text-gray-900 dark:text-white group-hover:text-forest transition-colors">
                                {category.featured.name}
                              </p>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              )}

              <Link
                href="/products"
                className={`px-4 py-2 text-sm font-body font-medium transition-colors ${isActive('/products') ? 'text-forest dark:text-orange font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange'}`}>

                All Products
              </Link>
              <Link
                href="/artisans"
                className={`px-4 py-2 text-sm font-body font-medium transition-colors ${isActive('/artisans') ? 'text-forest dark:text-orange font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange'}`}>

                Artisans
              </Link>
              <Link
                href="/our-story"
                className={`px-4 py-2 text-sm font-body font-medium transition-colors ${isActive('/our-story') ? 'text-forest dark:text-orange font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest dark:hover:text-orange'}`}>

                Our Story
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-forest dark:hover:text-orange transition-colors rounded"
                aria-label="Search">

                <SearchIcon className="w-5 h-5" />
              </button>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-forest dark:hover:text-orange transition-colors rounded"
                aria-label={`Wishlist (${wishlistCount} items)`}>

                <HeartIcon className="w-5 h-5" />
                {wishlistCount > 0 &&
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-body font-bold">
                    {wishlistCount}
                  </span>
                }
              </Link>
              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-forest dark:hover:text-orange transition-colors rounded"
                aria-label={`Cart (${cartCount} items)`}>

                <ShoppingCartIcon className="w-5 h-5" />
                {cartCount > 0 &&
                  <motion.span
                    key={cartCount}
                    initial={{
                      scale: 0.5
                    }}
                    animate={{
                      scale: 1
                    }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange text-white text-xs rounded-full flex items-center justify-center font-body font-bold">

                    {cartCount}
                  </motion.span>
                }
              </button>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-forest transition-colors rounded ml-1"
                aria-label="Toggle menu">

                {isMobileMenuOpen ?
                  <XIcon className="w-5 h-5" /> :

                  <MenuIcon className="w-5 h-5" />
                }
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen &&
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: 'auto',
                  opacity: 1
                }}
                exit={{
                  height: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.2
                }}
                className="overflow-hidden pb-3">

                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for furniture, materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-body border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest bg-gray-50 dark:bg-gray-800 dark:text-white" />

                </div>
              </motion.div>
            }
          </AnimatePresence>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen &&
            <motion.div
              initial={{
                height: 0,
                opacity: 0
              }}
              animate={{
                height: 'auto',
                opacity: 1
              }}
              exit={{
                height: 0,
                opacity: 0
              }}
              transition={{
                duration: 0.25
              }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">

              <div className="px-4 py-4 space-y-1">
                <Link
                  href="/"
                  className={`block px-3 py-2.5 text-sm font-body font-medium rounded transition-colors ${isActive('/') ? 'text-forest bg-forest/5 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest hover:bg-forest/5'}`}>

                  Home
                </Link>
                {CATEGORIES.map((cat) =>
                  <div key={cat.name}>
                    <Link
                      href={cat.href}
                      className={`block px-3 py-2.5 text-sm font-body font-medium rounded transition-colors ${isActive(`/category/${cat.name.toLowerCase()}`) ? 'text-forest bg-forest/5 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest hover:bg-forest/5'}`}>

                      {cat.name}
                    </Link>
                    <div className="pl-6 space-y-1">
                      {cat.subcategories.map((sub) =>
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-1.5 text-xs font-body text-gray-500 dark:text-gray-400 hover:text-forest transition-colors">

                          {sub.name}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                <Link
                  href="/products"
                  className={`block px-3 py-2.5 text-sm font-body font-medium rounded transition-colors ${isActive('/products') ? 'text-forest bg-forest/5 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest hover:bg-forest/5'}`}>

                  All Products
                </Link>
                <Link
                  href="/artisans"
                  className={`block px-3 py-2.5 text-sm font-body font-medium rounded transition-colors ${isActive('/artisans') ? 'text-forest bg-forest/5 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest hover:bg-forest/5'}`}>

                  Artisans
                </Link>
                <Link
                  href="/our-story"
                  className={`block px-3 py-2.5 text-sm font-body font-medium rounded transition-colors ${isActive('/our-story') ? 'text-forest bg-forest/5 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-forest hover:bg-forest/5'}`}>

                  Our Story
                </Link>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </header>
      <div className="h-[calc(2.5rem+4rem)]" />
    </>);

}