import VehicleDetailPage from "@/app/_pages/VehicleDetailPage";
import { getVehicleMetadata } from "@/app/_pages/vehicleMetadata";
import { getCars } from "@/lib/localizedData";

export function generateStaticParams() {
  return getCars("id").map((car) => ({ id: String(car.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  return getVehicleMetadata("en", params.id);
}

export default function EnglishVehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetailPage locale="en" id={params.id} />;
}
