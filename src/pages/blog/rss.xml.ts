// Feed RSS do blog (sem dependências extras).
import type { APIRoute } from 'astro';
import { SITE } from '../../data/site';
import { POSTS } from '../../data/posts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = () => {
  const items = POSTS.map((p) => {
    const url = `${SITE.url}/blog/posts/${p.slug}.html`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`;
  }).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Conteúdo técnico — Marcelo Fernandes</title>
    <link>${SITE.url}/blog/</link>
    <description>Segurança, inteligência artificial e infraestrutura.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
