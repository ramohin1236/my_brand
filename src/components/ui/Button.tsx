import React from 'react';
// ============================================================
// BUTTON COMPONENT
// Reusable button with multiple variants for the luxury brand
// ============================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base styles applied to all variants
  const baseStyles =
  'inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  // Variant-specific styles
  const variantStyles = {
    primary:
    'bg-forest text-white hover:bg-forest-light focus:ring-forest shadow-sm hover:shadow-luxury',
    secondary:
    'bg-orange text-white hover:bg-orange-dark focus:ring-orange shadow-sm',
    outline:
    'border-2 border-forest text-forest bg-transparent hover:bg-forest hover:text-white focus:ring-forest',
    ghost: 'text-forest bg-transparent hover:bg-forest/10 focus:ring-forest',
    danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
  };
  // Size-specific styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded',
    md: 'px-6 py-3 text-sm rounded',
    lg: 'px-8 py-4 text-base rounded'
  };
  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}>

      {loading ?
      <>
          {/* Loading spinner */}
          <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true">

            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4" />

            <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />

          </svg>
          Loading...
        </> :

      children
      }
    </button>);

}