// Comportamentos do site. Tudo funciona sem JavaScript (links e formulário com fallback);
// este arquivo só melhora a experiência.

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const track = (event: string, params: Record<string, unknown> = {}) => {
  try { window.gtag?.('event', event, params); } catch { /* Analytics bloqueado */ }
};

/* ---------- Cabeçalho ---------- */
const header = document.querySelector<HTMLElement>('.site-header');
const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Tema claro/escuro ---------- */
document.querySelector('[data-theme-btn]')?.addEventListener('click', () => {
  const root = document.documentElement;
  const current = root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.classList.add('theme-anim');
  root.dataset.theme = next;
  try { localStorage.setItem('tema', next); } catch { /* armazenamento bloqueado */ }
  setTimeout(() => root.classList.remove('theme-anim'), 400);
});

/* ---------- Régua lateral (desktop com mouse) ---------- */
const TICK = 40;            // px entre traços; número a cada 5 traços (200px)
const rulerMq = matchMedia('(min-width: 1024px) and (pointer: fine)');
let rulerOff: (() => void) | null = null;

const digitCols = (n: number) =>
  Array.from({ length: n }, () => `<span class="ruler-digit-col">${[...'0123456789'].map((d) => `<span>${d}</span>`).join('')}</span>`).join('');

function mountRuler() {
  const root = document.documentElement;
  const rail = document.createElement('div');
  rail.className = 'ruler';
  rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = `<div class="ruler-strip"></div>
    <div class="ruler-mark"><span class="ruler-readout"><span class="ruler-digits">${digitCols(3)}</span></span></div>`;
  document.body.appendChild(rail);
  const strip = rail.querySelector<HTMLElement>('.ruler-strip')!;
  const mark = rail.querySelector<HTMLElement>('.ruler-mark')!;
  const cols = [...rail.querySelectorAll<HTMLElement>('.ruler-digit-col')];

  // Índice das seções: rótulo do cabeçalho de cada seção, ligado ao id do título
  const sections = [...document.querySelectorAll<HTMLElement>('main section')]
    .map((s) => ({ s, label: s.querySelector('.eyebrow:not(.eyebrow--plain)')?.lastChild?.textContent?.trim(), id: s.querySelector('h2[id]')?.id }))
    .filter((x): x is { s: HTMLElement; label: string; id: string } => !!x.label && !!x.id);
  let index: HTMLElement | null = null;
  let spy: IntersectionObserver | null = null;
  if (sections.length >= 3) {
    index = document.createElement('ol');
    index.className = 'ruler-index';
    index.setAttribute('aria-label', 'Seções da página');
    index.innerHTML = sections.map((x) => `<li><a href="#${x.id}">${x.label}</a></li>`).join('');
    document.body.appendChild(index);
    const links = [...index.querySelectorAll('a')];
    spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = sections.findIndex((x) => x.s === e.target);
        links.forEach((l, j) => l.setAttribute('aria-current', String(i === j)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((x) => spy!.observe(x.s));
  }

  let lastPct = -1;
  const layout = () => {
    const h = document.documentElement.scrollHeight;
    strip.style.height = `${h}px`;
    const labels = Math.ceil(h / (TICK * 5)) + 1;
    if (strip.childElementCount !== labels) {
      strip.innerHTML = Array.from({ length: labels }, (_, i) => `<span style="top:${i * TICK * 5}px">${i * 5}</span>`).join('');
    }
    update();
  };
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(1, Math.max(0, scrollY / max));
    strip.style.transform = `translateY(${-scrollY}px)`;
    mark.style.setProperty('--p', String(p));
    mark.classList.toggle('is-bottom', p > 0.92);
    const pct = Math.round(p * 100);
    if (pct !== lastPct) {
      lastPct = pct;
      String(pct).padStart(3, '0').split('').forEach((d, i) => { cols[i].style.transform = `translateY(-${Number(d)}em)`; });
    }
  };

  // Clicar ou arrastar na régua rola a página até aquela proporção
  let dragging = false;
  const seek = (e: PointerEvent) => {
    const r = rail.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    scrollTo({ top: p * (document.documentElement.scrollHeight - innerHeight), behavior: 'instant' as ScrollBehavior });
  };
  const down = (e: PointerEvent) => { dragging = true; rail.setPointerCapture(e.pointerId); seek(e); };
  const move = (e: PointerEvent) => { if (dragging) seek(e); };
  const up = () => { dragging = false; };
  rail.addEventListener('pointerdown', down);
  rail.addEventListener('pointermove', move);
  rail.addEventListener('pointerup', up);
  rail.addEventListener('pointercancel', up);

  let frame = 0;
  const onScrollRuler = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
  addEventListener('scroll', onScrollRuler, { passive: true });
  const ro = new ResizeObserver(layout);
  ro.observe(document.body);
  root.dataset.ruler = 'on';
  layout();

  return () => {
    removeEventListener('scroll', onScrollRuler);
    ro.disconnect();
    spy?.disconnect();
    rail.remove();
    index?.remove();
    delete root.dataset.ruler;
  };
}

const syncRuler = () => {
  if (rulerMq.matches && !rulerOff) rulerOff = mountRuler();
  else if (!rulerMq.matches && rulerOff) { rulerOff(); rulerOff = null; }
};
rulerMq.addEventListener('change', syncRuler);
syncRuler();

/* ---------- Menu do celular ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
const menu = document.getElementById('menu-celular');
if (menuBtn && menu) {
  const label = menuBtn.querySelector('.sr-only');
  const setOpen = (open: boolean) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
  };
  menuBtn.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); menuBtn.focus(); }
  });
  matchMedia('(min-width: 960px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* ---------- Revelar ao rolar ---------- */
const reveal = document.querySelectorAll('.reveal');
if (reveal.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveal.forEach((el) => io.observe(el));
} else {
  reveal.forEach((el) => el.classList.add('is-in'));
}

/* ---------- Eventos de clique (WhatsApp, e-mail, projetos) ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a');
  if (!a) return;
  if (a.dataset.track) track('clique_contato', { origem: a.dataset.track, destino: a.href.split('?')[0] });
  else if (a.href.startsWith('https://wa.me/')) track('clique_contato', { origem: 'link', destino: 'whatsapp' });
  else if (a.href.startsWith('mailto:')) track('clique_contato', { origem: 'link', destino: 'email' });
});

/* ---------- Sumário do artigo ---------- */
const toc = document.querySelector<HTMLElement>('[data-toc]');
const heads = [...document.querySelectorAll<HTMLElement>('.prose h2[id]')];
if (toc && heads.length > 1) {
  const list = toc.querySelector('[data-toc-list]')!;
  heads.forEach((h) => {
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent?.trim() ?? '';
    list.appendChild(a);
  });
  toc.hidden = false;
  const links = [...list.querySelectorAll('a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.hash === `#${e.target.id}`));
    });
  }, { rootMargin: '-15% 0px -70% 0px' });
  heads.forEach((h) => spy.observe(h));
}

/* ---------- Copiar link do artigo ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy-link]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const span = btn.querySelector('span');
    try {
      await navigator.clipboard.writeText(location.href.split('#')[0]);
      if (span) { const old = span.textContent; span.textContent = 'Link copiado'; setTimeout(() => (span.textContent = old), 2000); }
    } catch { if (span) span.textContent = 'Não foi possível copiar'; }
  });
});

/* ---------- Formulário de orçamento ---------- */
const form = document.querySelector<HTMLFormElement>('form[data-quote]');
if (form) setupQuoteForm(form);

function setupQuoteForm(form: HTMLFormElement) {
  const phone = form.dataset.whatsapp!;
  const email = form.dataset.email!;
  const status = document.getElementById('form-status')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const waLink = status.querySelector<HTMLAnchorElement>('[data-wa-link]')!;
  const mailLink = status.querySelector<HTMLAnchorElement>('[data-mail-link]')!;
  const copyBtn = status.querySelector<HTMLButtonElement>('[data-copy-msg]')!;
  let lastMessage = '';
  let busy = false;

  // Serviço pré-selecionado pelo link (?servico=site_institucional)
  const pre = new URLSearchParams(location.search).get('servico');
  if (pre) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="servico"][value="${CSS.escape(pre)}"]`);
    if (radio) radio.checked = true;
  }

  const setError = (name: string, msg: string) => {
    const field = form.querySelector<HTMLElement>(`[data-field="${name}"]`);
    if (!field) return;
    const out = field.querySelector('.field-error');
    const controls = field.querySelectorAll<HTMLElement>('input, select, textarea');
    if (msg) field.setAttribute('data-invalid', ''); else field.removeAttribute('data-invalid');
    controls.forEach((c) => c.setAttribute('aria-invalid', msg ? 'true' : 'false'));
    if (out) out.textContent = msg;
  };

  const validate = (data: FormData) => {
    const errors: Record<string, string> = {};
    const nome = String(data.get('nome') ?? '').trim();
    const contato = String(data.get('contato') ?? '').trim();
    const descricao = String(data.get('descricao') ?? '').trim();
    const site = String(data.get('site') ?? '').trim();
    if (nome.length < 2) errors.nome = 'Informe o seu nome.';
    if (!data.get('servico')) errors.servico = 'Escolha o tipo de serviço (ou "Não sei ainda").';
    if (descricao.length < 15) errors.descricao = 'Conte um pouco mais (pelo menos 15 caracteres).';
    if (contato && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato) && contato.replace(/\D/g, '').length < 10)
      errors.contato = 'Use um e-mail válido ou um telefone com DDD.';
    if (site && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(site)) errors.site = 'Endereço inválido. Exemplo: www.seusite.com.br';
    return errors;
  };

  // Limpa o erro do campo enquanto a pessoa corrige
  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const field = el.closest<HTMLElement>('[data-field]');
    if (field?.hasAttribute('data-invalid')) setError(field.dataset.field!, '');
  });

  const buildMessage = (data: FormData) => {
    const get = (k: string) => String(data.get(k) ?? '').trim();
    const servicoLabel = form.querySelector<HTMLInputElement>('input[name="servico"]:checked')?.dataset.label ?? get('servico');
    const lines = [
      `Olá, Marcelo! Meu nome é ${get('nome')}${get('empresa') ? `, da ${get('empresa')}` : ''}.`,
      `Serviço: ${servicoLabel}`,
      '',
      get('descricao'),
    ];
    if (get('site')) lines.push('', `Site atual: ${get('site')}`);
    if (get('prazo')) lines.push(`Prazo desejado: ${get('prazo')}`);
    if (get('investimento')) lines.push(`Investimento previsto: ${get('investimento')}`);
    if (get('contato')) lines.push(`Contato: ${get('contato')}`);
    lines.push('', '(Enviado pelo formulário do site)');
    return lines.join('\n');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) return;                      // evita envio duplicado
    const data = new FormData(form);
    const errors = validate(data);
    ['nome', 'servico', 'descricao', 'contato', 'site'].forEach((k) => setError(k, errors[k] ?? ''));
    const first = Object.keys(errors)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`)?.focus();
      return;
    }

    busy = true;
    submit.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    const label = submit.querySelector('span')!;
    const oldLabel = label.textContent;
    label.textContent = 'Abrindo o WhatsApp…';

    lastMessage = buildMessage(data);
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(lastMessage)}`;
    const subject = `Orçamento: ${form.querySelector<HTMLInputElement>('input[name="servico"]:checked')?.dataset.label ?? 'site'}`;
    waLink.href = wa;
    mailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lastMessage)}`;

    // Sem a opção "noopener" (com ela, window.open sempre devolve null); o opener é cortado à mão
    const win = window.open(wa, '_blank');
    if (win) win.opener = null;
    track('generate_lead', { metodo: 'formulario_whatsapp', servico: String(data.get('servico')) });

    status.classList.add('is-visible');
    status.querySelector('[data-status-title]')!.textContent = win === null
      ? 'Sua mensagem está pronta. Toque em "Abrir WhatsApp" para enviar.'
      : 'Sua mensagem foi aberta no WhatsApp. Falta só tocar em enviar.';
    status.focus();

    setTimeout(() => {
      busy = false;
      submit.removeAttribute('aria-busy');
      submit.disabled = false;
      label.textContent = oldLabel;
    }, 4000);
  });

  copyBtn.addEventListener('click', async () => {
    const span = copyBtn.querySelector('span')!;
    try { await navigator.clipboard.writeText(lastMessage); span.textContent = 'Mensagem copiada'; }
    catch { span.textContent = 'Não foi possível copiar'; }
    setTimeout(() => (span.textContent = 'Copiar mensagem'), 2500);
  });
}

export {};
