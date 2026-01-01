import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  const music = await getCollection('music');
  
  const allPosts = [...blog, ...music].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  
  return rss({
    title: 'Akhil Panchal',
    description: 'Software Engineer | Singer | Cycling Enthusiast',
    site: context.site!,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.collection}/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
