"use client";

import React from 'react';
// ============================================================
// ORDER CONFIRMATION — Step 4: success state
// ============================================================
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { InvoiceButton } from '../invoice/InvoiceButton';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectLatestOrder } from '../../store/orderSlice';
interface OrderConfirmationProps {
  orderId: string;
}
export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const latestOrder = useAppSelector(selectLatestOrder);
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.4
      }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-10 text-center">

      <motion.div
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          delay: 0.2
        }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">

        <CheckIcon className="w-10 h-10 text-green-600" />
      </motion.div>

      <h2 className="font-heading text-3xl font-bold text-forest dark:text-white mb-3">
        Order Placed!
      </h2>
      <p className="font-body text-gray-600 dark:text-gray-300 mb-2">
        Thank you! We'll confirm your order via SMS & email shortly.
      </p>
      <p className="font-body text-sm text-gray-500 mb-8">
        Order #{orderId} · Estimated delivery: 3–7 business days
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg">
            Browse More
          </Button>
        </Link>
        {latestOrder && <InvoiceButton order={latestOrder} />}
      </div>
    </motion.div>);

}