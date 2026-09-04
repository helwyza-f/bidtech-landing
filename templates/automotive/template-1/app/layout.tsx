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
  title: 'RentCar - Layanan Sewa Mobil Mewah & Terpercaya',
  description: 'Rasakan puncak rekayasa otomotif dengan pilihan kendaraan mewah kami yang dikurasi, siap sedia setiap saat.',
  keywords: ['sewa mobil', 'rental mobil mewah', 'rentcar', 'sewa alphard'],
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
