import type { MetadataRoute } from 'next';
import { SITE_INFO } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_INFO.name} — ${SITE_INFO.fullName}`,
    short_name: SITE_INFO.name,
    description: SITE_INFO.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#115E41',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
