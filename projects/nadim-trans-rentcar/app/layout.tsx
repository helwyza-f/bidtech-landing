import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter, Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nadim Trans RentCar - Layanan Sewa Mobil Mewah & Terpercaya',
  description: 'Rasakan puncak rekayasa otomotif dengan pilihan kendaraan mewah kami yang dikurasi, siap sedia setiap saat bersama Nadim Trans RentCar.',
  keywords: ['sewa mobil', 'rental mobil mewah', 'nadim trans', 'nadim trans rentcar', 'sewa alphard'],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable, bebasNeue.variable)}>
      <body className="bg-white text-gray-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
