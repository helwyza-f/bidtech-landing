import Link from 'next/link';
import { Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="w-full bg-[#f3f4f6] border-b border-gray-200/90 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
        <Link href="/" className="hover:text-[#0D4D44] flex items-center text-gray-700 transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-gray-400 font-bold">»</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#0D4D44] text-gray-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
