import React from 'react';
// ============================================================
// INVOICE VIEW — printable invoice (BDT, branded)
// ============================================================

import type { Order } from '../../store/orderSlice';
import { calculateShipping } from '../../constants/shipping';
interface InvoiceViewProps {
  order: Order;
}
export function InvoiceView({ order }: InvoiceViewProps) {
  const shipping = calculateShipping(order.district, order.total);
  const tax = Math.round(order.total * 0.05);
  const grandTotal = order.total + shipping + tax;
  return (
    <div
      id="invoice-print"
      className="bg-white p-10 max-w-2xl mx-auto font-body text-gray-900">

      {/* Header */}
      <div className="flex items-start justify-between mb-10 pb-6 border-b-2 border-forest">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-forest rounded flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">
                N
              </span>
            </div>
            <span className="font-heading text-2xl font-bold text-forest">
              NatureCraft
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Handcrafted Furniture · Bangladesh
          </p>
          <p className="text-xs text-gray-500">
            hello@naturecraft.com.bd · +880 1700-000000
          </p>
        </div>
        <div className="text-right">
          <p className="font-heading text-lg font-bold text-forest">INVOICE</p>
          <p className="text-sm text-gray-600">#{order.id}</p>
          <p className="text-xs text-gray-500 mt-1">Date: {order.date}</p>
          <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
            {order.status}
          </span>
        </div>
      </div>

      {/* Items table */}
      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-semibold text-gray-700">Item</th>
            <th className="text-center py-2 font-semibold text-gray-700">
              Qty
            </th>
            <th className="text-right py-2 font-semibold text-gray-700">
              Unit Price
            </th>
            <th className="text-right py-2 font-semibold text-gray-700">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) =>
          <tr key={item.product.id} className="border-b border-gray-100">
              <td className="py-3">
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-xs text-gray-500">
                  {item.product.material} · {item.product.category}
                </p>
              </td>
              <td className="text-center py-3 text-gray-700">
                {item.quantity}
              </td>
              <td className="text-right py-3 text-gray-700">
                ৳{item.product.price.toLocaleString()}
              </td>
              <td className="text-right py-3 font-semibold text-forest">
                ৳{(item.product.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-56 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>৳{order.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>
              Delivery (
              {order.district === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
            </span>
            <span>{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>VAT (5%)</span>
            <span>৳{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-heading text-base font-bold text-forest pt-2 border-t-2 border-forest">
            <span>Grand Total</span>
            <span>৳{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
        <p>Thank you for supporting Bangladeshi craftsmanship 🌿</p>
        <p className="mt-1">
          NatureCraft · Dhaka, Bangladesh · www.naturecraft.com.bd
        </p>
      </div>
    </div>);

}