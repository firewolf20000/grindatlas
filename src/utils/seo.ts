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

export const SITE = {
  name: 'GrindAtlas',
  url: 'https://grindatlas.com',
  locale: 'en_US',
  description: 'In-depth guides, tier lists, and interactive tools for idle, incremental, and roguelike games.',
  twitter: '@grindatlas',
} as const;

export function buildCanonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export function truncate(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).trim()}…`;
}
