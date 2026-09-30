"use client";

import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n";

type RentalDateSelectorProps = {
  locale: Locale;
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
};

const QUICK_DURATIONS = [1, 3, 7] as const;
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
}: RentalDateSelectorProps) {
  const t = useTranslations("vehicle");
  const today = toCalendarDate(new Date());
  const [visibleMonth, setVisibleMonth] = useState(() =>
    new Date(startDate.getFullYear(), startDate.getMonth(), 1, 12),
  );
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const touchStartX = useRef<number | null>(null);

  const durationDays = differenceInCalendarDays(endDate, startDate) + 1;
  const activePreset = QUICK_DURATIONS.includes(durationDays as (typeof QUICK_DURATIONS)[number])
    ? durationDays
    : null;
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

  const selectQuickDuration = (days: number) => {
    onChange(startDate, addCalendarDays(startDate, days - 1));
    setSelectionMode("start");
  };

  const selectDate = (date: Date) => {
    if (isDisabled(date)) return;

    if (selectionMode === "start") {
      const retainedDuration = activePreset ?? 1;
      onChange(date, addCalendarDays(date, retainedDuration - 1));
      setSelectionMode("end");
      return;
    }

    if (isBeforeDay(date, startDate)) {
      onChange(date, addCalendarDays(date, (activePreset ?? 1) - 1));
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
    <section aria-labelledby="rental-date-heading" className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {QUICK_DURATIONS.map((days) => {
          const isActive = activePreset === days;

          return (
            <button
              key={days}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectQuickDuration(days)}
              className={`flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-center text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
                isActive
                  ? "border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50/40"
              }`}
            >
              <span className="whitespace-nowrap">{t("quickDurationDays", { count: days })}</span>
              {isActive && <Check aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 text-amber-600" />}
            </button>
          );
        })}
      </div>

      <dl className="grid grid-cols-2 divide-x divide-gray-200 border-y border-gray-100 py-2.5">
        <div className="min-w-0 pr-3">
          <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t("rentalFrom")}</dt>
          <dd className="mt-1 truncate text-xs font-bold text-gray-900" title={ariaDateFormatter.format(startDate)}>
            {dateFormatter.format(startDate)}
          </dd>
        </div>

        <div className="min-w-0 pl-3">
          <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t("rentalUntil")}</dt>
          <dd className="mt-1 truncate text-xs font-bold text-gray-900" title={ariaDateFormatter.format(endDate)}>
            {dateFormatter.format(endDate)}
          </dd>
        </div>
      </dl>

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
            const isStart = isSameDay(date, startDate);
            const isEnd = isSameDay(date, endDate);
            const inRange = isBeforeDay(startDate, date) && isBeforeDay(date, endDate);

            return (
              <button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                type="button"
                role="gridcell"
                disabled={disabled}
                onClick={() => selectDate(date)}
                aria-label={ariaDateFormatter.format(date)}
                aria-selected={isStart || isEnd}
                className={`relative flex aspect-square min-h-9 items-center justify-center text-[11px] font-semibold transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                  isStart || isEnd
                    ? "rounded-lg bg-amber-500 text-slate-950 shadow-sm"
                    : inRange
                      ? "bg-amber-100 text-amber-950"
                      : outsideMonth
                        ? "text-gray-300 hover:bg-amber-50"
                        : "rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-800"
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
