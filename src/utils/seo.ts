export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

// Primary canonical domain. The Cloudflare Pages default URL (grindatlas1.pages.dev)
// is treated as a duplicate and is noindexed via the BaseLayout.
export const SITE = {
  name: 'GrindAtlas',
  url: 'https://www.15115656.xyz',
  cloudflarePreviewUrl: 'https://grindatlas1.pages.dev',
  locale: 'en_US',
  description: 'In-depth guides, tier lists, and interactive tools for idle, incremental, and roguelike games.',
  twitter: '@grindatlas',
} as const;

// Domains that should be noindexed (treated as duplicates or previews).
const NON_CANONICAL_HOSTS = new Set([
  'grindatlas1.pages.dev',
  'grindatlas.pages.dev',
  'localhost',
  '127.0.0.1',
]);

export function isCanonicalHost(host: string): boolean {
  // Strip www. for comparison
  const normalized = host.replace(/^www\./, '').toLowerCase();
  const canonical = SITE.url.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
  return normalized === canonical;
}

export function shouldNoindex(host: string): boolean {
  return NON_CANONICAL_HOSTS.has(host.toLowerCase());
}

export function buildCanonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export function truncate(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).trim()}…`;
}