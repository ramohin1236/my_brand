import React from 'react';
// ============================================================
// ORDER SUMMARY SIDEBAR — shows cart items + totals (BDT)
// ============================================================
import { LockIcon } from 'lucide-react';
import type { CartItem } from '../../types';
import { calculateShipping, getShippingLabel } from '../../constants/shipping';
interface OrderSummaryProps {
  items: CartItem[];
  cartTotal: number;
  district: string;
}
export function OrderSummary({
  items,
  cartTotal,
  district
}: OrderSummaryProps) {
  const shipping = calculateShipping(district, cartTotal);
  const tax = Math.round(cartTotal * 0.05); // 5% VAT
  const orderTotal = cartTotal + shipping + tax;
  return (
    <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
      <h3 className="font-heading text-base font-semibold text-forest mb-5">
        Order Summary
      </h3>

      <ul className="space-y-3 mb-5 max-h-48 overflow-y-auto">
        {items.map((item) =>
        <li key={item.product.id} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-12 h-12 object-cover rounded-lg" />

              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-forest text-white text-xs rounded-full flex items-center justify-center font-body font-bold">
                {item.quantity}
              </span>
            </div>
            <p className="flex-1 font-body text-xs font-medium text-gray-900 line-clamp-1">
              {item.product.name}
            </p>
            <p className="font-body text-xs font-semibold text-forest flex-shrink-0">
              ৳{(item.product.price * item.quantity).toLocaleString()}
            </p>
          </li>
        )}
      </ul>

      <div className="space-y-2 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm font-body text-gray-600">
          <span>Subtotal</span>
          <span>৳{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm font-body text-gray-600">
          <span>
            Delivery {district ? `(${getShippingLabel(district)})` : ''}
          </span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'Free' : `৳${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-sm font-body text-gray-600">
          <span>VAT (5%)</span>
          <span>৳{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-heading text-base font-bold text-forest pt-2 border-t border-gray-100">
          <span>Total</span>
          <span>৳{orderTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-5 text-xs font-body text-gray-400">
        <LockIcon className="w-3.5 h-3.5 text-green-500" />
        SSL Secured Checkout
      </div>
    </div>);

}