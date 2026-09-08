import type { Metadata } from 'next';
import { HomeClient } from '@/components/sections/HomeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
