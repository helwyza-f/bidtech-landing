import Breadcrumb from '@/components/ui/Breadcrumb';
import AboutDetail from '@/components/sections/AboutDetail';
import Team from '@/components/sections/Team';

export const metadata = {
  title: 'Tentang Kami',
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <Breadcrumb items={[{ label: 'Tentang Kami' }]} />
      <AboutDetail />
      <Team />
    </main>
  );
}
