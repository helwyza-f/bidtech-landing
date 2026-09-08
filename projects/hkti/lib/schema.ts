import { SITE_INFO, SOCIAL_LINKS } from '@/constants';
import { SITE_URL, absoluteUrl } from '@/lib/seo';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function getSameAs(): string[] {
  return Object.values(SOCIAL_LINKS)
    .map((url) => url.trim())
    .filter((url): url is string => Boolean(url));
}

export function getOrganizationSchema() {
  const sameAs = getSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_INFO.name,
    alternateName: SITE_INFO.fullName,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo1.webp'),
    description: SITE_INFO.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_INFO.address,
      addressLocality: 'Batam',
      addressRegion: 'Kepulauan Riau',
      addressCountry: 'ID',
    },
    email: SITE_INFO.email,
    telephone: SITE_INFO.phone,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_INFO.name,
    url: SITE_URL,
    inLanguage: 'id-ID',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
