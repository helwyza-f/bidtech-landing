import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'teal' | 'coral' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'teal', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98]';

    const variants = {
      teal:
        'bg-[#0D4D44] text-white hover:bg-[#093C35] focus:ring-[#0D4D44] shadow-sm',
      coral:
        'bg-[#E05A47] text-white hover:bg-[#CF4D3B] focus:ring-[#E05A47] shadow-sm',
      outline:
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
      ghost:
        'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      white:
        'bg-white text-[#0D4D44] hover:bg-gray-100 shadow-md focus:ring-white',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
