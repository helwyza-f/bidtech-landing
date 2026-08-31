export interface NavItem {
  label: string;
  labelId: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Gallery", labelId: "Galeri", href: "#gallery" },
  { label: "About Us", labelId: "Tentang Kami", href: "#about" },
  { label: "Properties", labelId: "Properti", href: "#properties" },
  { label: "Locations", labelId: "Lokasi", href: "#locations" },
  { label: "Contact Us", labelId: "Kontak", href: "#contact" },
];

export interface KPIMetric {
  value: string;
  label: string;
  labelId: string;
}

export const KPI_METRICS: KPIMetric[] = [
  {
    value: "$1.4B+",
    label: "Portfolio Value Created",
    labelId: "Nilai Portofolio Tercipta",
  },
  {
    value: "24",
    label: "Global Architecture Awards",
    labelId: "Penghargaan Arsitektur Global",
  },
  {
    value: "99.4%",
    label: "Client Satisfaction Score",
    labelId: "Skor Kepuasan Klien",
  },
  {
    value: "08",
    label: "Metropolitan Hubs",
    labelId: "Hub Metropolitan Dunia",
  },
];

export interface GalleryProject {
  id: string;
  num: string;
  name: string;
  nameId: string;
  location: string;
  category: string;
  year: string;
  area: string;
  image: string;
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "proj-1",
    num: "01",
    name: "Sander House",
    nameId: "Sander House",
    location: "Zurich, Switzerland",
    category: "Cantilever Monolith",
    year: "2024",
    area: "940 m²",
    image: "/images/craft-1.webp",
  },
  {
    id: "proj-2",
    num: "02",
    name: "Azure Villa",
    nameId: "Azure Villa",
    location: "Palm Jumeirah, Dubai",
    category: "Coastal Architecture",
    year: "2024",
    area: "1,650 m²",
    image: "/images/craft-2.webp",
  },
  {
    id: "proj-3",
    num: "03",
    name: "The Oasis",
    nameId: "The Oasis",
    location: "Emirates Hills, Dubai",
    category: "Desert Modernism",
    year: "2023",
    area: "2,100 m²",
    image: "/images/craft-3.webp",
  },
  {
    id: "proj-4",
    num: "04",
    name: "Luma Residence",
    nameId: "Luma Residence",
    location: "Downtown Dubai",
    category: "Sky Penthouse",
    year: "2024",
    area: "980 m²",
    image: "/images/craft-4.webp",
  },
];

export interface PropertyItem {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  specs: string;
  image: string;
}

export const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: "prop-1",
    name: "SANDER HOUSE",
    location: "Dubai Hills",
    type: "Contemporary Residence",
    price: "$64,000,000",
    specs: "6 Beds • 8 Baths • 1,450 m²",
    image: "/images/prop-1.webp",
  },
  {
    id: "prop-2",
    name: "AZURE VILLA",
    location: "Palm Jumeirah",
    type: "Luxury Villa",
    price: "$85,000,000",
    specs: "7 Beds • 9 Baths • 1,650 m²",
    image: "/images/prop-2.webp",
  },
  {
    id: "prop-3",
    name: "THE OASIS",
    location: "Emirates Hills",
    type: "Modern Mansion",
    price: "$94,000,000",
    specs: "8 Beds • 10 Baths • 2,100 m²",
    image: "/images/prop-3.webp",
  },
  {
    id: "prop-4",
    name: "LUMA RESIDENCE",
    location: "Downtown Dubai",
    type: "Luxury Penthouse",
    price: "$52,000,000",
    specs: "5 Beds • 6 Baths • 980 m²",
    image: "/images/prop-4.webp",
  },
];

export interface LocationData {
  title: string;
  tag: string;
  hubs: string[];
  btn: string;
}

export const LOCATIONS_DATA: Record<string, LocationData> = {
  BATAM: {
    title: "BATAM",
    tag: "KEPULAUAN RIAU, ID",
    hubs: ["Nongsa Coast & Resorts", "HarbourBay Waterfront", "Sukajadi Golf Sanctuary", "Batam Center Enclave", "Barelang Archipelago"],
    btn: "VIEW BATAM HUBS",
  },
  NONGSA: {
    title: "NONGSA",
    tag: "COASTAL ENCLAVE",
    hubs: ["Nongsa Beachfront Estates", "Palm Springs Marina Villas", "Montigo Coastal Mansions"],
    btn: "VIEW NONGSA HUBS",
  },
  HARBOURBAY: {
    title: "HARBOURBAY",
    tag: "WATERFRONT DISTRICT",
    hubs: ["HarbourBay Bayfront Towers", "Batu Ampar Horizon Villas", "Seaside Boardwalk Residences"],
    btn: "VIEW HARBOURBAY HUBS",
  },
  SUKAJADI: {
    title: "SUKAJADI",
    tag: "GOLF SANCTUARY",
    hubs: ["Padang Golf Sukajadi Estates", "Dermaga Sukajadi Villas", "Central Hills Residences"],
    btn: "VIEW SUKAJADI HUBS",
  },
  BARELANG: {
    title: "BARELANG",
    tag: "ARCHIPELAGO RESORT",
    hubs: ["Jembatan Satu Overlook", "Setokok Oceanfront Villas", "Galang Island Private Retreats"],
    btn: "VIEW BARELANG HUBS",
  },
};
