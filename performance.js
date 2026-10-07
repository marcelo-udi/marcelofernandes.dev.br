// Crie um arquivo performance.js com:

// 1. Lazy Loading otimizado
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
});

// 2. Otimização de fontes
WebFontConfig = {
    google: {
        families: ['Inter:300,400,600,700', 'Afacad:400,700']
    },
    timeout: 2000
};