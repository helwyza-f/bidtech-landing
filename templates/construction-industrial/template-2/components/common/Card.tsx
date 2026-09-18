import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'subtle' | 'dark' | 'glass';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export default function Card({
  variant = 'white',
  hoverEffect = true,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300 overflow-hidden";
  
  const variantStyles = {
    white: "bg-white border border-slate-200 shadow-sm",
    subtle: "bg-slate-50 border border-slate-200/80 shadow-sm",
    dark: "bg-slate-900 border border-slate-800 text-white shadow-lg",
    glass: "bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md",
  };

  const hoverStyles = hoverEffect ? "hover:-translate-y-1.5 hover:shadow-xl" : "";

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
