// Função para carregar e inserir HTML
function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${filePath}: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            console.log(`${filePath} carregado com sucesso`);
            return true;
        })
        .catch(error => {
            console.error(error);
            document.getElementById(elementId).innerHTML = `
                <div style="color: red; padding: 20px; border: 1px solid red; margin: 10px;">
                    Erro ao carregar ${filePath}. Verifique se o arquivo existe e se o servidor está rodando.
                </div>
            `;
            return false;
        });
}

// Função para inicializar todas as funcionalidades
function initializePage() {
    // Carregar cabeçalho e rodapé
    Promise.all([
        loadHTML('header-placeholder', '../header/header.html'),
        loadHTML('footer-placeholder', '../footer/footer.html')
    ]).then(() => {
        console.log('Cabeçalho e rodapé carregados');
        
        // Inicializar funcionalidades interativas após carregamento
        initializeInteractions();
    });
}

// Função para funcionalidades interativas
function initializeInteractions() {
    console.log('Inicializando interações...');
    
    // Tooltips para badges de mercado
    const marketBadges = document.querySelectorAll('.market-badge');
    marketBadges.forEach(badge => {
        badge.title = 'Mercado estratégico para empresas de IA';
        badge.style.cursor = 'help';
    });
    
    // Animar elementos de alerta
    const alertElements = document.querySelectorAll('.alert-warning, .alert-info, .alert-legal');
    alertElements.forEach(alert => {
        alert.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        alert.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Simular contador de visualizações
    const viewsElement = document.querySelector('.stats span:nth-child(1)');
    if (viewsElement) {
        const currentViews = 2400;
        viewsElement.innerHTML = `<i class="far fa-eye"></i> ${currentViews.toLocaleString()} visualizações`;
    }
    
    // Interatividade na tabela de comparação
    const tableRows = document.querySelectorAll('.comparison-table tr');
    tableRows.forEach((row, index) => {
        if (index > 0) { // Pular cabeçalho
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f7ff';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
            
            row.addEventListener('click', function() {
                const region = this.cells[0].textContent.trim();
                const approach = this.cells[1].textContent.trim();
                alert(`Região: ${region}\nAbordagem: ${approach}\n\nClique em "Regulação & IA Global" na sidebar para mais detalhes.`);
            });
            
            row.style.cursor = 'pointer';
        }
    });
    
    // Contador regressivo para consulta pública
    const consultationDeadline = new Date('2026-01-09');
    const today = new Date();
    const daysLeft = Math.ceil((consultationDeadline - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft > 0) {
        const deadlineInfo = document.createElement('div');
        deadlineInfo.className = 'alert-info';
        deadlineInfo.style.marginTop = '20px';
        deadlineInfo.innerHTML = `
            <h4><i class="fas fa-hourglass-half"></i> Consulta Pública</h4>
            <p><strong>${daysLeft} dias restantes</strong> para envio de comentários sobre a proposta.<br>
            Prazo final: 09 de Janeiro de 2026</p>
        `;
        
        const vereditoSection = document.querySelector('.veredito');
        if (vereditoSection) {
            vereditoSection.parentNode.insertBefore(deadlineInfo, vereditoSection.nextSibling);
        }
    }
    
    // Realçar termos importantes
    const importantTerms = ['licença obrigatória em branco', 'royalties', 'fair use', 'mineração de texto e dados', 'modelo híbrido'];
    importantTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        const contentElements = document.querySelectorAll('.post-content p, .post-content li, .post-content h2, .post-content h3, .post-content h4');
        
        contentElements.forEach(element => {
            element.innerHTML = element.innerHTML.replace(
                regex, 
                match => `<span class="highlight-term" title="Termo importante">${match}</span>`
            );
        });
    });
    
    // Navegação suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    console.log('Interações inicializadas com sucesso');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializePage);

// Adicionar fallback caso o DOM já esteja carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
// Adicione esta função dentro da função initializeInteractions() ou separadamente:

function initializeFooterInteractions() {
    // Formulário de newsletter no footer
    const newsletterForm = document.querySelector('.footer-newsletter .newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && email.includes('@')) {
                // Simulação de sucesso
                emailInput.value = '';
                const originalHTML = this.innerHTML;
                this.innerHTML = `
                    <div style="color: #2e7d32; font-size: 12px; text-align: center; padding: 5px;">
                        <i class="fas fa-check-circle"></i> Inscrito com sucesso!
                    </div>
                `;
                
                // Restaurar após 3 segundos
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    initializeFooterInteractions(); // Re-inicializar o evento
                }, 3000);
                
                console.log(`Newsletter inscrição: ${email}`);
            }
        });
    }
    
    // Tooltips para ícones sociais
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const platform = link.querySelector('i').className.split(' ')[1].replace('fa-', '');
        link.setAttribute('title', `Siga no ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    });
}

// Chame esta função na inicialização da página
function initializePage() {
    // ... código existente ...
    
    Promise.all([
        loadHTML('header-placeholder', '../header/header.html'),
        loadHTML('footer-placeholder', '../footer/footer.html')
    ]).then(() => {
        console.log('Cabeçalho e rodapé carregados');
        
        // Inicializar funcionalidades interativas após carregamento
        initializeInteractions();
        initializeFooterInteractions(); // <-- Adicione esta linha
    });
}