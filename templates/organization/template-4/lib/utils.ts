import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath && (cleanPath === basePath || cleanPath.startsWith(`${basePath}/`))) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
