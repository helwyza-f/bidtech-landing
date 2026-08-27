"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const MIN_RANGE = 50;
const ROTATION_DEG = -2.76;
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

interface DynamicTextSliderProps {
  children: ReactNode;
  height?: number;
  handleSize?: number;
  borderColor?: string;
  handleAccent?: string;
  className?: string;
}

export function DynamicTextSlider({
  children,
  height = 70,
  handleSize = 28,
  borderColor = "border-brand-500",
  handleAccent = "bg-brand-500",
  className = "",
}: DynamicTextSliderProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setTextWidth(measureRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [children]);

  const width = textWidth > 0 ? Math.max(textWidth + 48, 120) : 0;

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [draggingHandle, setDraggingHandle] = useState<"left" | "right" | null>(
    null,
  );
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef<{
    handle: "left" | "right";
    startX: number;
    startY: number;
    initialLeft: number;
    initialRight: number;
  } | null>(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
  }, [left, right]);

  useEffect(() => {
    setRight(width);
  }, [width]);

  useEffect(() => {
    if (width > 0) {
      const handleMidpoint = (left + right) / 2;
      const sliderCenter = width / 2;
      const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
      const maxAdditionalTilt = 3;
      const newRotation = ROTATION_DEG + deviationFactor * maxAdditionalTilt;
      setDynamicRotation(newRotation);
    }
  }, [left, right, width]);

  const startDrag = (handle: "left" | "right", e: React.PointerEvent) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } =
        dragRef.current;
      const dX = e.clientX - startX;
      const dY = e.clientY - startY;
      const projected = dX * COS_THETA + dY * SIN_THETA;
      if (handle === "left") {
        const newLeft = clamp(
          initialLeft + projected,
          0,
          rightRef.current - MIN_RANGE,
        );
        setLeft(newLeft);
      } else {
        const newRight = clamp(
          initialRight + projected,
          leftRef.current + MIN_RANGE,
          width,
        );
        setRight(newRight);
      }
    },
    [width],
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  const nudgeHandle =
    (handle: "left" | "right") => (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const delta = e.key === "ArrowLeft" ? -10 : 10;
      if (handle === "left") {
        setLeft((prev) => clamp(prev + delta, 0, rightRef.current - MIN_RANGE));
      } else {
        setRight((prev) =>
          clamp(prev + delta, leftRef.current + MIN_RANGE, width),
        );
      }
    };

  return (
    <span
      className={`inline-block align-middle ${className}`}
      style={{ width, height: width > 0 ? height : "auto" }}
    >
      <span
        ref={measureRef}
        aria-hidden="true"
        className="absolute -left-[9999px] whitespace-nowrap px-4"
      >
        {children}
      </span>

      {width > 0 && (
        <span
          className="relative inline-block select-none transition-transform duration-300 ease-out"
          style={{
            width,
            height,
            transform: `rotate(${dynamicRotation}deg)`,
          }}
        >
          <span
            className={`absolute inset-0 rounded-2xl border ${borderColor} pointer-events-none`}
          />
          {(["left", "right"] as const).map((handle) => {
            const x = handle === "left" ? left : right - handleSize;
            const scaleClass =
              draggingHandle === handle ? "scale-125" : "hover:scale-110";
            return (
              <button
                key={handle}
                type="button"
                aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
                onPointerDown={(e) => startDrag(handle, e)}
                onKeyDown={nudgeHandle(handle)}
                className={`z-20 absolute top-0 h-full w-7 rounded-full bg-[#262626] border ${borderColor} flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-brand-400 transition-transform duration-150 ease-in-out ${scaleClass}`}
                style={{ left: x, touchAction: "none" }}
              >
                <span className={`w-1 h-8 rounded-full ${handleAccent}`} />
              </button>
            );
          })}
          <span
            className="flex z-10 items-center justify-center w-full h-full px-4 overflow-hidden pointer-events-none whitespace-nowrap"
            style={{
              clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)`,
            }}
          >
            {children}
          </span>
        </span>
      )}
    </span>
  );
}
