// Sitemap gerado a partir dos dados do site (sem dependências extras).
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { POSTS } from '../data/posts';

export const GET: APIRoute = () => {
  const pages: { path: string; lastmod: string; priority: string }[] = [
    { path: '/', lastmod: SITE.updated, priority: '1.0' },
    { path: '/servicos.html', lastmod: SITE.updated, priority: '0.9' },
    ...SERVICES.map((s) => ({ path: `/${s.slug}.html`, lastmod: SITE.updated, priority: s.group === 'principal' ? '0.9' : '0.8' })),
    { path: '/projetos/', lastmod: SITE.updated, priority: '0.8' },
    ...PROJECTS.map((p) => ({ path: `/projetos/${p.slug}.html`, lastmod: SITE.updated, priority: '0.7' })),
    { path: '/sobre.html', lastmod: SITE.updated, priority: '0.6' },
    { path: '/contato.html', lastmod: SITE.updated, priority: '0.7' },
    { path: '/blog/', lastmod: SITE.updated, priority: '0.6' },
    ...POSTS.map((p) => ({ path: `/blog/posts/${p.slug}.html`, lastmod: p.modified, priority: '0.5' })),
    { path: '/privacidade.html', lastmod: SITE.updated, priority: '0.2' },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
