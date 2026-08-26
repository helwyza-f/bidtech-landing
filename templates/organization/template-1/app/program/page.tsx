import Breadcrumb from '@/components/ui/Breadcrumb';
import Programs from '@/components/sections/Programs';

export const metadata = {
  title: 'Program Kami',
};

export default function ProgramPage() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <Breadcrumb items={[{ label: 'Program' }]} />
      <Programs />
    </main>
  );
}
