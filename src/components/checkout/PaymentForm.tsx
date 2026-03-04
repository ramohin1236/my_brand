"use client";

import React, { useState } from 'react';
// ============================================================
// PAYMENT FORM — Step 3: payment method selection (BDT)
// ============================================================
import { motion } from 'framer-motion';
import { CreditCardIcon, TruckIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { calculateShipping } from '../../constants/shipping';
import type { CartItem } from '../../types';
type PaymentMethod = 'card' | 'bkash' | 'nagad' | 'cod';
interface PaymentFormProps {
  items: CartItem[];
  cartTotal: number;
  district: string;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}
export function PaymentForm({
  cartTotal,
  district,
  onBack,
  onPlaceOrder,
  isProcessing
}: PaymentFormProps) {
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const shipping = calculateShipping(district, cartTotal);
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shipping + tax;
  const METHODS = [
    {
      id: 'bkash' as PaymentMethod,
      label: 'bKash',
      sub: 'Mobile banking',
      emoji: '💳'
    },
    {
      id: 'nagad' as PaymentMethod,
      label: 'Nagad',
      sub: 'Mobile banking',
      emoji: '📱'
    },
    {
      id: 'card' as PaymentMethod,
      label: 'Card',
      sub: 'Visa / Mastercard',
      Icon: CreditCardIcon
    },
    {
      id: 'cod' as PaymentMethod,
      label: 'Cash on Delivery',
      sub: 'Pay on arrival',
      Icon: TruckIcon
    }];

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h2 className="font-heading text-xl font-semibold text-forest mb-6">
        Payment Method
      </h2>
      <div className="space-y-3 mb-6">
        {METHODS.map(({ id, label, sub, emoji, Icon }) =>
          <label
            key={id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${method === id ? 'border-forest bg-forest/5' : 'border-gray-200 hover:border-gray-300'}`}>

            <input
              type="radio"
              name="payment"
              value={id}
              checked={method === id}
              onChange={() => setMethod(id)}
              className="text-forest" />

            <span className="text-xl">{emoji}</span>
            {Icon && <Icon className="w-5 h-5 text-forest" />}
            <div>
              <p className="font-body text-sm font-semibold text-gray-900">
                {label}
              </p>
              <p className="font-body text-xs text-gray-500">{sub}</p>
            </div>
          </label>
        )}
      </div>

      {method === 'card' &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">

          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-3 text-sm font-body border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-forest/30" />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM / YY"
              className="w-full px-4 py-3 text-sm font-body border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-forest/30" />

            <input
              type="password"
              placeholder="CVV"
              className="w-full px-4 py-3 text-sm font-body border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-forest/30" />

          </div>
        </motion.div>
      }

      {(method === 'bkash' || method === 'nagad') &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          className="mb-6 p-4 bg-gray-50 rounded-xl">

          <input
            type="tel"
            placeholder="Your bKash/Nagad number (01XXXXXXXXX)"
            className="w-full px-4 py-3 text-sm font-body border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-forest/30" />

        </motion.div>
      }

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 text-sm font-body font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors">

          ← Back
        </button>
        <Button
          variant="primary"
          className="flex-1"
          size="lg"
          loading={isProcessing}
          onClick={onPlaceOrder}>

          {isProcessing ?
            'Processing...' :
            `Place Order · ৳${total.toLocaleString()}`}
        </Button>
      </div>
    </div>);

}