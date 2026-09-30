# Nadim Trans Rentcar — Date Range UX Specification

Dokumen ini menjadi panduan implementasi untuk **pemilihan tanggal sewa mobil** pada halaman detail kendaraan Nadim Trans Rentcar.

Fokus utama implementasi:
- Mengganti kontrol **Durasi Sewa `- / +`** menjadi pemilihan tanggal.
- UI berada di **sidebar booking** pada halaman detail kendaraan.
- Layout utama **vertikal / column**.
- Kalender hanya menampilkan **1 bulan dalam satu waktu**.
- User dapat berpindah bulan menggunakan tombol navigasi dan gesture swipe.
- Tidak ada input lokasi.
- Tidak ada input waktu.
- Tidak ada opsi bernama **Custom Range**.
- Tersedia quick selection: **1 Hari, 3 Hari, 7 Hari**.
- User tetap dapat memilih tanggal manual melalui kalender.

---

## 1. Tujuan UX

User harus dapat menentukan periode sewa dengan dua cara:

### A. Quick Duration
User dapat memilih:

- 1 Hari
- 3 Hari
- 7 Hari

Saat salah satu dipilih, sistem otomatis menentukan tanggal akhir berdasarkan tanggal awal.

Contoh:

```text
Tanggal awal: 30 September 2026

1 Hari
30 Sep 2026 → 1 Okt 2026

3 Hari
30 Sep 2026 → 3 Okt 2026

7 Hari
30 Sep 2026 → 7 Okt 2026
```

### B. Manual Date Range

User dapat langsung memilih:

```text
Sewa dari
30 September 2026

Hingga
5 Oktober 2026
```

Jika range manual tidak sama dengan preset 1, 3, atau 7 hari, maka semua quick-duration button berada dalam kondisi tidak aktif.

Tidak perlu membuat opsi atau label `Custom Range`.

---

# 2. Posisi Komponen

Komponen ditempatkan pada sidebar booking di halaman detail kendaraan.

Struktur sidebar saat ini kira-kira:

```text
Total Estimasi Sewa

Opsi Pengemudi

Durasi Sewa
[-] 3 Hari [+]

Rincian Harga

CTA WhatsApp
```

Ubah menjadi:

```text
Total Estimasi Sewa

Opsi Pengemudi

Tanggal Sewa
  Quick Duration
  Sewa dari
  Hingga
  Calendar

Rincian Harga

CTA WhatsApp
```

Komponen lama berikut dihapus:

```text
Durasi Sewa
[-] 3 Hari [+]
```

Durasi sekarang dihitung otomatis dari `startDate` dan `endDate`.

---

# 3. Layout yang Diinginkan

Gunakan layout **vertikal / column**.

Contoh:

```text
Tanggal Sewa

Pilih durasi cepat

┌──────────────────────────────────┐
│ 1 Hari                           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 3 Hari                         ✓ │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 7 Hari                           │
└──────────────────────────────────┘


Sewa dari
┌──────────────────────────────────┐
│ 📅 30 September 2026             │
└──────────────────────────────────┘

Hingga
┌──────────────────────────────────┐
│ 📅 3 Oktober 2026                │
└──────────────────────────────────┘


        ‹   September 2026   ›

 Sen   Sel   Rab   Kam   Jum   Sab   Min
       1     2     3     4     5     6
  7    8     9    10    11    12    13
 14   15    16    17    18    19    20
 21   22    23    24    25    26    27
 28   29   [30]

────────────────────────────────────

Durasi Sewa
3 Hari
```

Tidak perlu mengikuti ASCII secara literal. Gunakan design system yang sudah ada pada website Nadim Trans.

---

# 4. Quick Duration

Tampilkan tiga pilihan:

```text
1 Hari
3 Hari
7 Hari
```

## Behaviour

Jika user menekan `3 Hari`:

```ts
startDate = tanggal awal aktif
endDate = startDate + 3 hari
duration = 3
```

Jika tanggal awal belum pernah dipilih, gunakan tanggal awal default yang berlaku pada aplikasi.

Jika user kemudian mengubah `Sewa dari`, preset yang sedang aktif tetap dipertahankan.

Contoh:

```text
Preset aktif: 3 Hari

Awal:
30 Sep → 3 Okt

User mengubah tanggal awal menjadi:
5 Okt

Hasil otomatis:
5 Okt → 8 Okt
```

---

# 5. Manual Range Behaviour

User tidak diwajibkan memilih quick duration.

Flow manual:

```text
1. User memilih tanggal awal.
2. Sistem masuk ke mode memilih tanggal akhir.
3. User dapat pindah ke bulan berikutnya.
4. User memilih tanggal akhir.
5. Sistem menghitung durasi.
6. Harga diperbarui.
```

Contoh:

```text
Sewa dari:
30 September 2026

Hingga:
5 Oktober 2026

Durasi:
5 Hari
```

Jika durasi tepat:

```text
1 hari
3 hari
7 hari
```

maka quick-duration yang sesuai boleh otomatis menjadi active.

Contoh:

```text
30 Sep → 3 Okt
```

otomatis membuat:

```text
3 Hari ✓
```

Namun jika:

```text
30 Sep → 5 Okt
```

maka:

```text
1 Hari
3 Hari
7 Hari
```

semuanya inactive.

---

# 6. Calendar

## Satu Bulan Saja

Calendar hanya menampilkan **satu bulan pada satu waktu**.

Contoh:

```text
‹        September 2026        ›
```

JANGAN menampilkan dua bulan secara bersamaan.

---

## Navigasi Bulan

User harus dapat berpindah bulan melalui:

### Desktop
- tombol `<`
- tombol `>`

### Touch / Mobile / Trackpad
- swipe kiri → bulan berikutnya
- swipe kanan → bulan sebelumnya

Swipe adalah enhancement.

Tombol arrow tetap wajib tersedia agar pengguna mouse tetap dapat mengakses navigasi dengan mudah.

---

# 7. Cross-Month Range

User dapat memilih range lintas bulan.

Contoh:

```text
30 September → 5 Oktober
```

Saat sedang melihat September:

```text
28   29  [30]
          ●
```

Saat pindah ke Oktober:

```text
 1━━2━━3━━4━━[5]
             ●
```

Range harus tetap dianggap sebagai satu selection yang sama.

Jangan reset `startDate` ketika user berpindah bulan.

---

# 8. Date Range Visual State

Gunakan warna brand Nadim Trans.

Saat range dipilih:

```text
30 ━━━ 1 ━━━ 2 ━━━ 3
●                   ●
```

### Start Date
- background orange utama
- text memiliki contrast yang baik
- bentuk circular / rounded

### End Date
- sama seperti start date

### Dates Between Range
- gunakan orange dengan opacity rendah
- visual harus menunjukkan bahwa tanggal-tanggal tersebut merupakan bagian dari satu periode sewa

Contoh:

```text
START      RANGE                END

 [30] ━  [1] ━ [2] ━ [3] ━ [4]
```

Tidak perlu membuat setiap intermediate date terlihat seperti button aktif penuh.

---

# 9. Field "Sewa dari" dan "Hingga"

Gunakan label Bahasa Indonesia:

```text
Sewa dari
Hingga
```

Jangan gunakan:

```text
FROM
TO
```

dan jangan gunakan:

```text
Custom Range
```

Contoh UI:

```text
Sewa dari

┌──────────────────────────────────┐
│ 📅 30 September 2026             │
└──────────────────────────────────┘

Hingga

┌──────────────────────────────────┐
│ 📅 3 Oktober 2026                │
└──────────────────────────────────┘
```

Kedua field dapat diklik.

### Klik "Sewa dari"
Calendar masuk mode memilih tanggal awal.

### Klik "Hingga"
Calendar masuk mode memilih tanggal akhir.

Jika `startDate` belum tersedia, user harus memilih start date terlebih dahulu.

---

# 10. Calendar Selection Flow

Gunakan state sederhana:

```ts
type SelectionMode = "start" | "end";
```

Contoh behaviour:

### Initial

```ts
selectionMode = "start";
```

User memilih tanggal:

```ts
startDate = selectedDate;
selectionMode = "end";
```

User kemudian memilih akhir:

```ts
endDate = selectedDate;
selectionMode = "start";
```

Namun jangan clear range setelah end date dipilih.

---

# 11. Prevent Invalid Selection

Tanggal akhir tidak boleh lebih kecil atau sama dengan tanggal awal jika model bisnis menganggap 1 hari sebagai selisih 1 tanggal penuh.

Contoh:

```text
30 Sep → 30 Sep
```

tidak dianggap 1 hari.

Untuk UX Nadim Trans pada implementasi ini:

```text
30 Sep → 1 Okt = 1 Hari
30 Sep → 3 Okt = 3 Hari
```

Formula:

```ts
durationDays = differenceInCalendarDays(endDate, startDate);
```

Pastikan hasil minimum:

```ts
durationDays >= 1
```

---

# 12. Quick Duration Calculation

Contoh utility:

```ts
const QUICK_DURATIONS = [1, 3, 7];

function applyQuickDuration(days: number) {
  const start = startDate ?? new Date();

  setStartDate(start);
  setEndDate(addDays(start, days));
}
```

Gunakan date utility yang sudah ada di project.

Jika project sudah memakai:
- date-fns
- dayjs
- luxon

jangan menambahkan library tanggal baru tanpa kebutuhan.

---

# 13. Active Preset Detection

Active quick duration tidak perlu disimpan sebagai source of truth.

Lebih aman derive dari range.

Contoh:

```ts
const durationDays = differenceInCalendarDays(endDate, startDate);

const activePreset =
  [1, 3, 7].includes(durationDays)
    ? durationDays
    : null;
```

Dengan pendekatan ini tidak akan terjadi state tidak sinkron seperti:

```text
Button: 3 Hari aktif

Actual Range:
30 Sep → 5 Okt
```

---

# 14. Single Source of Truth

Gunakan:

```ts
startDate
endDate
```

sebagai source of truth utama.

Jangan menggunakan:

```ts
duration
selectedPreset
startDate
endDate
```

sebagai empat state independen jika tidak diperlukan.

Derive nilai lain:

```ts
durationDays = endDate - startDate
activePreset = durationDays === 1 | 3 | 7
totalPrice = pricingRule(durationDays)
```

Tujuannya menghindari state yang saling tidak sinkron.

---

# 15. Pricing Integration

Jangan mengubah business logic harga yang sudah ada jika tidak diperlukan.

Sebelumnya mungkin harga menggunakan:

```ts
duration
```

dari counter:

```text
[-] 3 Hari [+]
```

Sekarang gunakan:

```ts
durationDays
```

yang berasal dari date range.

Contoh:

```ts
const durationDays = differenceInCalendarDays(endDate, startDate);

const rentalSubtotal = dailyPrice * durationDays;
```

Jika `+ Supir` memiliki biaya harian:

```ts
driverSubtotal = driverPricePerDay * durationDays;
```

Total kemudian mengikuti pricing logic yang sudah ada.

---

# 16. Update Total Secara Real-Time

Ketika date range berubah:

```text
30 Sep → 3 Okt

Durasi:
3 Hari
```

sidebar harus langsung memperbarui:

```text
Total Estimasi Sewa
Rp xxx.xxx

Sewa Mobil (3 Hari)
Rp xxx.xxx
```

Tidak perlu menekan tombol Apply jika selection sudah valid.

Jika product ingin mempertahankan tombol konfirmasi pada calendar, boleh menggunakan:

```text
Terapkan Tanggal
```

tetapi preferensi UX untuk sidebar ini adalah **live update setelah range lengkap**.

---

# 17. Responsive Behaviour

## Desktop

Calendar tampil di dalam sidebar / card booking secara vertical.

Jangan membuat popover sangat lebar.

Struktur:

```text
Quick Duration

Start Field

End Field

Calendar
```

---

## Tablet / Mobile

Tetap satu bulan.

Calendar harus:
- memenuhi lebar container
- cell tanggal cukup besar untuk touch
- mendukung swipe
- tidak overflow horizontal

Minimum touch target yang disarankan sekitar `40–44px` jika layout memungkinkan.

---

# 18. Accessibility

Pastikan:

- setiap date memiliki accessible label
- arrow navigation dapat diakses keyboard
- button menggunakan elemen `<button>`
- jangan menggunakan `<div onClick>` untuk interactive control jika tidak diperlukan
- state active tidak hanya dibedakan dengan warna
- tanggal unavailable menggunakan `disabled`
- focus state tetap terlihat
- gunakan `aria-pressed` pada quick duration button jika relevan

Contoh:

```tsx
<button
  type="button"
  aria-pressed={activePreset === 3}
>
  3 Hari
</button>
```

---

# 19. Recommended Component Structure

Contoh struktur React:

```text
RentalBookingSidebar
│
├── DriverOptionSelector
│
├── RentalDateSelector
│   │
│   ├── QuickDurationSelector
│   ├── DateRangeSummary
│   │   ├── StartDateField
│   │   └── EndDateField
│   │
│   └── SingleMonthCalendar
│       ├── CalendarHeader
│       ├── WeekHeader
│       └── CalendarGrid
│
├── PriceBreakdown
│
└── WhatsAppCTA
```

Jika project sudah memiliki date picker atau calendar reusable component, prioritaskan reuse dan modifikasi seperlunya.

Jangan melakukan rewrite besar jika tidak diperlukan.

---

# 20. Suggested State

Contoh:

```ts
const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

const [visibleMonth, setVisibleMonth] = useState<Date>(
  initialStartDate ?? new Date()
);

const [selectionMode, setSelectionMode] =
  useState<"start" | "end">("start");
```

Derived values:

```ts
const durationDays =
  startDate && endDate
    ? differenceInCalendarDays(endDate, startDate)
    : 0;

const activePreset =
  [1, 3, 7].includes(durationDays)
    ? durationDays
    : null;
```

---

# 21. Clicking Calendar Dates

Pseudo behaviour:

```ts
function handleDateClick(date: Date) {
  if (selectionMode === "start") {
    setStartDate(date);

    if (!endDate || endDate <= date) {
      setEndDate(null);
    }

    setSelectionMode("end");
    return;
  }

  if (!startDate) {
    setStartDate(date);
    setSelectionMode("end");
    return;
  }

  if (date <= startDate) {
    setStartDate(date);
    setEndDate(null);
    setSelectionMode("end");
    return;
  }

  setEndDate(date);
  setSelectionMode("start");
}
```

Agent bebas menyesuaikan logic sesuai implementation existing.

---

# 22. Swipe Behaviour

Untuk calendar:

```text
Swipe Left
→ next month

Swipe Right
→ previous month
```

Swipe tidak boleh menyebabkan:
- browser horizontal scroll yang aneh
- accidental navigation
- date selection berubah

Gunakan threshold gesture yang masuk akal.

Tidak perlu menambahkan dependency besar hanya untuk swipe jika dapat dilakukan dengan event pointer/touch sederhana.

---

# 23. Month Transition

Navigasi:

```text
‹ September 2026 ›
```

Arrow kanan:

```ts
visibleMonth = addMonths(visibleMonth, 1);
```

Arrow kiri:

```ts
visibleMonth = subMonths(visibleMonth, 1);
```

Jangan mengubah start/end range hanya karena visible month berubah.

---

# 24. Visual Direction

Sesuaikan dengan UI Nadim Trans yang sekarang:

- background putih
- border abu tipis
- radius mengikuti card/sidebar existing
- orange sebagai accent
- navy/dark sebagai text utama
- green hanya untuk CTA WhatsApp
- jangan memperkenalkan warna baru yang tidak diperlukan

Quick-duration active state:

```text
border: orange
background: orange dengan opacity rendah
check icon optional
```

Inactive:

```text
border: neutral
background: white
```

Calendar selected start/end:

```text
background: orange
text: white / dark sesuai contrast
```

Range:

```text
background: orange opacity rendah
```

---

# 25. Jangan Mengubah Hal Berikut

Agent coding **jangan melakukan redesign seluruh halaman**.

Scope hanya pada area sidebar terkait pemilihan periode sewa.

Pertahankan:
- header
- breadcrumb
- vehicle image
- rating
- vehicle information
- driver selector
- price breakdown
- WhatsApp CTA
- visual style existing

Kecuali perubahan kecil diperlukan agar date selector terintegrasi dengan baik.

---

# 26. Hapus Counter Durasi

Hapus UI:

```text
Durasi Sewa

[-]       3 Hari       [+]
```

Setelah implementasi, tidak boleh ada dua cara berbeda yang mengubah duration secara independen.

Durasi harus selalu berasal dari:

```text
startDate → endDate
```

---

# 27. Empty / Initial State

Jika sistem belum mempunyai tanggal awal:

```text
Sewa dari
Pilih tanggal

Hingga
Pilih tanggal
```

Namun jika existing product membutuhkan default booking date, boleh gunakan default:

```text
startDate = hari ini / earliest available date
endDate = startDate + defaultDuration
```

Jika sudah ada behaviour existing, pertahankan behaviour bisnis existing.

---

# 28. Unavailable Dates

Jika backend/project sudah mempunyai informasi availability mobil:

- unavailable date harus disabled
- tidak dapat dipilih sebagai start/end
- tampil berbeda secara visual
- range tidak boleh melewati tanggal unavailable jika business rule melarangnya

Jika availability belum tersedia di project, **jangan membuat backend baru hanya untuk task ini**.

Siapkan calendar component agar mudah menerima:

```ts
disabledDates?: Date[]
```

atau callback:

```ts
isDateDisabled?: (date: Date) => boolean
```

untuk future implementation.

---

# 29. Acceptance Criteria

Implementasi dianggap selesai jika semua poin berikut terpenuhi:

- [ ] Counter `- / +` Durasi Sewa sudah dihapus.
- [ ] Terdapat quick duration `1 Hari`, `3 Hari`, `7 Hari`.
- [ ] Layout quick duration berbentuk vertical / column.
- [ ] Terdapat field `Sewa dari`.
- [ ] Terdapat field `Hingga`.
- [ ] Tidak ada tombol / pilihan bernama `Custom Range`.
- [ ] Calendar hanya menampilkan satu bulan.
- [ ] Terdapat arrow bulan sebelumnya dan berikutnya.
- [ ] User dapat memilih tanggal akhir pada bulan berikutnya.
- [ ] Range tidak hilang saat user pindah bulan.
- [ ] Swipe calendar tersedia pada touch device jika feasible.
- [ ] Memilih quick duration otomatis menentukan end date.
- [ ] Mengubah tanggal awal saat preset aktif memperbarui end date.
- [ ] Memilih range manual otomatis menghitung duration.
- [ ] Jika duration adalah 1/3/7 hari, preset sesuai menjadi active.
- [ ] Jika duration bukan 1/3/7 hari, tidak ada preset active.
- [ ] Total harga menggunakan duration hasil date range.
- [ ] Driver price per day tetap mengikuti duration jika berlaku.
- [ ] Total harga berubah otomatis ketika range berubah.
- [ ] UI mengikuti design system Nadim Trans existing.
- [ ] Desktop dan mobile tidak mengalami overflow.
- [ ] Date controls keyboard-accessible.
- [ ] Tidak ada perubahan besar di luar sidebar booking.

---

# 30. Expected Final UX

Contoh akhir:

```text
Opsi Pengemudi

[ Lepas Kunci ]
[ + Supir ]


Tanggal Sewa

Pilih durasi cepat

┌───────────────────────────────┐
│ 1 Hari                        │
└───────────────────────────────┘

┌───────────────────────────────┐
│ 3 Hari                      ✓ │
└───────────────────────────────┘

┌───────────────────────────────┐
│ 7 Hari                        │
└───────────────────────────────┘


Sewa dari
[ 📅 30 September 2026 ]

Hingga
[ 📅 3 Oktober 2026 ]


       ‹ September 2026 ›

Sen Sel Rab Kam Jum Sab Min
    1   2   3   4   5   6
7   8   9  10  11  12  13
14 15  16  17  18  19  20
21 22  23  24  25  26  27
28 29 [30]


Durasi Sewa
3 Hari


Sewa Mobil (3 Hari)       Rp xxx.xxx
Asuransi                       Gratis

[ Chat WhatsApp Cepat ]
```

---

# 31. Instruction for Coding Agent

Sebelum coding:

1. Inspect struktur project existing.
2. Cari komponen sidebar/detail kendaraan yang digunakan halaman ini.
3. Cari implementation `Durasi Sewa` existing.
4. Cari pricing calculation existing.
5. Cari apakah project sudah memiliki date/calendar utility/component.
6. Reuse component/library existing sebisa mungkin.
7. Jangan mengganti stack atau menambahkan dependency berat jika tidak diperlukan.

Saat coding:

1. Replace counter duration dengan `RentalDateSelector`.
2. Gunakan `startDate` dan `endDate` sebagai source of truth.
3. Derive duration dari kedua tanggal tersebut.
4. Sambungkan duration hasil range ke pricing existing.
5. Implement quick presets 1/3/7 hari.
6. Implement single-month calendar.
7. Implement previous/next month.
8. Support range lintas bulan.
9. Implement responsive behaviour.
10. Pastikan existing driver selector dan WhatsApp flow tidak rusak.

Setelah coding:

1. Jalankan lint.
2. Jalankan typecheck.
3. Jalankan test existing jika tersedia.
4. Build project.
5. Periksa console error.
6. Verifikasi secara manual seluruh acceptance criteria.
7. Jangan meninggalkan unused code dari counter duration lama.

---

## Important

Prioritas implementasi:

**UX sederhana, visual tetap konsisten dengan halaman existing, dan state tidak mudah tidak sinkron.**

Jangan over-engineer.

Source of truth utama:

```text
startDate + endDate
```

Semua nilai lain—duration, active preset, subtotal, driver cost, dan total—harus mengikuti range tersebut.
