import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../utils/seo';

export async function GET(context: any) {
  const articles = await getCollection('articles');
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((a) => ({
        title: a.data.title,
        description: a.data.description,
        pubDate: a.data.pubDate,
        link: `/${a.data.category}/${a.slug}/`,
        author: a.data.author,
        categories: [a.data.category, ...(a.data.tags ?? [])],
      })),
    customData: `<language>en-us</language>`,
  });
}