import type { Metadata } from "next";
import { getCar } from "@/lib/localizedData";
import { formatRupiah, translate, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function getVehicleMetadata(locale: Locale, id: string): Metadata {
  const car = getCar(locale, id);
  if (!car) {
    return pageMetadata(locale, `/kendaraan/${id}`, translate(locale, "vehicle.notFoundTitle"), translate(locale, "vehicle.notFoundDescription"));
  }

  const title = locale === "id"
    ? `Sewa ${car.name} Batam - ${formatRupiah(car.price, locale)} | NadimTrans`
    : `Rent ${car.name} in Batam - ${formatRupiah(car.price, locale)} | NadimTrans`;
  const description = locale === "id"
    ? `Rental ${car.name} di Batam. ${car.specs.seats} kursi, ${car.specs.luggage} koper, transmisi ${car.specs.transmission}. ${car.priceNote}.`
    : `Rent ${car.name} in Batam. ${car.specs.seats} seats, ${car.specs.luggage} suitcases, ${car.specs.transmission} transmission. ${car.priceNote}.`;

  return pageMetadata(locale, `/kendaraan/${car.id}`, title, description, car.image);
}
