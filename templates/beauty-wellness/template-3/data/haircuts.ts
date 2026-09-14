export interface HaircutModel {
  id: string;
  key: string;
  tag: string;
  name: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  priceFormatted: string;
  priceTag: string;
  description: string;
  faceShape: string;
  tools: string;
  bladeSpec: string;
  finishCompound: string;
  specialist: string;
  durability: string;
  image: string;
  frameColor: string;
  badgeText?: string;
  specCode: string;
  isSignature?: boolean;
}

export const haircutsData: HaircutModel[] = [
  {
    id: "01",
    key: "skena",
    tag: "SKENA CUT",
    name: "Skena Cut",
    title: "SKENA CUT",
    subtitle: "TEXTURE — MULLET CROP",
    duration: "45 MINS",
    price: 120000,
    priceFormatted: "120K",
    priceTag: "IDR 120K",
    description: "Tekstur mikro atas bervolume dengan blunt fringe tegas dan taper samping rapi.",
    faceShape: "Bulat, Oval, Hati",
    tools: 'Blunt Shears 5.5" + Detailer',
    bladeSpec: 'BLUNT SHEARS 5.5" + DETAILER',
    finishCompound: "MATTE CLAY & TEXTURE POWDER",
    specialist: "SENIOR TIER",
    durability: "3 Minggu Presisi",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=700&auto=format&fit=crop",
    frameColor: "#EAB308",
    specCode: "SPEC #01",
  },
  {
    id: "02",
    key: "twoblock",
    tag: "TWO-BLOCK",
    name: "Two-Block",
    title: "TWO-BLOCK",
    subtitle: "KOREAN STYLE — NATURAL DROP",
    duration: "50 MINS",
    price: 130000,
    priceFormatted: "130K",
    priceTag: "IDR 130K",
    description: "Undercut bagian dalam yang terselubung jatuh rambut alami, menciptakan siluet oval seimbang.",
    faceShape: "Oval, Lonjong, Persegi",
    tools: 'Texturizing Shears 6.5"',
    bladeSpec: 'TEXTURIZING SHEARS 6.5"',
    finishCompound: "NATURAL BALM & LIGHT OIL",
    specialist: "SENIOR TIER",
    durability: "3.5 Minggu Presisi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop",
    frameColor: "#D8F242",
    specCode: "SIGNATURE #02",
    isSignature: true,
  },
  {
    id: "03",
    key: "comma",
    tag: "COMMA HAIR",
    name: "Comma Hair",
    title: "COMMA HAIR",
    subtitle: "CURVED FRINGE — MEDIUM LENGTH",
    duration: "50 MINS",
    price: 135000,
    priceFormatted: "135K",
    priceTag: "IDR 135K",
    description: "Lengkung poni presisi menyerupai tanda koma dengan partisi akar rambut simetris.",
    faceShape: "Lonjong, Oval Simetris",
    tools: "Curved Razor + Point Cutting",
    bladeSpec: "CURVED RAZOR + POINT CUTTING",
    finishCompound: "VOLUME MOUSSE & SEA SALT SPRAY",
    specialist: "MASTER TIER",
    durability: "3 Minggu Presisi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop",
    frameColor: "#2563EB",
    specCode: "CALIBRATED",
  },
  {
    id: "04",
    key: "mullet",
    tag: "MULLET MODERN",
    name: "Mullet Modern",
    title: "MULLET MODERN",
    subtitle: "EDGY SILHOUETTE — TAIL TAPER",
    duration: "50 MINS",
    price: 140000,
    priceFormatted: "140K",
    priceTag: "IDR 140K",
    description: "Transisi gradasi samping yang bersih menuju ekor belakang berlayer tajam dan berkarakter.",
    faceShape: "Persegi, Berlian, Oval",
    tools: "Razor & 1.5mm Taper",
    bladeSpec: "RAZOR & 1.5MM TAPER",
    finishCompound: "SEA SALT & TEXTURE PASTE",
    specialist: "MASTER TIER",
    durability: "4 Minggu Presisi",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop",
    frameColor: "#E11D48",
    specCode: "VOL. 04",
  },
  {
    id: "05",
    key: "fade",
    tag: "CLASSIC FADE",
    name: "Classic Fade",
    title: "CLASSIC FADE",
    subtitle: "EXECUTIVE — CLEAN TAPER",
    duration: "45 MINS",
    price: 120000,
    priceFormatted: "120K",
    priceTag: "IDR 120K",
    description: "Gradasi mulus dari kulit 0.0mm hingga bayangan rambut gelap dengan garis tepi rahang terdefinisi.",
    faceShape: "Semua Bentuk Wajah",
    tools: "Wahl Senior 0-Gap + Foil Shaver",
    bladeSpec: "WAHL SENIOR 0-GAP + FOIL SHAVER",
    finishCompound: "HIGH SHEEN POMADE",
    specialist: "SENIOR TIER",
    durability: "2.5 Minggu Presisi",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=700&auto=format&fit=crop",
    frameColor: "#18181B",
    specCode: "0.0MM BLADE",
  },
];

export interface HeroCardItem {
  id: string;
  name: string;
  price: string;
  frameColor: string;
  badge: {
    text: string;
    bg: string;
    textColor: string;
    position: string;
  };
  image: string;
  alt: string;
  rotation: string;
  positionClasses: string;
  sizeClasses: string;
  imgHeightClasses: string;
  textColorClasses: string;
  subText?: string;
  zIndex: number;
}

export const heroCollageCards: HeroCardItem[] = [
  {
    id: "card-1",
    name: "SKENA CROP",
    price: "120K",
    frameColor: "#EAB308",
    badge: {
      text: "SPEC #01",
      bg: "bg-black/80",
      textColor: "text-white",
      position: "top-1.5 left-1.5",
    },
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=450&auto=format&fit=crop",
    alt: "Skena Crop Cut",
    rotation: "-rotate-6",
    positionClasses: "top-[8%] left-[4%] sm:left-[6%]",
    sizeClasses: "w-[160px] sm:w-[195px]",
    imgHeightClasses: "h-[155px] sm:h-[190px]",
    textColorClasses: "text-black",
    zIndex: 20,
  },
  {
    id: "card-2",
    name: "COMMA HAIR",
    price: "CALIBRATED",
    frameColor: "#2563EB",
    badge: {
      text: "CUT",
      bg: "bg-[#E11D48]",
      textColor: "text-white",
      position: "bottom-2 right-2",
    },
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=450&auto=format&fit=crop",
    alt: "Comma Hair Cut",
    rotation: "rotate-3",
    positionClasses: "top-[4%] left-[26%] sm:left-[27%]",
    sizeClasses: "w-[155px] sm:w-[185px]",
    imgHeightClasses: "h-[150px] sm:h-[180px]",
    textColorClasses: "text-white",
    subText: "CALIBRATED",
    zIndex: 10,
  },
  {
    id: "card-3",
    name: "TWO-BLOCK NATURAL",
    price: "130K",
    frameColor: "#D8F242",
    badge: {
      text: "SIGNATURE #02",
      bg: "bg-black",
      textColor: "text-[#D8F242]",
      position: "top-2 left-2",
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    alt: "Two-Block Natural",
    rotation: "rotate-1",
    positionClasses: "top-[7%] left-[45%] sm:left-[41%]",
    sizeClasses: "w-[190px] sm:w-[240px]",
    imgHeightClasses: "h-[185px] sm:h-[235px]",
    textColorClasses: "text-black",
    zIndex: 30,
  },
  {
    id: "card-4",
    name: "RAZOR FADE",
    price: "120K",
    frameColor: "#18181B",
    badge: {
      text: "0.0MM BLADE",
      bg: "bg-white",
      textColor: "text-black",
      position: "bottom-2 left-2",
    },
    image: "https://images.unsplash.com/photo-1517832606589-7629c3397143?q=80&w=450&auto=format&fit=crop",
    alt: "Razor Fade",
    rotation: "-rotate-2",
    positionClasses: "top-[6%] right-[3%] sm:right-[6%]",
    sizeClasses: "w-[165px] sm:w-[200px]",
    imgHeightClasses: "h-[155px] sm:h-[185px]",
    textColorClasses: "text-zinc-300",
    zIndex: 10,
  },
  {
    id: "card-5",
    name: "MODERN MULLET",
    price: "140K",
    frameColor: "#E11D48",
    badge: {
      text: "VOL. 04",
      bg: "bg-white",
      textColor: "text-[#E11D48]",
      position: "top-2 right-2",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=450&auto=format&fit=crop",
    alt: "Modern Mullet Cut",
    rotation: "-rotate-3",
    positionClasses: "bottom-[6%] left-[12%] sm:left-[19%]",
    sizeClasses: "w-[170px] sm:w-[210px]",
    imgHeightClasses: "h-[160px] sm:h-[195px]",
    textColorClasses: "text-white",
    zIndex: 20,
  },
  {
    id: "card-6",
    name: "GROOMING / SCULPT",
    price: "150K",
    frameColor: "#EAB308",
    badge: {
      text: "LAB FORMULA",
      bg: "bg-[#2563EB]",
      textColor: "text-white",
      position: "top-2 right-2",
    },
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=450&auto=format&fit=crop",
    alt: "Grooming & Sculpting",
    rotation: "rotate-3",
    positionClasses: "bottom-[5%] right-[5%] sm:right-[11%]",
    sizeClasses: "w-[175px] sm:w-[215px]",
    imgHeightClasses: "h-[160px] sm:h-[195px]",
    textColorClasses: "text-black",
    zIndex: 20,
  },
];
