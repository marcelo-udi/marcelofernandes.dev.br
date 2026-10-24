// Dados de contato e navegação usados em todo o site.
export const SITE = {
  url: 'https://marcelofernandes.dev.br',
  name: 'Marcelo Fernandes',
  role: 'Sites, software, inteligência artificial, computação em nuvem e segurança',
  city: 'Uberlândia',
  region: 'MG',
  email: 'contato@marcelofernandes.dev.br',
  phoneDisplay: '(34) 99892-8444',
  phoneE164: '+5534998928444',
  whatsapp: '5534998928444',
  github: 'https://github.com/marcelo-udi',
  analyticsId: 'G-YEVQZCLHG4',
  // Data que aparece no rodapé da política de privacidade e no sitemap
  updated: '2026-10-14',
} as const;

/** Link do WhatsApp com a mensagem já escrita. */
export function whatsapp(message = 'Olá, Marcelo! Vim pelo site e quero um orçamento.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: '/servicos.html', label: 'Serviços' },
  { href: '/projetos/', label: 'Projetos' },
  { href: '/sobre.html', label: 'Sobre' },
  { href: '/blog/', label: 'Conteúdo' },
  { href: '/contato.html', label: 'Contato' },
] as const;
