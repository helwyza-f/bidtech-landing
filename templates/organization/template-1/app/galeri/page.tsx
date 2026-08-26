import Breadcrumb from '@/components/ui/Breadcrumb';
import GalleryGrid from '@/components/sections/GalleryGrid';

export const metadata = {
  title: 'Galeri',
};

export default function GaleriPage() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <Breadcrumb items={[{ label: 'Galeri' }]} />
      <GalleryGrid />
    </main>
  );
}
