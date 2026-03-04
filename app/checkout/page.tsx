'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LockIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCartItems, selectCartTotal, clearCart } from '@/store/cartSlice';
import { placeOrder } from '@/store/orderSlice';
import { calculateShipping } from '@/constants/shipping';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { OrderReview } from '@/components/checkout/OrderReview';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import type { ShippingAddress } from '@/types';

const EMPTY_ADDRESS: ShippingAddress = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    upazila: ''
};

export default function CheckoutPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId] = useState(`NC${Math.floor(Math.random() * 90000) + 10000}`);

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            const shippingCost = calculateShipping(address.district, cartTotal);
            dispatch(
                placeOrder({
                    items: cartItems,
                    total: cartTotal,
                    district: address.district
                })
            );
            await new Promise((r) => setTimeout(r, 2000));
            dispatch(clearCart());
            setStep(4);
        } catch (err) {
            console.error('Order placement failed:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0 && step !== 4) {
        return (
            <div className="min-h-screen bg-cream dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="font-heading text-2xl text-gray-400 mb-3">Your cart is empty</p>
                    <Link href="/products" className="text-forest font-body text-sm hover:text-orange transition-colors">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900">
            {/* Checkout header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-forest rounded flex items-center justify-center">
                            <span className="text-white font-heading font-bold text-xs">N</span>
                        </div>
                        <span className="font-heading text-lg font-bold text-forest dark:text-white">NatureCraft</span>
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs font-body text-gray-500 dark:text-gray-400">
                        <LockIcon className="w-3.5 h-3.5 text-green-500" /> Secure Checkout · BDT (৳)
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {step < 4 && <StepIndicator currentStep={step} />}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                            >
                                {step === 1 && <OrderReview items={cartItems} cartTotal={cartTotal} onNext={() => setStep(2)} />}
                                {step === 2 && <ShippingForm address={address} onChange={setAddress} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                                {step === 3 && (
                                    <PaymentForm
                                        items={cartItems}
                                        cartTotal={cartTotal}
                                        district={address.district}
                                        onBack={() => setStep(2)}
                                        onPlaceOrder={handlePlaceOrder}
                                        isProcessing={isProcessing}
                                    />
                                )}
                                {step === 4 && <OrderConfirmation orderId={orderId} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {step < 4 && (
                        <div className="lg:col-span-1">
                            <OrderSummary items={cartItems} cartTotal={cartTotal} district={address.district} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
