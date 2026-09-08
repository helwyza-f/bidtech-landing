/**
 * Single source of truth for the site's absolute production URL.
 * Set NEXT_PUBLIC_SITE_URL in production; falls back to the confirmed
 * production domain (hktikotabatam.org) otherwise.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hktikotabatam.org'
).replace(/\/$/, '');

export function absoluteUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
