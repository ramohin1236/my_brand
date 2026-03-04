import React from 'react';
// ============================================================
// ORDER REVIEW — Step 1: review cart items before checkout
// ============================================================

import { ChevronRightIcon } from 'lucide-react';
import type { CartItem } from '../../types';
import { Button } from '../ui/Button';
interface OrderReviewProps {
  items: CartItem[];
  cartTotal: number;
  onNext: () => void;
}
export function OrderReview({ items, cartTotal, onNext }: OrderReviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h2 className="font-heading text-xl font-semibold text-forest mb-6">
        Review Your Order
      </h2>
      <ul className="divide-y divide-gray-50">
        {items.map((item) =>
        <li key={item.product.id} className="flex gap-4 py-4">
            <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-sm font-semibold text-gray-900 line-clamp-1">
                {item.product.name}
              </h4>
              <p className="font-body text-xs text-gray-500 mt-0.5">
                {item.product.material} · Qty: {item.quantity}
              </p>
            </div>
            <p className="font-heading text-sm font-bold text-forest flex-shrink-0">
              ৳{(item.product.price * item.quantity).toLocaleString()}
            </p>
          </li>
        )}
      </ul>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-6">
        <span className="font-body text-sm text-gray-600">Subtotal</span>
        <span className="font-heading text-lg font-bold text-forest">
          ৳{cartTotal.toLocaleString()}
        </span>
      </div>
      <Button variant="primary" fullWidth size="lg" onClick={onNext}>
        Continue to Shipping <ChevronRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>);

}