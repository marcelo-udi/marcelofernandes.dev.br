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
