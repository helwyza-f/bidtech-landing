import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  badgeIcon?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  dark?: boolean;
  children: React.ReactNode;
}

export default function Section({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  subtitle,
  dark = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        dark ? "bg-slate-950 text-white" : "bg-white text-slate-900",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(badge || title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-orange-50 text-orange-600 border-orange-200">
                {badgeIcon && (
                  <span className="material-symbols-outlined text-[16px]">{badgeIcon}</span>
                )}
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
                {title}{' '}
                {titleHighlight && (
                  <span className="text-orange-600">{titleHighlight}</span>
                )}
              </h2>
            )}
            {subtitle && (
              <p className={cn("text-base md:text-lg", dark ? "text-slate-400" : "text-slate-600")}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
