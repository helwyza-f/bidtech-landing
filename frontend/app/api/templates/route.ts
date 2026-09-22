import { NextResponse } from "next/server";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/template";

export async function GET() {
  // Serialisasi data TEMPLATES murni (hapus React LucideIcon)
  const data = TEMPLATES.map(({ icon, ...template }) => ({
    ...template,
    price: 2000000, // Harga standar template Bidtech Rp 2.000.000
  }));

  return NextResponse.json(
    {
      status: "success",
      count: data.length,
      categories: TEMPLATE_CATEGORIES,
      data,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
