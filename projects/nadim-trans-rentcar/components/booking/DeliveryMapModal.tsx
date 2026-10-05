"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n";
import {
  MapPin,
  Search,
  LocateFixed,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Plane,
  Ship,
  ShoppingBag,
  Hotel,
} from "lucide-react";
import {
  BATAM_POPULAR_PLACES,
  detectKecamatan,
  formatDistrictDisplay,
  type SuggestionItem,
  type BatamPoi,
} from "./DeliveryMapPicker";

export interface DeliveryMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  initialLat: number;
  initialLng: number;
  initialKecamatan: string;
  initialAddress: string;
  onConfirm: (
    lat: number,
    lng: number,
    address?: string,
    kecamatan?: string
  ) => void;
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

export default function DeliveryMapModal({
  isOpen,
  onClose,
  locale,
  initialLat,
  initialLng,
  initialKecamatan,
  initialAddress,
  onConfirm,
}: DeliveryMapModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalMapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const [currentLat, setCurrentLat] = useState(initialLat || 1.1218);
  const [currentLng, setCurrentLng] = useState(initialLng || 104.1168);
  const [currentKecamatan, setCurrentKecamatan] = useState(
    initialKecamatan || "Batam Kota"
  );
  const [currentAddress, setCurrentAddress] = useState(initialAddress || "");

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update initial coordinates when modal opens
  useEffect(() => {
    if (isOpen) {
      const lat = Math.min(Math.max(initialLat || 1.1218, 0.7), 1.35);
      const lng = Math.min(Math.max(initialLng || 104.1168, 103.75), 104.35);
      setCurrentLat(lat);
      setCurrentLng(lng);
      setCurrentKecamatan(
        initialKecamatan || detectKecamatan(lat, lng, initialAddress)
      );
      setCurrentAddress(initialAddress || "");
      setSearchQuery("");
      setShowSuggestions(false);
      setFeedbackMsg(null);
    }
  }, [isOpen, initialLat, initialLng, initialKecamatan, initialAddress]);

  // Lock body scroll and listen to Escape key
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close search suggestions on click outside
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

  // Autocomplete search
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsSearchingSuggestions(false);
      return;
    }

    const lower = trimmed.toLowerCase();
    const queryTokens = lower.split(/\s+/).filter(Boolean);

    const localMatches: SuggestionItem[] = BATAM_POPULAR_PLACES.filter((p) => {
      const searchTarget = `${p.name} ${p.categoryLabel} ${p.kecamatan} ${p.address} ${(p.keywords || []).join(" ")}`.toLowerCase();
      return queryTokens.every((token) => searchTarget.includes(token));
    }).map((p, idx) => ({
      id: `modal-poi-${idx}-${p.name}`,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel,
      kecamatan: p.kecamatan,
      address: p.address,
      lat: p.lat,
      lng: p.lng,
    }));

    setSuggestions(localMatches);

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
              id: `modal-osm-${item.place_id || idx}`,
              name: item.name || item.display_name.split(",")[0],
              category: "address",
              categoryLabel:
                locale === "id" ? "Jalan / Alamat" : "Street / Address",
              kecamatan: kec,
              address: item.display_name,
              lat,
              lng,
            };
          });

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

  // Inisialisasi Map Leaflet khusus di dalam Modal saat dibuka
  useEffect(() => {
    if (!isOpen || !mounted) return;

    let isSubscribed = true;
    let t1: any = null;
    let t2: any = null;

    async function initModalMap() {
      if (!modalMapContainerRef.current) return;
      const L = await import("leaflet");
      if (!isSubscribed || !modalMapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }

      const customPinIcon = L.divIcon({
        className: "custom-delivery-pin",
        html: `
          <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
            <div style="position: absolute; width: 38px; height: 38px; background: rgba(233, 162, 58, 0.4); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 34px; height: 34px; background: #78350f; border: 2.5px solid #e9a23a; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.4);">
              <div style="width: 12px; height: 12px; background: #fbbf24; border-radius: 9999px;"></div>
            </div>
            <div style="position: absolute; bottom: 0px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #78350f;"></div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 40],
      });

      const batamBounds = L.latLngBounds([0.7, 103.75], [1.35, 104.35]);

      const lat = Math.min(Math.max(currentLat || 1.1218, 0.7), 1.35);
      const lng = Math.min(Math.max(currentLng || 104.1168, 103.75), 104.35);

      const map = L.map(modalMapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        minZoom: 11,
        maxZoom: 18,
        maxBounds: batamBounds,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
      });

      // Google Maps Clean Roadmap Tiles (No watermark, familiar look, ultra-fast)
      L.tileLayer(
        "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          attribution: "&copy; Google Maps",
        }
      ).addTo(map);

      const marker = L.marker([lat, lng], {
        icon: customPinIcon,
        draggable: true,
      }).addTo(map);

      const updateCoordinates = (newLat: number, newLng: number) => {
        const cLat = Math.min(Math.max(newLat, 0.7), 1.35);
        const cLng = Math.min(Math.max(newLng, 103.75), 104.35);
        const formattedLat = Number(cLat.toFixed(5));
        const formattedLng = Number(cLng.toFixed(5));
        setCurrentLat(formattedLat);
        setCurrentLng(formattedLng);
        const detected = detectKecamatan(formattedLat, formattedLng, currentAddress);
        setCurrentKecamatan(detected);
      };

      marker.on("drag", () => {
        const pos = marker.getLatLng();
        const cLat = Math.min(Math.max(pos.lat, 0.7), 1.35);
        const cLng = Math.min(Math.max(pos.lng, 103.75), 104.35);
        if (pos.lat !== cLat || pos.lng !== cLng) {
          marker.setLatLng([cLat, cLng]);
        }
      });

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        updateCoordinates(pos.lat, pos.lng);
      });

      map.on("click", (e: any) => {
        const cLat = Math.min(Math.max(e.latlng.lat, 0.7), 1.35);
        const cLng = Math.min(Math.max(e.latlng.lng, 103.75), 104.35);
        marker.setLatLng([cLat, cLng]);
        updateCoordinates(cLat, cLng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Invalidate size once DOM container geometry settles
      t1 = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize(true);
        }
      }, 100);

      t2 = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize(true);
        }
      }, 300);
    }

    initModalMap();

    return () => {
      isSubscribed = false;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen, mounted]);

  const setModalLocation = (lat: number, lng: number) => {
    const cLat = Math.min(Math.max(lat, 0.7), 1.35);
    const cLng = Math.min(Math.max(lng, 103.75), 104.35);
    const formattedLat = Number(cLat.toFixed(5));
    const formattedLng = Number(cLng.toFixed(5));

    setCurrentLat(formattedLat);
    setCurrentLng(formattedLng);

    if (markerRef.current) {
      markerRef.current.setLatLng([cLat, cLng]);
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([cLat, cLng], 16, { duration: 0.8 });
    }
  };

  const handleSelectSuggestion = (item: SuggestionItem | BatamPoi) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setFeedbackMsg(null);

    setModalLocation(item.lat, item.lng);
    const detectedKecamatan =
      item.kecamatan ||
      detectKecamatan(item.lat, item.lng, item.address || item.name);
    setCurrentKecamatan(detectedKecamatan);
    setCurrentAddress(item.address || item.name);
  };

  const handleModalGps = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setFeedbackMsg(
        locale === "id"
          ? "Fitur GPS tidak didukung di perangkat ini."
          : "GPS not supported on this device."
      );
      return;
    }

    setIsLocating(true);
    setFeedbackMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const rawLat = position.coords.latitude;
        const rawLng = position.coords.longitude;
        const isInsideBatam =
          rawLat >= 0.7 && rawLat <= 1.35 && rawLng >= 103.75 && rawLng <= 104.35;

        if (!isInsideBatam) {
          const fallbackAirport = BATAM_POPULAR_PLACES[0];
          setModalLocation(fallbackAirport.lat, fallbackAirport.lng);
          setCurrentKecamatan(fallbackAirport.kecamatan);
          setCurrentAddress(fallbackAirport.address);
          setFeedbackMsg(
            locale === "id"
              ? "📍 Posisi GPS Anda di luar Batam. Pin diarahkan ke Bandara Hang Nadim Batam (BTH)."
              : "📍 GPS outside Batam. Pin set to Hang Nadim Airport (BTH)."
          );
          return;
        }

        setModalLocation(rawLat, rawLng);
        const detected = detectKecamatan(rawLat, rawLng);
        setCurrentKecamatan(detected);
        setFeedbackMsg(
          locale === "id"
            ? "✓ Titik lokasi GPS Anda berhasil dideteksi!"
            : "✓ GPS position detected!"
        );
      },
      (error) => {
        setIsLocating(false);
        setFeedbackMsg(
          error.code === 1
            ? locale === "id"
              ? "Izin akses lokasi tidak aktif. Silakan klik langsung pada peta Batam."
              : "Location permission denied. Please click directly on Batam map."
            : locale === "id"
            ? "Sinyal GPS tidak terdeteksi. Silakan klik langsung pada peta Batam."
            : "GPS signal not found. Please click directly on Batam map."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  };

  if (!isOpen || !mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Floating Centered Modal Card (Not full screen) */}
      <div
        className="relative w-full max-w-4xl h-[88vh] max-h-[660px] bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-between shadow-xs z-20 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950/15 flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block opacity-90 leading-tight">
                {locale === "id"
                  ? "Pilih Titik Pengantaran Mobil"
                  : "Select Delivery Spot"}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-950 block leading-tight">
                Kecamatan {formatDistrictDisplay(currentKecamatan)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{locale === "id" ? "Tutup" : "Close"}</span>
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Sub-header Bar: Search & GPS (Autocomplete) */}
        <div
          ref={searchWrapperRef}
          className="relative px-3 py-2 sm:px-4 sm:py-2.5 bg-amber-50/80 border-b border-amber-200/90 z-30 flex-shrink-0 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
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
                  ? "Cari tempat, bandara, hotel, mall di Batam..."
                  : "Search place, airport, hotel, mall in Batam..."
              }
              className="w-full h-9 pl-9 pr-8 text-xs rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tombol GPS di bar pencarian */}
          <button
            type="button"
            onClick={handleModalGps}
            disabled={isLocating}
            className="h-9 px-3 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer disabled:opacity-60"
            title={locale === "id" ? "Gunakan Lokasi GPS Saya" : "Use GPS"}
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
            ) : (
              <LocateFixed className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span className="hidden sm:inline">
              {locale === "id" ? "Lokasi Saya" : "My Location"}
            </span>
          </button>

          {/* Autocomplete Dropdown List */}
          {showSuggestions && (
            <div className="absolute top-full left-3 right-3 sm:left-4 sm:right-4 mt-1 bg-white border border-amber-200 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[260px] overflow-y-auto divide-y divide-gray-100">
              {suggestions.length > 0 ? (
                <>
                  <div className="px-3 py-1.5 bg-amber-50/70 text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      {locale === "id"
                        ? "Saran Lokasi di Batam"
                        : "Suggested Places in Batam"}
                    </span>
                    {isSearchingSuggestions && (
                      <span className="flex items-center gap-1 text-[10px] text-amber-700">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>
                          {locale === "id" ? "Mencari..." : "Searching..."}
                        </span>
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
                          <span className="text-amber-700 font-medium">
                            Kec. {formatDistrictDisplay(item.kecamatan)}
                          </span>{" "}
                          • {item.address}
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
                      <span>
                        {locale === "id"
                          ? "Mencari lokasi di Batam..."
                          : "Searching Batam locations..."}
                      </span>
                    </div>
                  ) : (
                    <p className="font-semibold text-gray-700">
                      {locale === "id"
                        ? "Lokasi tidak ditemukan di Batam"
                        : "Location not found in Batam"}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                    {locale === "id"
                      ? "Pilihan Tempat Populer Batam:"
                      : "Popular Batam Places:"}
                  </div>
                  {BATAM_POPULAR_PLACES.slice(0, 6).map((poi, idx) => (
                    <button
                      key={`pop-modal-${idx}`}
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

        {/* Feedback Alert Pill */}
        {feedbackMsg && (
          <div
            className={`px-4 py-1.5 text-[11px] font-medium flex items-center justify-between z-20 ${
              feedbackMsg.startsWith("✓")
                ? "bg-emerald-50 text-emerald-950 border-b border-emerald-200"
                : feedbackMsg.startsWith("📍")
                ? "bg-sky-50 text-sky-950 border-b border-sky-200"
                : "bg-amber-50 text-amber-950 border-b border-amber-200"
            }`}
          >
            <span>{feedbackMsg}</span>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Large Interactive Leaflet Map Container */}
        <div className="relative flex-1 w-full min-h-[300px] bg-slate-100 overflow-hidden z-0">
          <div
            ref={modalMapContainerRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Floating Instructions Banner at Bottom of Map */}
          <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-md z-[500] bg-slate-950/85 backdrop-blur-sm text-white px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 pointer-events-none shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="text-[11px] leading-tight">
              {locale === "id"
                ? "Klik di mana saja pada peta atau geser pin untuk menentukan titik penjemputan"
                : "Click map or drag pin to choose delivery spot"}
            </span>
          </div>
        </div>

        {/* Bottom Action Footer Bar */}
        <div className="p-3 sm:px-5 sm:py-3 bg-white border-t border-gray-200 flex items-center justify-between z-10 flex-shrink-0 gap-3">
          <div className="min-w-0 flex-1 text-xs">
            <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-wider">
              {locale === "id" ? "Titik Terpilih:" : "Selected Spot:"}
            </span>
            <p className="font-semibold text-gray-800 truncate text-[11px] sm:text-xs">
              <span className="text-amber-800 font-black">
                Kecamatan {formatDistrictDisplay(currentKecamatan)}
              </span>
              {currentAddress ? ` • ${currentAddress}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all cursor-pointer"
            >
              {locale === "id" ? "Batal" : "Cancel"}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(
                  currentLat,
                  currentLng,
                  currentAddress,
                  currentKecamatan
                );
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>{locale === "id" ? "Gunakan Titik Ini" : "Use This Spot"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
