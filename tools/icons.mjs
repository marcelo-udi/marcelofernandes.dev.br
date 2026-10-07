// Troca <i data-lucide="nome" class="..."></i> pelo SVG do ícone direto no HTML.
// Assim os ícones aparecem já no primeiro carregamento, sem JavaScript e sem "pulo" de layout.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

// Nomes antigos do Lucide → nomes atuais
const ALIAS = {
    'bar-chart-3': 'chart-column', 'check-circle': 'circle-check-big', 'check-circle-2': 'circle-check',
    'code-2': 'code-xml', 'layout': 'panels-top-left', 'line-chart': 'chart-line', 'pie-chart': 'chart-pie',
    'x-circle': 'circle-x',
};

const svgFor = (name, cls) => {
    const file = `node_modules/lucide-static/icons/${ALIAS[name] ?? name}.svg`;
    const svg = readFileSync(file, 'utf8')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s*\n\s*/g, '')
        .replace(/\sclass="[^"]*"/, '');
    return svg.replace('<svg', `<svg class="${cls}" aria-hidden="true" focusable="false" data-icon="${name}"`);
};

for (const page of readdirSync('.').filter(f => f.endsWith('.html'))) {
    const html = readFileSync(page, 'utf8');
    let n = 0;
    const out = html.replace(/<i data-lucide="([^"]+)"(?: class="([^"]*)")?><\/i>/g, (_, name, cls = '') => (n++, svgFor(name, cls)));
    if (n) { writeFileSync(page, out); console.log(`${page}: ${n} ícones`); }
}
