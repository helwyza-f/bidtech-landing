"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers } from "lucide-react";
import { LOCATIONS_DATA, type LocationData } from "@/lib/data";
import "leaflet/dist/leaflet.css";
import gsap from "gsap";

interface GlobalLocationsProps {
  lang: "en" | "id";
}

// Coordinates of Batam Luxury Enclaves [lat, lng]
const BATAM_HUBS = [
  {
    key: "BATAM",
    name: "Batam Island",
    coords: [1.115, 104.0305] as [number, number],
    zoom: 11,
    desc: "Flagship Architectural Region",
  },
  {
    key: "NONGSA",
    name: "Nongsa Coast",
    coords: [1.1856, 104.1025] as [number, number],
    zoom: 13,
    desc: "Luxury Beachfront & Marina Enclave",
  },
  {
    key: "HARBOURBAY",
    name: "HarbourBay",
    coords: [1.1528, 103.9982] as [number, number],
    zoom: 14,
    desc: "Waterfront Towers & Boardwalk",
  },
  {
    key: "SUKAJADI",
    name: "Sukajadi",
    coords: [1.1124, 104.0321] as [number, number],
    zoom: 14,
    desc: "Championship Golf Course Mansions",
  },
  {
    key: "BARELANG",
    name: "Barelang Islands",
    coords: [0.984, 104.0435] as [number, number],
    zoom: 12,
    desc: "Archipelago Overlook & Island Villas",
  },
];

export default function GlobalLocations({ lang }: GlobalLocationsProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  const [selectedKey, setSelectedKey] = useState<string>("BATAM");
  const [mapTheme, setMapTheme] = useState<"light" | "dark">("light");
  const activeData: LocationData = LOCATIONS_DATA[selectedKey] || LOCATIONS_DATA["BATAM"];

  // Initialize Interactive Map with CartoDB / OSM Clean Editorial Tiles
  useEffect(() => {
    let isMounted = true;
    let map: any = null;
    let resizeObserver: ResizeObserver | null = null;

    if (!mapContainerRef.current || typeof window === "undefined") return;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clear previous map if already initialized
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }

      // Initialize Leaflet Map centered over Batam with scrollWheelZoom disabled
      map = L.map(mapContainerRef.current, {
        center: [1.115, 104.0305],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false, // Prevents intercepting page scroll!
        touchZoom: false,
        dragging: !L.Browser.mobile,
      });

      mapInstanceRef.current = map;

      // ArcGIS World Gray Canvas Tiles (Gold Standard Architectural Cartography, Fast & 100% Free)
      const tileUrl =
        mapTheme === "dark"
          ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

      L.tileLayer(tileUrl, {
        maxZoom: 16,
        attribution: "Esri, HERE, Garmin, © OpenStreetMap contributors",
      }).addTo(map);

      // Add Custom Glowing Pins for Batam Hubs
      BATAM_HUBS.forEach((hub) => {
        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <div class="w-4 h-4 rounded-full bg-black flex items-center justify-center shadow-xl ring-2 ring-white transition-transform duration-300 group-hover:scale-125">
                <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              </div>
              <div class="absolute -inset-2 rounded-full border-2 border-black/30 animate-ping pointer-events-none"></div>
              <div class="absolute top-5 bg-black text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                ${hub.name}
              </div>
            </div>
          `,
          iconSize: [20, 20],
        });

        const marker = L.marker(hub.coords, { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          handleSwitchLocation(hub.key);
        });

        markersRef.current[hub.key] = marker;
      });

      map.whenReady(() => {
        if (!isMounted) return;
        setTimeout(() => {
          if (isMounted && map) {
            try {
              map.invalidateSize();
            } catch (e) {}
          }
        }, 200);
      });

      const handleResize = () => {
        if (isMounted && map) {
          try {
            map.invalidateSize();
          } catch (e) {}
        }
      };

      window.addEventListener("resize", handleResize);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [mapTheme]);

  // Smooth Fly-To / Pan-To Camera Animation on Hub Switch
  const handleSwitchLocation = (key: string) => {
    setSelectedKey(key);

    const targetHub = BATAM_HUBS.find((h) => h.key === key) || BATAM_HUBS[0];

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(targetHub.coords, targetHub.zoom, {
        duration: 1.8,
        easeLinearity: 0.25,
      });
    }

    if (typeof window !== "undefined" && typeof gsap !== "undefined") {
      gsap.fromTo(
        "#loc-title, #loc-sub-list li, #loc-btn-label",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  };

  return (
    <section id="locations" className="py-24 md:py-32 bg-white text-neutral-900 border-b border-[#E5E7EB] select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Description & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
              {lang === "en" ? "LOCATIONS" : "LOKASI"}
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.14]">
              {lang === "en" ? "Where we build." : "Di mana kami membangun."}
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {lang === "en"
                ? "From Batam to the Indonesian archipelago. Explore our live interactive geographic radar across prime island enclaves."
                : "Dari Batam hingga kepulauan Indonesia. Jelajahi radar geografis interaktif kami di berbagai kawasan pulau pilihan."}
            </p>

            {/* View All Locations Action with Underline & Circle Arrow */}
            <div className="pt-2">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <span className="underline decoration-1 underline-offset-4">
                  {lang === "en" ? "VIEW ALL LOCATIONS" : "LIHAT SEMUA LOKASI"}
                </span>
                <div className="w-6 h-6 rounded-full border border-neutral-300 group-hover:border-neutral-900 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Strategic Hubs Metric */}
            <div className="pt-8 border-t border-neutral-200/80">
              <span className="text-3xl font-black text-neutral-900 tabular-numbers block">08</span>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                {lang === "en" ? "Strategic Island Hubs" : "Kawasan Strategis Kepulauan"}
              </p>
            </div>
          </div>

          {/* Center Column: Live Interactive Batam Island Map */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-neutral-200 shadow-lg bg-neutral-100 h-[340px] sm:h-[400px] lg:h-[460px] max-h-[480px] w-full">
            
            {/* Map Canvas Container */}
            <div ref={mapContainerRef} className="w-full h-full relative z-0" />

            {/* Top Overlay Badge: Live GPS & Interactive Indicator */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-md flex items-center gap-2 text-[10px] font-mono font-bold text-neutral-900">
                <Compass className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: "12s" }} />
                <span>BATAM ARCHIPELAGO • LIVE RADAR</span>
              </div>
            </div>

            {/* Top Right: Style Switcher (Light / Dark Mode Map) */}
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
              <button
                onClick={() => setMapTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className="p-2 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-md hover:bg-neutral-100 text-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
                title="Toggle Map Style"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Floating Hub Switcher Pills */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-10 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {BATAM_HUBS.map((hub) => (
                <button
                  key={hub.key}
                  onClick={() => handleSwitchLocation(hub.key)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shrink-0 cursor-pointer shadow-md ${
                    selectedKey === hub.key
                      ? "bg-black text-white scale-105"
                      : "bg-white/90 backdrop-blur-md text-neutral-700 hover:bg-white border border-neutral-200/80"
                  }`}
                >
                  {hub.name.split(" ")[0]}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Location Details Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
                <h4 id="loc-title" className="text-base font-black tracking-wider uppercase text-neutral-900">
                  {activeData.title}
                </h4>
                <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider">
                  {activeData.tag}
                </span>
              </div>

              <ul id="loc-sub-list" className="text-xs space-y-2.5 text-neutral-600 font-medium min-h-[140px]">
                {activeData.hubs.map((hub, idx) => (
                  <li key={idx} className="flex items-center gap-2 hover:text-black transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0"></span>
                    {hub}
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-neutral-100">
                <Link
                  href="#contact"
                  className="text-xs font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 flex items-center justify-between transition-colors group"
                >
                  <span id="loc-btn-label">{activeData.btn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
