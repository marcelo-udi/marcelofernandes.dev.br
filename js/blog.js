// Blog: sumário do artigo, copiar link e busca/filtro na listagem

// Sumário gerado a partir dos títulos h2 do artigo
const toc = document.querySelector('[data-toc]');
const heads = [...document.querySelectorAll('.prose-blog h2[id]')];
if (toc && heads.length > 1) {
    heads.forEach(h => {
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent.trim();
        toc.appendChild(a);
    });
    const links = [...toc.querySelectorAll('a')];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
        });
    }, { rootMargin: '-15% 0px -70% 0px' });
    heads.forEach(h => spy.observe(h));
} else if (toc) {
    toc.remove();
}

// Copiar link do artigo
document.querySelectorAll('[data-copy-link]').forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(location.href.split('#')[0]);
            const label = btn.querySelector('span');
            const old = label.textContent;
            label.textContent = 'Link copiado!';
            setTimeout(() => { label.textContent = old; }, 2000);
        } catch { /* navegador sem permissão de área de transferência */ }
    });
});

// Busca e filtro por categoria na página do blog
const list = document.querySelector('[data-posts]');
if (list) {
    const cards = [...list.querySelectorAll('[data-cat]')];
    const input = document.querySelector('[data-search-input]');
    const chips = [...document.querySelectorAll('[data-filter]')];
    const empty = document.querySelector('[data-empty]');
    let cat = '';
    const apply = () => {
        const q = (input?.value || '').trim().toLowerCase();
        let shown = 0;
        cards.forEach(c => {
            const ok = (!cat || c.dataset.cat === cat) && (!q || c.dataset.search.includes(q));
            c.classList.toggle('hidden', !ok);
            if (ok) shown++;
        });
        empty.classList.toggle('hidden', shown > 0);
    };
    chips.forEach(ch => ch.addEventListener('click', () => {
        cat = ch.dataset.filter;
        chips.forEach(o => o.setAttribute('aria-pressed', String(o === ch)));
        apply();
    }));
    input?.addEventListener('input', apply);
}
