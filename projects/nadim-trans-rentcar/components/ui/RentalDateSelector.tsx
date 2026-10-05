"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n";

type RentalDateSelectorProps = {
  locale: Locale;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date, endDate: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
  deliveryTime?: string;
  onDeliveryTimeChange?: (time: string) => void;
};

const ONE_DAY_MS = 86_400_000;

function toCalendarDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

function addCalendarDays(date: Date, amount: number): Date {
  const result = toCalendarDate(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12);
}

function differenceInCalendarDays(later: Date, earlier: Date): number {
  const laterUtc = Date.UTC(later.getFullYear(), later.getMonth(), later.getDate());
  const earlierUtc = Date.UTC(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
  return Math.round((laterUtc - earlierUtc) / ONE_DAY_MS);
}

function isSameDay(first: Date, second: Date): boolean {
  return differenceInCalendarDays(first, second) === 0;
}

function isBeforeDay(first: Date, second: Date): boolean {
  return differenceInCalendarDays(first, second) < 0;
}

function monthKey(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

function getMonthDays(visibleMonth: Date): Date[] {
  const firstOfMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1, 12);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = addCalendarDays(firstOfMonth, -mondayOffset);

  return Array.from({ length: 42 }, (_, index) => addCalendarDays(gridStart, index));
}

export default function RentalDateSelector({
  locale,
  startDate,
  endDate,
  onChange,
  isDateDisabled,
  deliveryTime,
  onDeliveryTimeChange,
}: RentalDateSelectorProps) {
  const t = useTranslations("vehicle");
  const today = toCalendarDate(new Date());
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const base = startDate || today;
    return new Date(base.getFullYear(), base.getMonth(), 1, 12);
  });
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const touchStartX = useRef<number | null>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const durationDays = startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : 0;
  const calendarDays = getMonthDays(visibleMonth);
  const languageTag = locale === "id" ? "id-ID" : "en-US";
  const weekDays = locale === "id"
    ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dateFormatter = new Intl.DateTimeFormat(languageTag, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const monthFormatter = new Intl.DateTimeFormat(languageTag, {
    month: "long",
    year: "numeric",
  });
  const ariaDateFormatter = new Intl.DateTimeFormat(languageTag, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isDisabled = (date: Date) => isBeforeDay(date, today) || Boolean(isDateDisabled?.(date));
  const canGoToPreviousMonth = monthKey(visibleMonth) > monthKey(today);

  const selectDate = (date: Date) => {
    if (isDisabled(date)) return;

    if (!startDate || selectionMode === "start") {
      onChange(date, date);
      setSelectionMode("end");
      return;
    }

    if (isBeforeDay(date, startDate)) {
      onChange(date, date);
      setSelectionMode("end");
      return;
    }

    onChange(startDate, date);
    setSelectionMode("start");
  };

  const showPreviousMonth = () => {
    if (canGoToPreviousMonth) setVisibleMonth((month) => addMonths(month, -1));
  };

  const showNextMonth = () => setVisibleMonth((month) => addMonths(month, 1));

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 50) return;
    if (distance < 0) showNextMonth();
    else showPreviousMonth();
  };

  return (
    <section aria-labelledby="rental-date-heading" className="space-y-3.5">
      {/* Sewa Dari, Jam Pengantaran & Hingga (Tata letak presisi, rapi & tidak overflow garis pemisah) */}
      <dl className={`grid ${deliveryTime ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-2"} divide-x divide-gray-200 border-y border-gray-100 py-3 items-center`}>
        {/* 1. SEWA DARI */}
        <div className="min-w-0 pr-3 sm:pr-4">
          <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {t("rentalFrom")}
          </dt>
          <dd className="mt-1 truncate text-xs font-bold text-gray-900" title={startDate ? ariaDateFormatter.format(startDate) : undefined}>
            {startDate ? dateFormatter.format(startDate) : (locale === "id" ? "Pilih tanggal" : "Select date")}
          </dd>
        </div>

        {/* 2. JAM ANTAR (Terlihat jelas bisa diedit & penting dengan badge wajib dan icon pensil) */}
        {deliveryTime && (
          <div className="min-w-0 px-2 sm:px-4 text-center">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-amber-950 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>{locale === "id" ? "Jam Antar" : "Time"}</span>
              <span className="text-[9px] font-black text-amber-800 bg-amber-200/80 px-1 py-0.2 rounded uppercase tracking-tight">
                {locale === "id" ? "Penting" : "Req"}
              </span>
            </dt>
            <dd className="mt-1 flex items-center justify-center">
              <div
                onClick={() => {
                  try {
                    timeInputRef.current?.showPicker();
                  } catch {
                    timeInputRef.current?.focus();
                  }
                }}
                className="group inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 via-white to-amber-50 hover:from-amber-100 hover:to-orange-50 border-2 border-amber-400 hover:border-amber-500 rounded-xl px-2.5 py-1 transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95 ring-2 ring-amber-400/20"
                title={locale === "id" ? "Klik untuk ubah jam pengantaran" : "Click to edit delivery time"}
              >
                <Clock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <input
                  ref={timeInputRef}
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => onDeliveryTimeChange?.(e.target.value)}
                  className="text-xs font-black text-amber-950 bg-transparent focus:outline-none cursor-pointer w-[54px] p-0 text-center [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden"
                  aria-label={locale === "id" ? "Jam Pengantaran" : "Delivery Time"}
                />
                <span className="text-[9px] font-black text-amber-900 tracking-tight">WIB</span>
              </div>
            </dd>
          </div>
        )}

        {/* 3. HINGGA */}
        <div className="min-w-0 pl-3 sm:pl-4 text-right sm:text-left">
          <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {t("rentalUntil")}
          </dt>
          <dd className="mt-1 truncate text-xs font-bold text-gray-900" title={endDate ? ariaDateFormatter.format(endDate) : undefined}>
            {endDate ? dateFormatter.format(endDate) : (locale === "id" ? "Pilih tanggal" : "Select date")}
          </dd>
        </div>
      </dl>

      {/* Single Month Calendar */}
      <div
        className="select-none rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm [touch-action:pan-y]"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mb-2 flex items-center justify-between px-0.5">
          <button
            type="button"
            disabled={!canGoToPreviousMonth}
            onClick={showPreviousMonth}
            aria-label={t("previousMonth")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <p aria-live="polite" className="text-sm font-extrabold capitalize text-gray-900">
            {monthFormatter.format(visibleMonth)}
          </p>
          <button
            type="button"
            onClick={showNextMonth}
            aria-label={t("nextMonth")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7" aria-hidden="true">
          {weekDays.map((day) => (
            <span key={day} className="py-1.5 text-center text-[9px] font-bold uppercase tracking-wide text-gray-400">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1" role="grid" aria-label={monthFormatter.format(visibleMonth)}>
          {calendarDays.map((date) => {
            const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
            const disabled = isDisabled(date);
            const isStart = startDate ? isSameDay(date, startDate) : false;
            const isEnd = endDate ? isSameDay(date, endDate) : false;
            const inRange = startDate && endDate ? isBeforeDay(startDate, date) && isBeforeDay(date, endDate) : false;

            return (
              <button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                type="button"
                role="gridcell"
                disabled={disabled}
                onClick={() => selectDate(date)}
                aria-label={ariaDateFormatter.format(date)}
                aria-selected={isStart || isEnd}
                className={`relative flex aspect-square min-h-9 items-center justify-center text-[11px] font-semibold transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isStart || isEnd
                    ? "rounded-xl bg-[#e9a23a] text-slate-950 font-black shadow-sm"
                    : inRange
                      ? "bg-amber-100 text-amber-950 font-medium"
                      : outsideMonth
                        ? "text-gray-300 hover:bg-amber-50"
                        : "rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                } ${disabled ? "cursor-not-allowed opacity-35 hover:bg-transparent" : ""}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
