// Artigos do blog: metadados em content/posts/posts.json e o corpo em content/posts/<slug>.html
import list from '../content/posts/posts.json';

export type Post = {
  slug: string; title: string; seoTitle: string; description: string; label: string;
  tags: string[]; published: string; modified: string; minutes: number | null;
};

const bodies = import.meta.glob('../content/posts/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const POSTS: Post[] = (list as Post[]).slice().sort((a, b) => b.published.localeCompare(a.published));
export const postBody = (slug: string) => bodies[`../content/posts/${slug}.html`];

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
