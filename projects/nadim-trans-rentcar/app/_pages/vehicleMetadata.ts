import type { Metadata } from "next";
import { getCar } from "@/lib/localizedData";
import { formatRupiah, translate, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function getVehicleMetadata(locale: Locale, slug: string): Metadata {
  const car = getCar(locale, slug);
  if (!car) {
    return pageMetadata(locale, `/kendaraan/${slug}`, translate(locale, "vehicle.notFoundTitle"), translate(locale, "vehicle.notFoundDescription"));
  }

  const title = locale === "id"
    ? `Sewa Mobil Batam ${car.name} - ${formatRupiah(car.price, locale)}`
    : `Rent ${car.name} in Batam - ${formatRupiah(car.price, locale)}`;
  const description = locale === "id"
    ? `Sewa mobil Batam ${car.name}. ${car.specs.seats} kursi, ${car.specs.luggage} koper, transmisi ${car.specs.transmission}. ${car.priceNote}.`
    : `Rent ${car.name} in Batam. ${car.specs.seats} seats, ${car.specs.luggage} suitcases, ${car.specs.transmission} transmission. ${car.priceNote}.`;

  return pageMetadata(locale, `/kendaraan/${car.slug}`, title, description, car.image);
}
