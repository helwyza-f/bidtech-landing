import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30",
    secondary: "bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white bg-transparent",
    dark: "bg-slate-950 text-white hover:bg-slate-800 shadow-slate-950/30 hover:shadow-lg",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[1.2em] leading-none">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[1.2em] leading-none">{icon}</span>
      )}
    </button>
  );
}
