import { getAllCars } from "@/lib/data";
import VehicleDetailClient from "./VehicleDetailClient";

export function generateStaticParams() {
  return getAllCars().map((car) => ({
    id: String(car.id),
  }));
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetailClient id={params.id} />;
}
