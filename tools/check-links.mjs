// Verifica links internos, âncoras, imagens e links externos do site gerado.
// Uso: node tools/check-links.mjs dist [--offline]
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, posix } from 'node:path';

const root = process.argv[2] ?? 'dist';
const offline = process.argv.includes('--offline');
const SITE = 'https://marcelofernandes.dev.br';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const exists = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

// Converte uma URL do site no arquivo correspondente em dist/
async function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(root, p);
  if (await exists(f)) return f;
  if (await exists(f + '.html')) return f + '.html';
  return null;
}

const files = (await walk(root)).filter((f) => f.endsWith('.html'));
const idsCache = new Map();
async function idsOf(file) {
  if (!idsCache.has(file)) {
    const html = await readFile(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
}

const errors = [];
const external = new Map();
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const pagePath = '/' + relative(root, file).split('\\').join('/');
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1])
    .concat([...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0])));
  for (let ref of refs) {
    ref = ref.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    if (ref.startsWith(SITE)) ref = ref.slice(SITE.length) || '/';
    if (/^https?:\/\//.test(ref)) {
      if (!external.has(ref)) external.set(ref, new Set());
      external.get(ref).add(pagePath);
      continue;
    }
    const [pathPart, hash] = ref.split('#');
    const abs = pathPart === '' ? pagePath : pathPart.startsWith('/') ? pathPart : posix.join(posix.dirname(pagePath), pathPart);
    const target = await resolveFile(abs);
    if (!target) { errors.push(`${pagePath}: link quebrado -> ${ref}`); continue; }
    if (hash && target.endsWith('.html') && !(await idsOf(target)).has(decodeURIComponent(hash)))
      errors.push(`${pagePath}: âncora inexistente -> ${ref}`);
  }
}

console.log(`${files.length} páginas HTML verificadas.`);
if (!offline) {
  // Só verifica destinos únicos (wa.me com mensagens diferentes conta uma vez)
  const unique = new Map();
  for (const [url, pages] of external) {
    const key = url.startsWith('https://wa.me/') ? 'https://wa.me/5534998928444' : url.split('#')[0];
    if (!unique.has(key)) unique.set(key, [...pages][0]);
  }
  await Promise.all([...unique].map(async ([url, page]) => {
    if (/linkedin\.com\/sharing|wa\.me\/\?text/.test(url)) return;   // páginas de compartilhamento exigem login
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' }, signal: AbortSignal.timeout(30000) });
      if (r.status >= 400) errors.push(`${page}: externo ${r.status} -> ${url}`);
    } catch (e) { errors.push(`${page}: externo falhou (${e.cause?.code ?? e.name}) -> ${url}`); }
  }));
  console.log(`${unique.size} destinos externos verificados.`);
}

if (errors.length) { console.log(errors.join('\n')); process.exitCode = 1; }
else console.log('Nenhum link quebrado.');
