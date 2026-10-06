import VehicleDetailPage from "@/app/_pages/VehicleDetailPage";
import { getVehicleMetadata } from "@/app/_pages/vehicleMetadata";
import { getCars } from "@/lib/localizedData";

export function generateStaticParams() {
  return getCars("id").map((car) => ({ slug: car.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return getVehicleMetadata("ms", params.slug);
}

export default function MelayuVehicleDetailPage({ params }: { params: { slug: string } }) {
  return <VehicleDetailPage locale="ms" slug={params.slug} />;
}
