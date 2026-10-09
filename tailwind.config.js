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
                'paper':       { DEFAULT: '#f6f4ef', 2: '#ece8df' },
                'tinta':       { DEFAULT: '#15171c', soft: '#4a4f5c' },
                'azul':        { DEFAULT: '#2546f5', dark: '#1a34c4', soft: '#e4e9ff' },
                'sol':         '#ffb21e',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                sans:    ['Inter', 'system-ui', 'sans-serif'],
                mono:    ['"Fira Code"', 'monospace'],
                titulo:  ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
            },
        },
    },
};
