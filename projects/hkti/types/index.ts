export interface NavItem {
  label: string;
  href: string;
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  phaseLabel?: string;
  theme?: 'forest' | 'amber';
  isPinnacle?: boolean;
}

export interface MissionItem {
  id: string;
  number: string;
  description: string;
  iconName?: string;
  theme?: 'forest' | 'amber';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  fallbackUrl?: string;
  isFeatured?: boolean;
  aspect?: string;
  date?: string;
}

export interface AspirasiFormData {
  namaLengkap: string;
  nomorWhatsapp: string;
  kategori: string;
  kecamatan: string;
  pesanAspirasi: string;
}
