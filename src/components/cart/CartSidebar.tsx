"use client";

import React from 'react';
// ============================================================
// CART SIDEBAR COMPONENT
// Animated slide-in cart with item management
// ============================================================
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  PlusIcon,
  MinusIcon,
  Trash2Icon,
  ShoppingBagIcon
} from
  'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectIsCartOpen,
  closeCart,
  removeFromCart,
  updateQuantity
} from
  '../../store/cartSlice';
import { Button } from '../ui/Button';
export function CartSidebar() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const isOpen = useAppSelector(selectIsCartOpen);
  const handleClose = () => dispatch(closeCart());
  return (
    <AnimatePresence>
      {isOpen &&
        <>
          {/* Backdrop overlay */}
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
            transition={{
              duration: 0.2
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
            aria-hidden="true" />


          {/* Cart panel */}
          <motion.aside
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-luxury-lg"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5 text-forest" />
                <h2 className="font-heading text-xl font-semibold text-forest">
                  Your Cart
                </h2>
                {count > 0 &&
                  <span className="bg-orange text-white text-xs font-body font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                }
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close cart">

                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 /* Empty cart state */ ?
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="flex flex-col items-center justify-center h-full text-center py-12">

                  <div className="w-20 h-20 bg-forest/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBagIcon className="w-10 h-10 text-forest/30" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-gray-700 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm font-body text-gray-500 mb-6">
                    Discover our handcrafted collection and find something you
                    love.
                  </p>
                  <Button variant="primary" onClick={handleClose}>
                    <Link href="/products">Browse Collection</Link>
                  </Button>
                </motion.div> :

                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) =>
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{
                          opacity: 0,
                          x: 20
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          height: 0
                        }}
                        transition={{
                          duration: 0.2
                        }}
                        className="flex gap-4 py-4 border-b border-gray-50 last:border-0">

                        {/* Product image */}
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={handleClose}
                          className="flex-shrink-0">

                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg" />

                        </Link>

                        {/* Product details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={handleClose}>

                            <h4 className="font-heading text-sm font-semibold text-gray-900 line-clamp-2 hover:text-forest transition-colors">
                              {item.product.name}
                            </h4>
                          </Link>
                          <p className="text-xs font-body text-gray-500 mt-0.5">
                            {item.product.category} · {item.product.material}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1 border border-gray-200 rounded">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.product.id,
                                      quantity: item.quantity - 1
                                    })
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-forest hover:bg-forest/5 transition-colors rounded-l"
                                aria-label="Decrease quantity">

                                <MinusIcon className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-body font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.product.id,
                                      quantity: item.quantity + 1
                                    })
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-forest hover:bg-forest/5 transition-colors rounded-r"
                                aria-label="Increase quantity">

                                <PlusIcon className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-heading text-sm font-bold text-forest">
                              ৳
                              {(
                                item.product.price * item.quantity).
                                toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="flex-shrink-0 p-1.5 text-gray-300 hover:text-red-500 transition-colors self-start"
                          aria-label={`Remove ${item.product.name} from cart`}>

                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </motion.li>
                    )}
                  </AnimatePresence>
                </ul>
              }
            </div>

            {/* Footer with totals */}
            {items.length > 0 &&
              <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                {/* Order summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-body text-gray-600">
                    <span>Subtotal ({count} items)</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body text-gray-600">
                    <span>Shipping</span>
                    <span className="text-forest font-medium">
                      {total >= 5000 ? 'Free' : '৳60–৳120'}
                    </span>
                  </div>
                  {total < 5000 &&
                    <p className="text-xs font-body text-orange">
                      Add ৳{(5000 - total).toLocaleString()} more for free
                      shipping!
                    </p>
                  }
                  <div className="flex justify-between font-heading text-base font-bold text-forest pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-2">
                  <Link href="/checkout" onClick={handleClose}>
                    <Button variant="primary" fullWidth size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <button
                    onClick={handleClose}
                    className="w-full text-sm font-body text-gray-500 hover:text-forest transition-colors py-2">

                    Continue Shopping
                  </button>
                </div>
              </div>
            }
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}