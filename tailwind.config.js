/** Configuração do Tailwind — cores da marca e fontes */
module.exports = {
    content: ['./*.html', './blog/**/*.html', './js/*.js'],
    theme: {
        extend: {
            colors: {
                'ai-color':    '#10b981',
                'cloud-color': '#0ea5e9',
                'dev-color':   '#f59e0b',
                'ink':         '#050a17',
                'panel':       '#0a1226',
                // Página inicial
                'brand':       { DEFAULT: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9' },
                'night':       { DEFAULT: '#0c0b12', 2: '#13121c', 3: '#1b1a27' },
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                sans:    ['Inter', 'system-ui', 'sans-serif'],
                mono:    ['"Fira Code"', 'monospace'],
            },
        },
    },
};
