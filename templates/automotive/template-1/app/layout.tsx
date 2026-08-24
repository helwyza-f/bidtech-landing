import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'automotive',
  description: 'automotive',
  keywords: ['keyword1', 'keyword2'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable)}>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
