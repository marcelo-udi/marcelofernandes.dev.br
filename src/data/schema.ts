// Ajudantes de dados estruturados (Schema.org). Só descrevem o que está visível na página.
import { SITE } from './site';
import type { Faq } from './services';

export const breadcrumbSchema = (items: { href: string; label: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ href: '/', label: 'Início' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: new URL(it.href, SITE.url).href,
  })),
});

export const faqSchema = (items: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
