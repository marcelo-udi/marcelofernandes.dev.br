# marcelofernandes.dev.br

Site profissional de Marcelo Fernandes: sites, sistemas web, automação e servidores Linux em Uberlândia-MG.

- **Stack:** [Astro](https://astro.build) 7 gerando HTML estático. CSS próprio (sem framework), fontes Geist hospedadas no próprio site e ícones Lucide embutidos como SVG.
- **Hospedagem:** GitHub Pages (publicado por GitHub Actions), com Cloudflare na frente (DNS e proxy).
- **JavaScript no navegador:** um arquivo pequeno (menu, formulário, sumário dos artigos) e o Google Analytics, carregado só depois da primeira interação.

## Rodar localmente

Requer Node.js 22.12 ou mais recente.

```bash
npm ci            # instala as dependências
npm run dev       # http://localhost:4321 com recarga automática
npm run build     # gera o site em dist/
npm run preview   # serve o dist/ para conferir
npm run check     # checagem de tipos (TypeScript/Astro)
npm run check:links   # links internos, âncoras, imagens e links externos do dist/
```

## Onde mexer

| O que mudar | Arquivo |
|---|---|
| Telefone, e-mail, WhatsApp, menu, ID do Analytics | `src/data/site.ts` |
| Serviços (texto, escopo, limites, perguntas, mensagem do WhatsApp) | `src/data/services.ts` |
| Projetos do portfólio | `src/data/projects.ts` (telas em `src/assets/projetos/`) |
| Artigos do blog | `src/content/posts/posts.json` (dados) + `src/content/posts/<slug>.html` (texto) |
| Visual (cores, fontes, componentes) | `src/styles/global.css` (cores em `:root`; tema escuro logo abaixo) |
| Página inicial, Sobre, Contato, Privacidade | `src/pages/*.astro` |
| Cabeçalho, rodapé, cards, FAQ, chamada final | `src/components/` |
| Layout comum (meta tags, Open Graph, JSON-LD, Analytics) | `src/layouts/Base.astro` |

Cada serviço de `services.ts` gera uma página em `/<slug>.html`. O sitemap (`/sitemap.xml`), o `robots.txt` e o RSS (`/blog/rss.xml`) são gerados a partir dos mesmos dados.

**Regra do conteúdo:** só publicar o que pode ser comprovado. Nada de cases, números, depoimentos ou garantias sem fonte.

## Estrutura

```
src/
  assets/          fotos e telas dos projetos (otimizadas para WebP no build)
  components/      Header, Footer, Icon, Cta, Faq, ProjectCard, Steps, SectionHead, Crumbs
  content/posts/   artigos do blog
  data/            site.ts, services.ts, projects.ts, posts.ts, schema.ts
  layouts/         Base.astro
  pages/           rotas (ver abaixo)
  scripts/site.ts  comportamento no navegador
  styles/          global.css
public/            arquivos copiados como estão (CNAME, ícones, fontes, imagens OG, PDFs, redirecionamentos antigos)
tools/             check-links.mjs
.github/workflows/ deploy.yml
```

Páginas: `/`, `/servicos.html`, 8 páginas de serviço (`/site_institucional.html`, `/software.html`, `/automacao_relatorios.html`, `/manutencao_servidores.html`, `/cloud.html`, `/seguranca_cibernetica.html`, `/ia.html`, `/material-grafico.html`), `/projetos/`, `/projetos/grimoria.html`, `/projetos/cortes-grafica.html`, `/sobre.html`, `/contato.html`, `/privacidade.html`, `/blog/` e 5 artigos em `/blog/posts/`, `404.html`.

Todas as URLs do site antigo continuam existindo (`build.format: 'preserve'`). `novo.html`, `blog/posts/reactshell.html` e `blog/posts/novoposts/post-india-taxa-ia.html` redirecionam para o endereço novo.

## Publicação

Um push na branch `main` dispara `.github/workflows/deploy.yml`, que instala, checa os tipos, gera o site, verifica os links e envia o `dist/` para a branch **`gh-pages`**. O GitHub Pages serve essa branch (Settings → Pages → **Deploy from a branch** → `gh-pages` / `(root)`). Acompanhe em **Actions**.

Por que não `actions/deploy-pages`: em 14/10/2026 a API de publicação do Pages ficou presa numa publicação fantasma e recusava novas publicações; a publicação pela branch funcionou.

Publicação manual (sem Actions): `npm run build`, copiar `dist/` para uma pasta, `git init -b gh-pages`, commit e `git push -f origin gh-pages`.

## Backup e reversão

- O site antigo (HTML feito à mão) está na tag **`antes-reconstrucao-20261014`**.
- Para voltar ao site antigo:
  - A branch **`site-antigo`** tem exatamente o site anterior. Basta apontar o Pages para ela: Settings → Pages → Branch `site-antigo` / `(root)`, ou `gh api -X PUT repos/marcelo-udi/marcelofernandes.dev.br/pages -f build_type=legacy -f "source[branch]=site-antigo" -f "source[path]=/"`.
  - Para voltar ao site novo: apontar de novo para `gh-pages`.
- Para desfazer só uma alteração do site novo: `git revert <commit>` e push. O Actions publica de novo.
- Cada publicação fica registrada em **Actions** e em **Deployments**, e dá para reexecutar uma publicação anterior por lá.

## Cabeçalhos e segurança

O GitHub Pages não permite cabeçalhos HTTP próprios. Por isso o site define uma Content-Security-Policy por `<meta>`, e o restante deve ser configurado no **Cloudflare**:

- SSL/TLS → Edge Certificates → **Always Use HTTPS: ligado** (hoje `http://` não redireciona; o site tem um redirecionamento em JavaScript como rede de segurança).
- **HSTS** (depois que o HTTPS estiver estável).
- Rules → Transform Rules → cabeçalhos de resposta: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`.
- Caching: os arquivos em `/assets/` e `/fonts/` têm nome com hash e podem ter cache longo (Cache Rule: Edge e Browser TTL de 1 ano para `/assets/*`).

## Formulário de orçamento

Não há backend: o formulário valida os campos e monta a mensagem, que abre no WhatsApp (ou no e-mail) para a pessoa enviar. Nada é gravado e não há chaves no frontend. Para receber os pedidos por e-mail automaticamente no futuro, seria preciso um endpoint próprio (por exemplo, na VPS) ou um serviço de formulários, e a política de privacidade precisaria ser atualizada.
