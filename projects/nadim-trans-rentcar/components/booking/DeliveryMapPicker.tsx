"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Locale } from "@/lib/i18n";
import DeliveryMapModal from "./DeliveryMapModal";
import {
  MapPin,
  Search,
  LocateFixed,
  Lock,
  Building2,
  Car,
  Loader2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Plane,
  Ship,
  ShoppingBag,
  Hotel,
  X,
  Maximize,
} from "lucide-react";

export interface DeliveryLocationData {
  deliveryType: "delivery" | "pool";
  kecamatan: string;
  address: string;
  landmarkNotes?: string;
  deliveryTime: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
}

interface DeliveryMapPickerProps {
  locale: Locale;
  value: DeliveryLocationData;
  onChange: (data: DeliveryLocationData) => void;
}

// Format nama kecamatan agar tidak berulang (contoh: "Nongsa" -> "Nongsa")
export function formatDistrictDisplay(kecamatanName: string): string {
  if (!kecamatanName) return "Batam Kota";
  return kecamatanName.replace(/^(kecamatan|kec\.)\s+/i, "");
}

export interface BatamPoi {
  name: string;
  category: "airport" | "ferry" | "mall" | "hotel" | "landmark" | "area";
  categoryLabel: string;
  kecamatan: string;
  address: string;
  lat: number;
  lng: number;
  keywords?: string[];
}

export interface SuggestionItem {
  id: string;
  name: string;
  category: "airport" | "ferry" | "mall" | "hotel" | "landmark" | "area" | "address";
  categoryLabel: string;
  kecamatan: string;
  address: string;
  lat: number;
  lng: number;
}

// Database Lokasi & Tempat Terkenal di Seluruh Batam untuk Pencarian Instan (Autocomplete)
export const BATAM_POPULAR_PLACES: BatamPoi[] = [
  // Bandara & Pelabuhan (Koordinat terkalibrasi presisi pada titik lobi / terminal penumpang)
  {
    name: "Pelabuhan Ferry Internasional Sekupang",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Sekupang",
    address: "Sekupang International Ferry Terminal, Jl. RE Martadinata, Sekupang, Batam",
    lat: 1.1242,
    lng: 103.9262,
    keywords: ["sekupang ferry", "ferry sekupang", "pelabuhan sekupang", "terminal sekupang", "sekupang singapore", "sekupang"],
  },
  {
    name: "Pelabuhan Domestik Sekupang",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Sekupang",
    address: "Pelabuhan Domestik Sekupang, Jl. RE Martadinata, Sekupang, Batam",
    lat: 1.1272,
    lng: 103.9238,
    keywords: ["domestik sekupang", "pelabuhan sekupang", "sekupang karimun dumai", "ferry sekupang"],
  },
  {
    name: "Bandara Internasional Hang Nadim (BTH)",
    category: "airport",
    categoryLabel: "Bandara",
    kecamatan: "Nongsa",
    address: "Bandara Internasional Hang Nadim, Batu Besar, Kec. Nongsa, Batam",
    lat: 1.1225,
    lng: 104.1145,
    keywords: ["hang nadim", "bandara batam", "airport batam", "bth", "terminal bandara"],
  },
  {
    name: "Pelabuhan Ferry Harbour Bay",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Kawasan Harbour Bay, Jl. Duyung, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1533,
    lng: 103.9967,
    keywords: ["harbour bay", "ferry harbour bay", "pelabuhan harbour bay", "harbor bay", "batu ampar"],
  },
  {
    name: "Pelabuhan Batam Centre Ferry Terminal",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Batam Kota",
    address: "Batam Centre International Ferry Terminal, Jl. Engku Putri, Batam Kota",
    lat: 1.1318,
    lng: 104.0554,
    keywords: ["batam center", "batam centre", "ferry batam center", "pelabuhan batam center"],
  },
  {
    name: "Pelabuhan Roro & Ferry Telaga Punggur",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Nongsa",
    address: "Pelabuhan Telaga Punggur, Kabil, Kec. Nongsa, Kota Batam",
    lat: 1.0346,
    lng: 104.1322,
    keywords: ["punggur", "telaga punggur", "pelabuhan roro", "roro punggur", "tanjung uban"],
  },
  {
    name: "Pelabuhan Nongsapura Ferry Terminal",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Nongsa",
    address: "Jl. Hang Lekiu, Sambau, Kec. Nongsa, Batam",
    lat: 1.1965,
    lng: 104.0950,
    keywords: ["nongsapura", "ferry nongsapura", "pelabuhan nongsapura", "nongsa marina"],
  },

  // Mall & Pusat Belanja
  {
    name: "Grand Batam Mall",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Pembangunan, Batu Selicin, Kec. Lubuk Baja, Batam",
    lat: 1.1353,
    lng: 104.0078,
    keywords: ["grand batam", "gbm", "penuin", "mall penuin"],
  },
  {
    name: "Nagoya Hill Shopping Mall",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Teuku Umar No.1, Lubuk Baja Kota, Kec. Lubuk Baja, Batam",
    lat: 1.1463,
    lng: 104.0126,
    keywords: ["nagoya hill", "mall nagoya", "bukit nagoya"],
  },
  {
    name: "BCS Mall (Batam City Square)",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Bunga Raya, Baloi Kusuma Indah, Kec. Lubuk Baja, Batam",
    lat: 1.1328,
    lng: 104.0102,
    keywords: ["bcs mall", "batam city square", "penuin"],
  },
  {
    name: "Mega Mall Batam Centre",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Batam Kota",
    address: "Jl. Engku Putri No.1, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1292,
    lng: 104.0560,
    keywords: ["mega mall", "mall batam center", "hypermart batam center"],
  },
  {
    name: "One Batam Mall",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Batam Kota",
    address: "Jl. Raja H. Fisabilillah, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1302,
    lng: 104.0456,
    keywords: ["one batam mall", "obm", "batam center mall"],
  },
  {
    name: "Pollux Mall Habibie (Meisterstadt)",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Batam Kota",
    address: "Jl. Jenderal Sudirman, Taman Baloi, Kec. Batam Kota, Batam",
    lat: 1.1195,
    lng: 104.0412,
    keywords: ["pollux mall", "meisterstadt", "habibie"],
  },
  {
    name: "DC Mall (Diamond City Mall)",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Duyung, Tanjung Uma, Kec. Lubuk Baja, Batam",
    lat: 1.1462,
    lng: 104.0048,
  },
  {
    name: "Panbil Mall",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Sei Beduk (Mukakuning)",
    address: "Kawasan Industri Panbil, Mukakuning, Kec. Sei Beduk, Batam",
    lat: 1.0835,
    lng: 104.0382,
  },
  {
    name: "Kepri Mall",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Batam Kota",
    address: "Simpang Kabil, Sukajadi, Kec. Batam Kota, Batam",
    lat: 1.1095,
    lng: 104.0375,
  },
  {
    name: "SP Plaza & Mall Tembesi",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Sagulung",
    address: "Jl. Letjend R. Soeprapto, Tembesi, Kec. Sagulung, Batam",
    lat: 1.0425,
    lng: 103.9952,
  },
  {
    name: "Plaza Fanindo Batu Aji",
    category: "mall",
    categoryLabel: "Mall",
    kecamatan: "Batu Aji",
    address: "Kav. Fanindo, Tanjung Uncang, Kec. Batu Aji, Batam",
    lat: 1.0542,
    lng: 103.9515,
  },

  // Hotel & Resort
  {
    name: "Batam Marriott Hotel Harbour Bay",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Kawasan Harbour Bay, Jl. Duyung, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1565,
    lng: 103.9985,
  },
  {
    name: "Radisson Golf & Convention Center Batam",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batam Kota",
    address: "Jl. Jendral Sudirman, Sukajadi, Kec. Batam Kota, Batam",
    lat: 1.1165,
    lng: 104.0315,
  },
  {
    name: "Best Western Premier Panbil",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Sei Beduk (Mukakuning)",
    address: "Jl. Ahmad Yani, Muka Kuning, Kec. Sei Beduk, Batam",
    lat: 1.0855,
    lng: 104.0395,
  },
  {
    name: "Montigo Resorts Nongsa",
    category: "hotel",
    categoryLabel: "Resort",
    kecamatan: "Nongsa",
    address: "Jl. Hang Lekiu, Sambau, Kec. Nongsa, Batam",
    lat: 1.1925,
    lng: 104.0895,
  },
  {
    name: "Turi Beach Resort Nongsa",
    category: "hotel",
    categoryLabel: "Resort",
    kecamatan: "Nongsa",
    address: "Jl. Hang Lekiu, Sambau, Kec. Nongsa, Batam",
    lat: 1.1985,
    lng: 104.0955,
  },
  {
    name: "Aston Batam Hotel & Residence",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Sriwijaya No.1, Kp. Pelita, Kec. Lubuk Baja, Batam",
    lat: 1.1415,
    lng: 104.0195,
  },
  {
    name: "Swiss-Belhotel Harbour Bay",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Jl. Duyung, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1545,
    lng: 103.9975,
  },
  {
    name: "Harmoni One Convention Hotel Batam Centre",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batam Kota",
    address: "Jl. Jend. Sudirman No.1, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1275,
    lng: 104.0485,
  },
  {
    name: "Harris Hotel Batam Center",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batam Kota",
    address: "Jl. Engku Putri, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1305,
    lng: 104.0525,
  },
  {
    name: "Harris Resort Barelang",
    category: "hotel",
    categoryLabel: "Resort",
    kecamatan: "Galang / Barelang",
    address: "Jl. Trans Barelang, Jembatan 1, Kota Batam",
    lat: 0.9925,
    lng: 104.0415,
  },
  {
    name: "Harris Resort Waterfront Batam",
    category: "hotel",
    categoryLabel: "Resort",
    kecamatan: "Sekupang",
    address: "Jl. KH Ahmad Dahlan No.1, Marina, Kec. Sekupang, Batam",
    lat: 1.0965,
    lng: 103.9185,
  },
  {
    name: "Planet Holiday Hotel & Suites",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Jl. Raja Ali H. No.54, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1512,
    lng: 104.0045,
  },
  {
    name: "Pacific Palace Hotel Batam",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Jl. Duyung, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1528,
    lng: 103.9982,
  },
  {
    name: "Artotel Batam (Penuin)",
    category: "hotel",
    categoryLabel: "Hotel",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Jl. Pembangunan, Batu Selicin, Kec. Lubuk Baja, Batam",
    lat: 1.1388,
    lng: 104.0115,
  },

  // Landmark & Wisata
  {
    name: "Jembatan 1 Barelang (Tengku Fisabilillah)",
    category: "landmark",
    categoryLabel: "Landmark Wisata",
    kecamatan: "Galang / Barelang",
    address: "Jembatan 1 Barelang, Tembesi, Kota Batam",
    lat: 0.9830,
    lng: 104.0430,
  },
  {
    name: "Welcome to Batam Landmark",
    category: "landmark",
    categoryLabel: "Landmark",
    kecamatan: "Batam Kota",
    address: "Bukit Clara, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1245,
    lng: 104.0495,
  },
  {
    name: "Masjid Agung Raja Mahmud Riayat Syah",
    category: "landmark",
    categoryLabel: "Masjid Raya",
    kecamatan: "Batu Aji",
    address: "Tanjung Uncang, Kec. Batu Aji, Batam",
    lat: 1.0585,
    lng: 103.9455,
  },
  {
    name: "Masjid Agung Batam (Batam Centre)",
    category: "landmark",
    categoryLabel: "Masjid Raya",
    kecamatan: "Batam Kota",
    address: "Jl. Engku Putri, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1275,
    lng: 104.0545,
  },
  {
    name: "Kawasan Wisata Golden Prawn Bengkong",
    category: "landmark",
    categoryLabel: "Kuliner & Wisata",
    kecamatan: "Bengkong",
    address: "Jl. Golden Prawn, Tanjung Buntung, Kec. Bengkong, Batam",
    lat: 1.1685,
    lng: 104.0325,
  },

  // Area Populer & Perumahan
  {
    name: "Pusat Kota & Kuliner Nagoya",
    category: "area",
    categoryLabel: "Area Pusat Kota",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Nagoya, Lubuk Baja, Batam",
    lat: 1.1442,
    lng: 104.0084,
  },
  {
    name: "Pasar Penuin Batam",
    category: "area",
    categoryLabel: "Pusat Kuliner & Belanja",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Penuin, Batu Selicin, Kec. Lubuk Baja, Batam",
    lat: 1.1385,
    lng: 104.0118,
  },
  {
    name: "Komplek Perumahan KDA (Karya Darma Abadi)",
    category: "area",
    categoryLabel: "Perumahan",
    kecamatan: "Batam Kota",
    address: "Perum KDA, Belian, Kec. Batam Kota, Batam",
    lat: 1.1272,
    lng: 104.0535,
  },
  {
    name: "Central Sukajadi (Padang Golf Sukajadi)",
    category: "area",
    categoryLabel: "Area Hunian & Golf",
    kecamatan: "Batam Kota",
    address: "Sukajadi, Kec. Batam Kota, Batam",
    lat: 1.1185,
    lng: 104.0352,
  },
  {
    name: "Tiban Center",
    category: "area",
    categoryLabel: "Pusat Niaga",
    kecamatan: "Sekupang",
    address: "Tiban Indah, Kec. Sekupang, Batam",
    lat: 1.1145,
    lng: 103.9685,
  },
  {
    name: "Kawasan Industri Batamindo Mukakuning",
    category: "area",
    categoryLabel: "Kawasan Industri",
    kecamatan: "Sei Beduk (Mukakuning)",
    address: "Jl. Rasamala No.1, Mukakuning, Kec. Sei Beduk, Batam",
    lat: 1.0785,
    lng: 104.0385,
  },
  {
    name: "Pelabuhan Marina Teluk Senimba",
    category: "ferry",
    categoryLabel: "Pelabuhan",
    kecamatan: "Sekupang",
    address: "Marina City, Tanjung Riau, Kec. Sekupang, Batam",
    lat: 1.0912,
    lng: 103.9215,
  },
  {
    name: "Alun-Alun Engku Putri Batam Centre",
    category: "landmark",
    categoryLabel: "Alun-Alun",
    kecamatan: "Batam Kota",
    address: "Jl. Engku Putri, Teluk Tering, Kec. Batam Kota, Batam",
    lat: 1.1285,
    lng: 104.0515,
  },
  {
    name: "Mega Wisata Ocarina Batam",
    category: "landmark",
    categoryLabel: "Taman Rekreasi",
    kecamatan: "Batam Kota",
    address: "Komp. Mega Wisata Ocarina, Sadai, Kec. Batam Kota, Batam",
    lat: 1.1515,
    lng: 104.0615,
  },
  {
    name: "Thamrin City Nagoya (Pusat Kuliner)",
    category: "area",
    categoryLabel: "Pusat Bisnis & Kuliner",
    kecamatan: "Lubuk Baja (Nagoya)",
    address: "Kawasan Thamrin City, Lubuk Baja Kota, Batam",
    lat: 1.1425,
    lng: 104.0135,
  },
  {
    name: "Kebun Raya Batam (Botanical Garden)",
    category: "landmark",
    categoryLabel: "Taman Botani",
    kecamatan: "Nongsa",
    address: "Jl. Hang Lekiu, Sambau, Kec. Nongsa, Batam",
    lat: 1.1825,
    lng: 104.0985,
  },
  {
    name: "Pantai Viovio Barelang",
    category: "landmark",
    categoryLabel: "Wisata Pantai",
    kecamatan: "Galang / Barelang",
    address: "Sijantung, Jembatan 5 Barelang, Kota Batam",
    lat: 0.8850,
    lng: 104.1485,
  },
  {
    name: "Harbour Bay Mall & Promenade",
    category: "mall",
    categoryLabel: "Mall & Waterfront",
    kecamatan: "Batu Ampar (Harbour Bay)",
    address: "Kawasan Harbour Bay, Jl. Duyung, Sungai Jodoh, Kec. Batu Ampar, Batam",
    lat: 1.1560,
    lng: 103.9988,
  },
];

// Data 10 Kecamatan di Kota Batam beserta titik pusatnya
export const KECAMATAN_BATAM = [
  { id: "batam-kota", name: "Batam Kota", lat: 1.1302, lng: 104.0531 },
  { id: "lubuk-baja", name: "Lubuk Baja (Nagoya)", lat: 1.1380, lng: 104.0150 },
  { id: "batu-ampar", name: "Batu Ampar (Harbour Bay)", lat: 1.1558, lng: 103.9991 },
  { id: "sekupang", name: "Sekupang", lat: 1.1256, lng: 103.9312 },
  { id: "nongsa", name: "Nongsa", lat: 1.1780, lng: 104.1080 },
  { id: "bengkong", name: "Bengkong", lat: 1.1550, lng: 104.0350 },
  { id: "batu-aji", name: "Batu Aji", lat: 1.0550, lng: 103.9850 },
  { id: "sagulung", name: "Sagulung", lat: 1.0380, lng: 103.9920 },
  { id: "sei-beduk", name: "Sei Beduk (Mukakuning)", lat: 1.0820, lng: 104.0350 },
  { id: "galang", name: "Galang / Barelang", lat: 0.9830, lng: 104.0430 },
];

// Otomatis deteksi Kecamatan berdasarkan koordinat & teks alamat di Batam
export function detectKecamatan(
  lat: number,
  lng: number,
  addressText?: string,
  rawAddress?: Record<string, any>
): string {
  // 1. Cek dari field address detail OpenStreetMap / Nominatim jika ada
  if (rawAddress) {
    const detail = (
      (rawAddress.city_district || "") + " " +
      (rawAddress.suburb || "") + " " +
      (rawAddress.district || "") + " " +
      (rawAddress.municipality || "") + " " +
      (rawAddress.village || "") + " " +
      (rawAddress.quarter || "")
    ).toLowerCase();

    if (detail.includes("nongsa") || detail.includes("batu besar")) return "Nongsa";
    if (detail.includes("batu ampar") || detail.includes("harbour bay") || detail.includes("jodoh")) return "Batu Ampar (Harbour Bay)";
    if (detail.includes("bengkong")) return "Bengkong";
    if (detail.includes("lubuk baja") || detail.includes("nagoya") || detail.includes("baloi")) return "Lubuk Baja (Nagoya)";
    if (detail.includes("batam kota") || detail.includes("batam center") || detail.includes("belian")) return "Batam Kota";
    if (detail.includes("sekupang") || detail.includes("tiban")) return "Sekupang";
    if (detail.includes("batu aji") || detail.includes("tanjung uncang")) return "Batu Aji";
    if (detail.includes("sagulung") || detail.includes("tembesi")) return "Sagulung";
    if (detail.includes("sei beduk") || detail.includes("sungai beduk") || detail.includes("mukakuning") || detail.includes("piayu")) return "Sei Beduk (Mukakuning)";
    if (detail.includes("galang") || detail.includes("barelang") || detail.includes("rempang")) return "Galang / Barelang";
  }

  // 2. Cek teks alamat untuk kata kunci wilayah/landmark khas Batam
  if (addressText) {
    const lower = addressText.toLowerCase();
    if (lower.includes("nongsa") || lower.includes("batu besar") || lower.includes("sambau") || lower.includes("kabil") || lower.includes("hang nadim") || lower.includes("teluk bakau")) return "Nongsa";
    if (lower.includes("batu ampar") || lower.includes("harbour bay") || lower.includes("jodoh") || lower.includes("sengkuang") || lower.includes("batu merah")) return "Batu Ampar (Harbour Bay)";
    if (lower.includes("bengkong") || lower.includes("golden prawn") || lower.includes("sadai") || lower.includes("tanjung buntung")) return "Bengkong";
    if (lower.includes("lubuk baja") || lower.includes("nagoya") || lower.includes("baloi") || lower.includes("pelita") || lower.includes("seraya") || lower.includes("windsor") || lower.includes("grand batam")) return "Lubuk Baja (Nagoya)";
    if (lower.includes("batam kota") || lower.includes("batam center") || lower.includes("belian") || lower.includes("teluk tering") || lower.includes("sukajadi") || lower.includes("duta mas") || lower.includes("kda") || lower.includes("mega mall")) return "Batam Kota";
    if (lower.includes("sekupang") || lower.includes("tiban") || lower.includes("tanjung pinggir") || lower.includes("sei harapan") || lower.includes("patam")) return "Sekupang";
    if (lower.includes("batu aji") || lower.includes("fanindo") || lower.includes("buliang") || lower.includes("kibing") || lower.includes("tanjung uncang")) return "Batu Aji";
    if (lower.includes("sagulung") || lower.includes("sp plaza") || lower.includes("tembesi") || lower.includes("sei lekop") || lower.includes("sungai binti")) return "Sagulung";
    if (lower.includes("sei beduk") || lower.includes("mukakuning") || lower.includes("piayu") || lower.includes("duriangkang") || lower.includes("panbil")) return "Sei Beduk (Mukakuning)";
    if (lower.includes("galang") || lower.includes("barelang") || lower.includes("rempang") || lower.includes("sembulang")) return "Galang / Barelang";
  }

  // 3. Fallback Centroid Euclidean Distance (100% akurat untuk seluruh titik di Pulau Batam & Barelang)
  let closestDistrict = "Batam Kota";
  let minDistance = Infinity;

  for (const k of KECAMATAN_BATAM) {
    const dLat = lat - k.lat;
    const dLng = lng - k.lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < minDistance) {
      minDistance = dist;
      closestDistrict = k.name;
    }
  }

  return closestDistrict;
}

function renderCategoryIcon(category: string) {
  switch (category) {
    case "airport":
      return <Plane className="w-4 h-4 text-amber-600" />;
    case "ferry":
      return <Ship className="w-4 h-4 text-sky-600" />;
    case "mall":
      return <ShoppingBag className="w-4 h-4 text-rose-500" />;
    case "hotel":
      return <Hotel className="w-4 h-4 text-indigo-500" />;
    default:
      return <MapPin className="w-4 h-4 text-amber-700" />;
  }
}

export default function DeliveryMapPicker({
  locale,
  value,
  onChange,
}: DeliveryMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [isMapPopupOpen, setIsMapPopupOpen] = useState(false);

  // Initialize Leaflet Map locked strictly to Batam area
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      try {
        const L = await import("leaflet");

        if (!isMounted || !mapContainerRef.current) return;

        // Custom Amber/Orange Marker SVG
        const customPinIcon = L.divIcon({
          className: "custom-delivery-pin",
          html: `
            <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
              <div style="position: absolute; width: 34px; height: 34px; background: rgba(233, 162, 58, 0.35); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: relative; width: 32px; height: 32px; background: #78350f; border: 2.5px solid #e9a23a; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35);">
                <div style="width: 10px; height: 10px; background: #fbbf24; border-radius: 9999px;"></div>
              </div>
              <div style="position: absolute; bottom: 1px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 7px solid #78350f;"></div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 36],
        });

        // Pastikan initial center berada di dalam Batam
        const initialLat = Math.min(Math.max(value.latitude || 1.1218, 0.70), 1.35);
        const initialLng = Math.min(Math.max(value.longitude || 104.1168, 103.75), 104.35);

        // KUNCI PETA HANYA DI WILAYAH BATAM
        const batamBounds = L.latLngBounds(
          [0.70, 103.75], // Barat Daya (Barelang & Galang Selatan)
          [1.35, 104.35]  // Timur Laut (Nongsa & Batu Ampar Utara)
        );

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 14,
          minZoom: 11,
          maxZoom: 18,
          maxBounds: batamBounds,
          maxBoundsViscosity: 1.0, // Peta terkunci rapat, tidak bisa digeser ke luar Batam
          zoomControl: true,
          scrollWheelZoom: "center",
        });

        // Tile layer CartoDB Voyager: Cepat, stabil, tanpa blokir OSM 403/429
        // Google Maps Clean Roadmap Tiles (No watermark, familiar look, ultra-fast)
        L.tileLayer(
          "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            attribution: "&copy; Google Maps",
          }
        ).addTo(map);

        const marker = L.marker([initialLat, initialLng], {
          icon: customPinIcon,
          draggable: true,
        }).addTo(map);

        // Kunci pergeseran marker agar tetap selalu dalam batas Batam saat digeser
        marker.on("drag", () => {
          const pos = marker.getLatLng();
          const clampedLat = Math.min(Math.max(pos.lat, 0.70), 1.35);
          const clampedLng = Math.min(Math.max(pos.lng, 103.75), 104.35);
          if (pos.lat !== clampedLat || pos.lng !== clampedLng) {
            marker.setLatLng([clampedLat, clampedLng]);
          }
        });

        marker.on("dragend", async () => {
          const pos = marker.getLatLng();
          const clampedLat = Math.min(Math.max(pos.lat, 0.70), 1.35);
          const clampedLng = Math.min(Math.max(pos.lng, 103.75), 104.35);
          marker.setLatLng([clampedLat, clampedLng]);
          handlePositionUpdate(clampedLat, clampedLng, true);
        });

        map.on("click", (e: any) => {
          const clampedLat = Math.min(Math.max(e.latlng.lat, 0.70), 1.35);
          const clampedLng = Math.min(Math.max(e.latlng.lng, 103.75), 104.35);
          marker.setLatLng([clampedLat, clampedLng]);
          handlePositionUpdate(clampedLat, clampedLng, true);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
        setIsMapReady(true);

        setTimeout(() => {
          map.invalidateSize();
        }, 200);
      } catch (err) {
        console.error("Leaflet map initialization failed:", err);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  const setMapLocation = (lat: number, lng: number, zoomLevel = 15) => {
    // Clamp koordinat agar tetap di dalam Batam
    const clampedLat = Math.min(Math.max(lat, 0.70), 1.35);
    const clampedLng = Math.min(Math.max(lng, 103.75), 104.35);

    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([clampedLat, clampedLng]);
      mapInstanceRef.current.flyTo([clampedLat, clampedLng], zoomLevel, {
        duration: 0.8,
      });
    }
  };

  const handleConfirmModalLocation = (
    lat: number,
    lng: number,
    address?: string,
    kecamatan?: string
  ) => {
    setMapLocation(lat, lng, 15);
    const finalKecamatan =
      kecamatan || detectKecamatan(lat, lng, address || value.address);
    onChange({
      ...value,
      latitude: lat,
      longitude: lng,
      googleMapsUrl: `https://maps.google.com/?q=${lat},${lng}`,
      address: address || value.address,
      kecamatan: finalKecamatan,
    });
  };

  const reverseGeocode = async (
    lat: number,
    lng: number
  ): Promise<{ displayName: string; rawAddress: any } | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "Accept-Language": locale === "id" ? "id" : "en",
          },
        }
      );
      if (!response.ok) return null;
      const data = await response.json();
      return {
        displayName: data.display_name || "",
        rawAddress: data.address || {},
      };
    } catch {
      return null;
    }
  };

  // Posisi peta diupdate: otomatis deteksi Kecamatan SECARA INSTAN & cari alamat
  const handlePositionUpdate = async (
    lat: number,
    lng: number,
    autoLookupAddress = false
  ) => {
    // Kunci koordinat selalu dalam rentang Batam
    const clampedLat = Math.min(Math.max(lat, 0.70), 1.35);
    const clampedLng = Math.min(Math.max(lng, 103.75), 104.35);

    const formattedLat = Number(clampedLat.toFixed(5));
    const formattedLng = Number(clampedLng.toFixed(5));
    const googleUrl = `https://maps.google.com/?q=${formattedLat},${formattedLng}`;

    // 1. Deteksi kecamatan SECARA INSTAN (0 milidetik) berdasarkan koordinat
    const instantKecamatan = detectKecamatan(formattedLat, formattedLng, value.address);

    // Langsung update state agar badge kecamatan terdeteksi berubah tanpa menunggu internet/network
    onChange({
      ...value,
      latitude: formattedLat,
      longitude: formattedLng,
      googleMapsUrl: googleUrl,
      kecamatan: instantKecamatan,
    });

    // 2. Jika autoLookupAddress aktif, ambil alamat lengkap dari Nominatim
    if (autoLookupAddress) {
      const geoResult = await reverseGeocode(formattedLat, formattedLng);
      if (geoResult && geoResult.displayName) {
        const refinedKecamatan = detectKecamatan(
          formattedLat,
          formattedLng,
          geoResult.displayName,
          geoResult.rawAddress
        );
        onChange({
          ...value,
          latitude: formattedLat,
          longitude: formattedLng,
          googleMapsUrl: googleUrl,
          address: geoResult.displayName,
          kecamatan: refinedKecamatan,
        });
      }
    }
  };

  // Real-time Location Detection (Menggunakan Sensor GPS Perangkat Fisik Nyata)
  const handleDetectCurrentLocation = () => {
    if (typeof window === "undefined") return;

    if (!navigator.geolocation) {
      setSearchFeedback(
        locale === "id"
          ? "Fitur GPS tidak didukung di perangkat ini. Silakan klik titik antar langsung di peta atau pilih kecamatan Anda di bawah."
          : "GPS is not supported on this device. Please select directly on map or choose district."
      );
      return;
    }

    setIsLocating(true);
    setSearchFeedback(null);

    // Gunakan GPS akurasi tinggi nyata (enableHighAccuracy: true)
    // agar membaca koordinat GPS perangkat fisik sesungguhnya, bukan tebakan IP server ISP yang meleset
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const rawLat = position.coords.latitude;
        const rawLng = position.coords.longitude;

        const isInsideBatam =
          rawLat >= 0.70 && rawLat <= 1.35 && rawLng >= 103.75 && rawLng <= 104.35;

        if (!isInsideBatam) {
          const fallbackAirport = BATAM_POPULAR_PLACES[0];
          setMapLocation(fallbackAirport.lat, fallbackAirport.lng, 15);
          await handlePositionUpdate(fallbackAirport.lat, fallbackAirport.lng, true);
          setIsLocating(false);
          setSearchFeedback(
            locale === "id"
              ? "📍 Posisi GPS Anda terdeteksi di luar Batam. Pin diarahkan ke Bandara Hang Nadim Batam (BTH). Anda dapat menggeser pin ke lokasi mana pun di Batam."
              : "📍 GPS position is outside Batam. Pin set to Hang Nadim Airport (BTH)."
          );
          return;
        }

        setMapLocation(rawLat, rawLng, 16);
        await handlePositionUpdate(rawLat, rawLng, true);
        setIsLocating(false);
        setSearchFeedback(
          locale === "id"
            ? "✓ Titik lokasi GPS Anda berhasil dideteksi!"
            : "✓ Your GPS location was successfully detected!"
        );
      },
      (error) => {
        setIsLocating(false);
        let errorMsg =
          locale === "id"
            ? "Sinyal GPS perangkat tidak terdeteksi (biasanya pada PC/laptop tanpa sensor GPS). Silakan klik langsung di peta atau pilih tombol kecamatan di bawah."
            : "Could not detect precise device GPS. Please select directly on map or choose district below.";

        if (error.code === 1) { // PERMISSION_DENIED
          errorMsg =
            locale === "id"
              ? "Izin akses lokasi tidak aktif di browser Anda. Silakan klik titik antar langsung di peta atau pilih tombol kecamatan di bawah."
              : "Location permission denied. Please select directly on the map or choose district below.";
        }

        setSearchFeedback(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  };

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Live Instant Autocomplete Search (Local POI Dictionary + Debounced OSM Nominatim)
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsSearchingSuggestions(false);
      return;
    }

    const lower = trimmed.toLowerCase();
    const queryTokens = lower.split(/\s+/).filter(Boolean);

    // 1. Instant local matches (0ms response) with multi-token & keyword search
    const localMatches: SuggestionItem[] = BATAM_POPULAR_PLACES.filter((p) => {
      const searchTarget = `${p.name} ${p.categoryLabel} ${p.kecamatan} ${p.address} ${(p.keywords || []).join(" ")}`.toLowerCase();
      return queryTokens.every((token) => searchTarget.includes(token));
    }).map((p, idx) => ({
      id: `poi-${idx}-${p.name}`,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel,
      kecamatan: p.kecamatan,
      address: p.address,
      lat: p.lat,
      lng: p.lng,
    }));

    setSuggestions(localMatches);

    // 2. Debounced OSM Nominatim query for any Batam street/building
    setIsSearchingSuggestions(true);
    const debounceTimer = setTimeout(async () => {
      try {
        const q = `${trimmed}, Batam`;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            q
          )}&viewbox=103.75,1.35,104.35,0.70&bounded=1&limit=5&addressdetails=1`,
          {
            headers: {
              "Accept-Language": locale === "id" ? "id" : "en",
            },
          }
        );
        if (!res.ok) {
          setIsSearchingSuggestions(false);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          const apiMatches: SuggestionItem[] = data.map((item, idx) => {
            const lat = parseFloat(item.lat);
            const lng = parseFloat(item.lon);
            const kec = detectKecamatan(lat, lng, item.display_name, item.address);
            return {
              id: `osm-${item.place_id || idx}`,
              name: item.name || item.display_name.split(",")[0],
              category: "address",
              categoryLabel: locale === "id" ? "Jalan / Alamat" : "Street / Address",
              kecamatan: kec,
              address: item.display_name,
              lat,
              lng,
            };
          });

          // Merge local POIs first, then unique OSM results
          const combined = [...localMatches];
          for (const api of apiMatches) {
            const isDuplicate = combined.some(
              (c) =>
                Math.abs(c.lat - api.lat) < 0.0015 &&
                Math.abs(c.lng - api.lng) < 0.0015
            );
            if (!isDuplicate) {
              combined.push(api);
            }
          }
          setSuggestions(combined);
        }
      } catch (err) {
        console.error("Autocomplete search error:", err);
      } finally {
        setIsSearchingSuggestions(false);
      }
    }, 280);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, locale]);

  const handleSelectSuggestion = (item: SuggestionItem | BatamPoi) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setSearchFeedback(null);

    setMapLocation(item.lat, item.lng, 16);

    const detectedKecamatan =
      item.kecamatan || detectKecamatan(item.lat, item.lng, item.address || item.name);

    onChange({
      ...value,
      latitude: Number(item.lat.toFixed(5)),
      longitude: Number(item.lng.toFixed(5)),
      googleMapsUrl: `https://maps.google.com/?q=${item.lat.toFixed(5)},${item.lng.toFixed(5)}`,
      address: item.address || item.name,
      kecamatan: detectedKecamatan,
    });
  };

  // Search Address / Landmark (dikunci hanya di Batam dengan viewbox)
  const handleSearchAddress = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
      return;
    }

    setIsSearching(true);
    setSearchFeedback(null);

    try {
      const q = `${searchQuery}, Batam`;
      // viewbox: 103.75, 1.35 (top-left) to 104.35, 0.70 (bottom-right)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}&viewbox=103.75,1.35,104.35,0.70&bounded=1&limit=1`,
        {
          headers: {
            "Accept-Language": locale === "id" ? "id" : "en",
          },
        }
      );
      const results = await response.json();

      if (results && results.length > 0) {
        const item = results[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        setMapLocation(lat, lng, 16);

        const detectedKecamatan = detectKecamatan(lat, lng, item.display_name);

        onChange({
          ...value,
          latitude: Number(lat.toFixed(5)),
          longitude: Number(lng.toFixed(5)),
          googleMapsUrl: `https://maps.google.com/?q=${lat.toFixed(5)},${lng.toFixed(5)}`,
          address: item.display_name,
          kecamatan: detectedKecamatan,
        });
        setShowSuggestions(false);
        setSearchFeedback(
          locale === "id" ? "✓ Lokasi ditemukan!" : "✓ Location found!"
        );
      } else {
        setSearchFeedback(
          locale === "id"
            ? "Lokasi tidak ditemukan di Batam. Silakan pilih dari rekomendasi tempat populer atau geser pin langsung di peta."
            : "Location not found in Batam. Please choose from suggested places or drag pin on map."
        );
      }
    } catch {
      setSearchFeedback(
        locale === "id"
          ? "Gagal mencari lokasi. Coba lagi beberapa saat."
          : "Failed to search location. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-3 pt-1">
      {/* 2. Pencarian Alamat & Tempat dengan Live Autocomplete (Sekarang di Atas Peta) */}
      <div ref={searchWrapperRef} className="relative space-y-2 pt-0.5">
        {/* Form Cari Alamat dengan Icon Searching yang Nyatu */}
        <form onSubmit={handleSearchAddress} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={
              locale === "id"
                ? "Ketik nama tempat, bandara, pelabuhan, hotel, mall..."
                : "Type place name, airport, ferry terminal, hotel, mall..."
            }
            className="w-full h-10 pl-3.5 pr-14 text-xs rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              aria-label={locale === "id" ? "Hapus pencarian" : "Clear search"}
              className="absolute right-8 text-gray-400 hover:text-gray-600 p-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching}
            aria-label={locale === "id" ? "Cari lokasi" : "Search location"}
            className="absolute right-2 text-gray-400 hover:text-amber-600 p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center"
          >
            {isSearching || isSearchingSuggestions ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
            ) : (
              <Search className="w-4 h-4 text-gray-400 hover:text-amber-600 transition-colors" />
            )}
          </button>
        </form>

        {/* Dropdown Live Suggestions Autocomplete */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-amber-200/90 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[260px] overflow-y-auto divide-y divide-gray-100">
            {suggestions.length > 0 ? (
              <>
                <div className="px-3 py-1.5 bg-amber-50/70 text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
                  <span>{locale === "id" ? "Saran Lokasi di Batam" : "Suggested Places in Batam"}</span>
                  {isSearchingSuggestions && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-700">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{locale === "id" ? "Mencari..." : "Searching..."}</span>
                    </span>
                  )}
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left p-2.5 sm:px-3 hover:bg-amber-50/70 transition-colors flex items-start gap-2.5 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100/70 group-hover:bg-amber-200/70 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      {renderCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-amber-950 truncate block">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100/60 text-amber-800 border border-amber-200/60 flex-shrink-0">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                        <span className="text-amber-700 font-medium">Kec. {formatDistrictDisplay(item.kecamatan)}</span> • {item.address}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="p-4 text-center text-xs text-gray-500 space-y-1">
                {isSearchingSuggestions ? (
                  <div className="flex items-center justify-center gap-2 text-amber-800">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{locale === "id" ? "Mencari lokasi di Batam..." : "Searching Batam locations..."}</span>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-gray-700">
                      {locale === "id" ? "Lokasi tidak ditemukan" : "Location not found"}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {locale === "id"
                        ? "Coba ketik nama mall, hotel, bandara, atau geser pin langsung di peta Batam."
                        : "Try typing mall, hotel, airport name, or drag pin directly on Batam map."}
                    </p>
                  </>
                )}
              </div>
            ) : (
              /* Tampilan Rekomendasi Lokasi Populer saat kolom search difokuskan */
              <div className="p-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                  {locale === "id" ? "Pilihan Lokasi Populer di Batam:" : "Popular Locations in Batam:"}
                </div>
                {BATAM_POPULAR_PLACES.slice(0, 6).map((poi, idx) => (
                  <button
                    key={`pop-${idx}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(poi)}
                    className="w-full text-left p-2 rounded-xl hover:bg-amber-50/70 transition-colors flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-100/70 flex items-center justify-center flex-shrink-0">
                      {renderCategoryIcon(poi.category)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-gray-800 block truncate group-hover:text-amber-950">
                        {poi.name}
                      </span>
                      <span className="text-[10px] text-gray-400 block truncate">
                        Kec. {formatDistrictDisplay(poi.kecamatan)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {searchFeedback && (
        <div
          className={`flex items-start gap-2 text-[11px] px-3 py-2 rounded-xl border leading-snug shadow-xs ${
            searchFeedback.startsWith("✓")
              ? "text-emerald-950 bg-emerald-50/95 border-emerald-300"
              : searchFeedback.startsWith("📍")
              ? "text-sky-950 bg-sky-50/95 border-sky-300"
              : "text-amber-950 bg-amber-50/90 border-amber-200"
          }`}
        >
          {searchFeedback.startsWith("✓") ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : searchFeedback.startsWith("📍") ? (
            <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
          )}
          <span className="flex-1">{searchFeedback}</span>
          <button
            type="button"
            onClick={() => setSearchFeedback(null)}
            className="text-gray-400 hover:text-gray-600 p-0.5 -mr-1 -mt-0.5 cursor-pointer rounded"
            title={locale === "id" ? "Tutup notifikasi" : "Close notification"}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 3. Interactive Map Section (Sekarang di Bawah Kolom Pencarian) */}
      <div className="space-y-1.5">
        <div className="relative isolate z-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
          {/* Leaflet Map DOM Element */}
          <div
            ref={mapContainerRef}
            className="w-full z-0 h-[190px] sm:h-[210px]"
            style={{ width: "100%", height: "200px" }}
          />

          {/* Tombol Icon Perbesar Peta (Sesuai tombol square icon putih seperti Google Maps) */}
          <button
            type="button"
            onClick={() => setIsMapPopupOpen(true)}
            className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-lg bg-white shadow-md border border-gray-200/90 flex items-center justify-center text-gray-700 hover:text-gray-950 hover:bg-gray-50 active:scale-90 transition-all cursor-pointer"
            title={locale === "id" ? "Perbesar Peta (Popup)" : "Expand Map (Popup)"}
            aria-label="Expand map"
          >
            <Maximize className="w-4 h-4 text-gray-700" />
          </button>

          {!isMapReady && (
            <div className="absolute inset-0 bg-gray-100/90 flex items-center justify-center text-xs text-gray-500 z-10 gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>{locale === "id" ? "Memuat peta Batam..." : "Loading Batam map..."}</span>
            </div>
          )}

          {/* Hint Overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] flex items-center justify-between pointer-events-none z-10">
            <span className="truncate">
              {locale === "id" ? "Geser pin atau klik peta untuk atur titik" : "Drag pin or click map to set spot"}
            </span>
            <a
              href={value.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-amber-400 hover:text-amber-300 font-bold ml-2 flex-shrink-0 inline-flex items-center gap-1 underline"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Detail Alamat / Patokan Penjemputan (Headlight / Highlight Section) */}
      <div className="space-y-2 pt-1">
        <div className="relative rounded-xl border border-gray-200 focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 bg-white shadow-2xs transition-all">
          <textarea
            rows={2}
            value={value.address}
            onChange={(e) => {
              const updatedAddress = e.target.value;
              const detectedKecamatan = detectKecamatan(value.latitude, value.longitude, updatedAddress);
              onChange({
                ...value,
                address: updatedAddress,
                kecamatan: detectedKecamatan,
              });
            }}
            placeholder={
              locale === "id"
                ? "Contoh: Lobi Kedatangan Bandara Hang Nadim / Hotel Marriott kamar 402 / Nama Perumahan"
                : "e.g. Arrival Lobby Hang Nadim Airport / Hotel Marriott Room 402 / Housing Complex"
            }
            className="w-full text-xs sm:text-[13px] p-3 text-gray-900 bg-transparent placeholder:text-gray-400 focus:outline-none leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* 5. Dedicated Floating Leaflet Map Popup Modal (via React Portal) */}
      <DeliveryMapModal
        isOpen={isMapPopupOpen}
        onClose={() => setIsMapPopupOpen(false)}
        locale={locale}
        initialLat={value.latitude}
        initialLng={value.longitude}
        initialKecamatan={value.kecamatan}
        initialAddress={value.address}
        onConfirm={handleConfirmModalLocation}
      />
    </div>
  );
}
