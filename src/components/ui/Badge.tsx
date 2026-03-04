import React from 'react';
// ============================================================
// BADGE COMPONENT
// Small label badges for product tags (New, Sale, Best Seller)
// ============================================================

interface BadgeProps {
  variant?: 'new' | 'sale' | 'bestseller' | 'flash' | 'outofstock' | 'custom';
  children: React.ReactNode;
  className?: string;
}
export function Badge({
  variant = 'custom',
  children,
  className = ''
}: BadgeProps) {
  const variantStyles = {
    new: 'bg-forest text-white',
    sale: 'bg-orange text-white',
    bestseller: 'bg-amber-600 text-white',
    flash: 'bg-red-600 text-white',
    outofstock: 'bg-gray-400 text-white',
    custom: 'bg-gray-100 text-gray-700'
  };
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded text-xs font-body font-semibold tracking-wide uppercase
        ${variantStyles[variant]}
        ${className}
      `}>

      {children}
    </span>);

}