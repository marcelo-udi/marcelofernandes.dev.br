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
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                sans:    ['Inter', 'system-ui', 'sans-serif'],
                mono:    ['"Fira Code"', 'monospace'],
            },
        },
    },
};
