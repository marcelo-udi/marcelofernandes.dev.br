// Comportamentos compartilhados por todas as páginas
lucide.createIcons();

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Barra de progresso + borda do header
const progress = document.getElementById('scrollProgress');
const header = document.getElementById('siteHeader');
const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (header) header.classList.toggle('scrolled', scrollY > 8);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('hidden') === false;
        menuBtn.setAttribute('aria-expanded', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    }));
}

// Revelar seções ao rolar
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Brilho que segue o mouse nos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
});

// Duplica os logos para o loop da faixa não ter emenda
const track = document.getElementById('marqueeTrack');
if (track) track.innerHTML += track.innerHTML.replaceAll('<span class="marquee-item">', '<span class="marquee-item" aria-hidden="true">');

// Formulários de contato → abrem o WhatsApp com a mensagem preenchida
document.querySelectorAll('form[data-whatsapp]').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(form);
        const linhas = [`Olá, Marcelo! Meu nome é ${f.get('nome')}.`];
        if (form.dataset.assunto) linhas.push(`Assunto: ${form.dataset.assunto}`);
        if (f.get('interesse')) linhas.push(`Interesse: ${f.get('interesse')}`);
        if (f.get('empresa')) linhas.push(`Empresa: ${f.get('empresa')}`);
        if (f.get('email')) linhas.push(`E-mail: ${f.get('email')}`);
        linhas.push('', f.get('mensagem'));
        window.open(`https://wa.me/5534998928444?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
    });
});
