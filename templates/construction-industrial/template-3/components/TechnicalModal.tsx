'use client';
import { Cpu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const technicalData: Record<string, { title: string, subtitle: string, content: React.ReactNode }> = {
  'bore-pile': {
    title: "Spesifikasi: Bore Pile Diameter Besar (Ø2500mm)",
    subtitle: "LAYANAN REKAYASA PONDASI DALAM",
    content: (
      <div className="space-y-4">
        <p>Pekerjaan bored pile berdiameter besar dirancang untuk menyalurkan beban aksial dan lateral ekstrim dari struktur supertall langsung ke formasi batuan dasar (bedrock).</p>
        <table className="w-full text-xs font-mono spec-table mt-4 border border-brand-border dark:border-white/10">
          <tbody>
            <tr className="bg-neutral-100 dark:bg-white/5"><td className="p-2.5 text-brand-black dark:text-white font-bold">Parameter</td><td className="p-2.5 text-brand-black dark:text-white font-bold">Spesifikasi Nilai</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Rentang Diameter</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Ø600mm s/d Ø2500mm</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Kedalaman Penetrasi Maksimum</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">s/d 48.0 Meter</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Metode Stabilisasi Dinding</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Bentonite Slurry / Polymeric Slurry</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Kuat Tekan Beton (fc')</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">35 MPa s/d 45 MPa (Slump 18±2cm)</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Toleransi Vertikalitas</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">&lt; 1 : 100 (Inclinometer Checked)</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  'retaining-wall': {
    title: "Spesifikasi: Retaining Wall & Shoring System",
    subtitle: "SISTEM PENAHAN GALIAN BASEMENT",
    content: (
      <div className="space-y-4">
        <p>Dirancang untuk menahan tekanan tanah lateral dan hidrostatik pada galian hingga kedalaman lebih dari 20 meter pada area urban berkepadatan tinggi.</p>
        <table className="w-full text-xs font-mono spec-table mt-4 border border-brand-border dark:border-white/10">
          <tbody>
            <tr className="bg-neutral-100 dark:bg-white/5"><td className="p-2.5 text-brand-black dark:text-white font-bold">Tipe Struktur</td><td className="p-2.5 text-brand-black dark:text-white font-bold">Diaphragm Wall / Secant Bored Pile</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Ketebalan Dinding</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">600mm, 800mm, 1000mm</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Sistem Perkuatan</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Prestressed Ground Anchor / Strutting Steel</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Monitoring Deformasi</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Realtime Inclinometer & Settlement Point</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  'jet-grouting': {
    title: "Spesifikasi: High-Pressure Jet Grouting",
    subtitle: "SOIL IMPROVEMENT & BASEMENT WATER STOP",
    content: (
      <div className="space-y-4">
        <p>Teknologi pemotongan dan pencampuran tanah dengan jet air berkecepatan kinetik supersonik serta semen grout untuk membentuk kolom padat berdaya dukung tinggi.</p>
        <table className="w-full text-xs font-mono spec-table mt-4 border border-brand-border dark:border-white/10">
          <tbody>
            <tr className="bg-neutral-100 dark:bg-white/5"><td className="p-2.5 text-brand-black dark:text-white font-bold">Sistem Injeksi</td><td className="p-2.5 text-brand-black dark:text-white font-bold">Triple Fluid (Air + Water + Grout)</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Tekanan Pompa</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">350 - 450 Bar</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Diameter Kolom Tanah</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Ø1200mm s/d Ø2200mm per titik</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Permeabilitas Hasil</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">k &lt; 1.0 x 10⁻⁷ cm/s (Kedap Air)</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  'dewatering': {
    title: "Spesifikasi: Deep Dewatering & Recharge Well",
    subtitle: "PENGENDALIAN AIR TANAH URBAN",
    content: (
      <div className="space-y-4">
        <p>Pengeringan terukur area galian basement tanpa memicu penurunan tanah (ground settlement) pada gedung di sekitarnya melalui sistem injeksi balik (recharge well).</p>
        <table className="w-full text-xs font-mono spec-table mt-4 border border-brand-border dark:border-white/10">
          <tbody>
            <tr className="bg-neutral-100 dark:bg-white/5"><td className="p-2.5 text-brand-black dark:text-white font-bold">Kapasitas Pompa Submersible</td><td className="p-2.5 text-brand-black dark:text-white font-bold">50 - 250 m³/jam per sumur</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Kedalaman Well Point</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">15 - 35 Meter</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Instrumentasi</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Vibrating Wire Piezometer Digital</td></tr>
            <tr><td className="p-2.5 text-neutral-600 dark:text-neutral-400">Filtrasi Lumpur</td><td className="p-2.5 text-brand-black dark:text-white font-semibold">Multi-stage Sedimentation Basin</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  'sudirman': {
    title: "Proyek: Menara Finansial Sudirman (64 Lantai)",
    subtitle: "STUDI KASUS SUB-STRUKTUR KOMERSIAL",
    content: <p>Tantangan utama proyek ini adalah galian 5 lantai basement (kedalaman 22 meter) yang berjarak hanya 4 meter dari jalur rel MRT Jakarta yang aktif. Tim PT Afindo Construction mengeksekusi 240 titik bore pile Ø1500mm hingga kedalaman 48 meter serta diaphragm wall kedap air setebal 800mm dengan zero soil movement.</p>
  },
  'lrt': {
    title: "Proyek: Terowongan Box Underpass Kota",
    subtitle: "STUDI KASUS INFRASTRUKTUR URBAN TRANSIT",
    content: <p>Penggalian bawah tanah untuk jalur transit cepat dengan metode cut-and-cover. Sistem deep dewatering multi-pompa mampu menurunkan muka air tanah sedalam 16 meter secara presisi tanpa mengganggu pondasi pemukiman sekitarnya.</p>
  },
  'cilegon': {
    title: "Proyek: Pabrik Petrokimia & Kilang Berat Cilegon",
    subtitle: "STUDI KASUS INDUSTRIAL HEAVY SMELTER",
    content: <p>Kondisi tanah lempung sangat lunak (N-SPT &lt; 2) pada kedalaman 0-14m dimitigasi menggunakan 850 kolom Jet Grouting bertekanan 400 Bar. Pondasi berhasil memikul beban dinamis turbin 250MW tanpa mengalami differential settlement.</p>
  },
};

interface TechnicalModalProps {
  data: string | null;
  onClose: () => void;
}

export default function TechnicalModal({ data, onClose }: TechnicalModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [data]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition
  };

  const modalContent = data ? technicalData[data] : null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleClose}>
      <div className={`bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 rounded-[20px] max-w-2xl w-full p-8 text-brand-black dark:text-white relative shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`} onClick={e => e.stopPropagation()}>
        <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition" onClick={handleClose}>
          <X className="w-4 h-4" />
        </button>
        {modalContent && (
          <>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-goldDark dark:text-brand-gold uppercase tracking-widest mb-2 font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>{modalContent.subtitle}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-brand-black dark:text-white mb-4">{modalContent.title}</h3>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-4 leading-relaxed">
              {modalContent.content}
            </div>
          </>
        )}
        <div className="mt-8 pt-5 border-t border-brand-border dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">KODE DOKUMEN: ENG-SPECS-2025</span>
          <button className="px-5 py-2 rounded-full bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition" onClick={handleClose}>
            Tutup Spesifikasi
          </button>
        </div>
      </div>
    </div>
  );
}
