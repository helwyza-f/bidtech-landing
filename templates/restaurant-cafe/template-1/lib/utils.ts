import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() = gabung className dengan aman.
 * clsx  -> menangani kondisi (`isActive && 'text-ember'`)
 * twMerge -> membuang kelas Tailwind yang bentrok (`px-4 px-8` jadi `px-8`)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
