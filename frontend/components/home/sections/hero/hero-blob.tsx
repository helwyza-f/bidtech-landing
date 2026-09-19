"use client";

import { useId } from "react";
import { motion } from "motion/react";

import { HERO_TIMINGS } from "./hero-data";

// blob komposit terasa abstrak karena beberapa layer bergerak mandiri, bukan satu outline besar
const LAYER_A_PATHS = [
  "M120,-140C158,-118,181,-78,189,-34C197,10,190,58,163,96C136,134,89,162,40,168C-9,174,-60,158,-98,126C-136,94,-161,46,-166,-4C-171,-54,-156,-106,-121,-142C-86,-178,-32,-198,15,-192C62,-186,82,-162,120,-140Z",
  "M104,-128C142,-108,172,-72,182,-30C192,12,182,60,153,98C124,136,76,164,26,170C-24,176,-76,160,-112,126C-148,92,-168,40,-165,-12C-162,-64,-136,-114,-97,-146C-58,-178,-6,-192,38,-184C82,-176,66,-148,104,-128Z",
  "M132,-152C168,-126,196,-84,200,-38C204,8,184,54,155,92C126,130,88,160,38,172C-12,184,-70,178,-112,148C-154,118,-180,64,-181,10C-182,-44,-158,-98,-119,-136C-80,-174,-26,-196,22,-190C70,-184,96,-178,132,-152Z",
  "M120,-140C158,-118,181,-78,189,-34C197,10,190,58,163,96C136,134,89,162,40,168C-9,174,-60,158,-98,126C-136,94,-161,46,-166,-4C-171,-54,-156,-106,-121,-142C-86,-178,-32,-198,15,-192C62,-186,82,-162,120,-140Z",
];

const LAYER_B_PATHS = [
  "M78,-96C102,-80,118,-52,124,-22C130,8,126,40,108,64C90,88,58,104,26,112C-6,120,-40,120,-66,104C-92,88,-110,56,-114,22C-118,-12,-108,-48,-84,-72C-60,-96,-22,-108,10,-106C42,-104,54,-112,78,-96Z",
  "M92,-108C118,-92,138,-62,142,-30C146,2,134,36,112,62C90,88,58,106,24,112C-10,118,-46,112,-72,92C-98,72,-114,38,-114,4C-114,-30,-98,-64,-72,-88C-46,-112,-10,-126,22,-122C54,-118,66,-124,92,-108Z",
  "M70,-84C90,-70,102,-46,108,-20C114,6,112,34,96,56C80,78,50,94,20,100C-10,106,-42,102,-66,86C-90,70,-106,42,-106,12C-106,-18,-90,-48,-68,-70C-46,-92,-14,-106,14,-102C42,-98,50,-98,70,-84Z",
  "M78,-96C102,-80,118,-52,124,-22C130,8,126,40,108,64C90,88,58,104,26,112C-6,120,-40,120,-66,104C-92,88,-110,56,-114,22C-118,-12,-108,-48,-84,-72C-60,-96,-22,-108,10,-106C42,-104,54,-112,78,-96Z",
];

const LAYER_C_PATHS = [
  "M58,-72C76,-60,88,-38,92,-14C96,10,92,34,78,52C64,70,40,82,16,86C-8,90,-34,86,-52,72C-70,58,-80,34,-80,10C-80,-14,-70,-38,-52,-54C-34,-70,-8,-78,14,-76C36,-74,40,-84,58,-72Z",
  "M46,-58C62,-48,74,-30,78,-10C82,10,78,32,64,46C50,60,28,68,6,70C-16,72,-40,68,-54,54C-68,40,-72,18,-70,-4C-68,-26,-58,-46,-42,-58C-26,-70,-4,-74,16,-70C36,-66,30,-68,46,-58Z",
  "M64,-80C82,-66,92,-42,94,-18C96,6,90,30,74,48C58,66,32,78,6,82C-20,86,-48,82,-66,66C-84,50,-92,22,-88,-4C-84,-30,-68,-54,-46,-68C-24,-82,4,-86,26,-82C48,-78,46,-94,64,-80Z",
  "M58,-72C76,-60,88,-38,92,-14C96,10,92,34,78,52C64,70,40,82,16,86C-8,90,-34,86,-52,72C-70,58,-80,34,-80,10C-80,-14,-70,-38,-52,-54C-34,-70,-8,-78,14,-76C36,-74,40,-84,58,-72Z",
];

type Layer = {
  paths: string[];
  /** offset persen dari tengah agar layer tidak menumpuk konsentris */
  offsetX: number;
  offsetY: number;
  /** pengali ukuran relatif */
  scale: number;
  opacity: number;
  colorStops: [string, string, string];
};

// identitas visual tetap lokal; durasi dibaca dari HERO_TIMINGS agar satu sumber
const LAYERS: Layer[] = [
  {
    paths: LAYER_A_PATHS,
    offsetX: -6,
    offsetY: -4,
    scale: 1,
    opacity: 0.55,
    colorStops: ["rgba(120, 214, 86, 0.55)", "rgba(95, 201, 74, 0.30)", "rgba(95, 201, 74, 0)"],
  },
  {
    paths: LAYER_B_PATHS,
    offsetX: 16,
    offsetY: 10,
    scale: 0.72,
    opacity: 0.5,
    colorStops: ["rgba(140, 224, 104, 0.5)", "rgba(110, 208, 84, 0.26)", "rgba(110, 208, 84, 0)"],
  },
  {
    paths: LAYER_C_PATHS,
    offsetX: -14,
    offsetY: 18,
    scale: 0.5,
    opacity: 0.45,
    colorStops: ["rgba(100, 200, 70, 0.5)", "rgba(80, 186, 60, 0.24)", "rgba(80, 186, 60, 0)"],
  },
];

function BlobLayer({
  layer,
  morphDuration,
  driftDuration,
}: {
  layer: Layer;
  morphDuration: number;
  driftDuration: number;
}) {
  const gradientId = useId();
  return (
    <motion.svg
      aria-hidden
      viewBox="-220 -220 440 440"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={{
        left: `${layer.offsetX}%`,
        top: `${layer.offsetY}%`,
        transform: `scale(${layer.scale})`,
      }}
      animate={{
        x: [0, 22, -16, 10, 0],
        y: [0, -16, 12, -8, 0],
        rotate: [0, 8, -6, 4, 0],
      }}
      transition={{ duration: driftDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={layer.colorStops[0]} />
          <stop offset="55%" stopColor={layer.colorStops[1]} />
          <stop offset="100%" stopColor={layer.colorStops[2]} />
        </radialGradient>
      </defs>
      <motion.path
        fill={`url(#${gradientId})`}
        opacity={layer.opacity}
        animate={{ d: layer.paths }}
        transition={{ duration: morphDuration, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// blob kiri hidup mandiri: fade sekali, lalu morph/drift terus tanpa mengikuti transisi slide
export function HeroBlob({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        position: "absolute",
        filter: "blur(20px)",
        willChange: "opacity",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: HERO_TIMINGS.blobFadeIn / 1000, ease: "easeOut" }}
    >
      {LAYERS.map((layer, i) => {
        // pakai timing layer pertama sebagai cadangan agar penambahan layer visual tidak langsung gagal
        const timing = HERO_TIMINGS.blobLayers[i] ?? HERO_TIMINGS.blobLayers[0];
        return (
          <BlobLayer
            key={i}
            layer={layer}
            morphDuration={timing.morphDuration * HERO_TIMINGS.blobSpeedMultiplier}
            driftDuration={timing.driftDuration * HERO_TIMINGS.blobSpeedMultiplier}
          />
        );
      })}
    </motion.div>
  );
}
