import { NextRequest, NextResponse } from "next/server";

const LARAVEL_BASE_URL =
  process.env.LARAVEL_API_URL ||
  process.env.NEXT_PUBLIC_LARAVEL_URL ||
  "http://localhost:8000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query) {
    return NextResponse.json(
      {
        status: "error",
        message: "Kata kunci domain wajib diisi.",
        domains: [],
      },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${LARAVEL_BASE_URL}/api/domain/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 }, // cache sejenak untuk mencegah spam query yang sama
      }
    );

    if (!res.ok) {
      throw new Error(`Laravel API error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Gagal menghubungi API Domain Laravel:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Gagal memuat ketersediaan domain dari server.",
        domains: [],
      },
      { status: 500 }
    );
  }
}
