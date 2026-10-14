// Projetos reais do portfólio. Nada de métricas inventadas: só o que pode ser conferido
// no projeto publicado ou no código. Sem IPs, senhas ou dados de usuários.
import grimoriaHome from '../assets/projetos/grimoria-home.png';
import grimoriaLoja from '../assets/projetos/grimoria-loja.png';
import cortesHome from '../assets/projetos/cortes-home.png';
import cortesMobile from '../assets/projetos/cortes-mobile.png';
import type { ImageMetadata } from 'astro';

export type Project = {
  slug: string;
  name: string;
  kind: string;                 // tipo do projeto
  status: string;               // selo honesto: "Em produção", "Demonstração"
  title: string;                // <title>
  description: string;          // meta description
  summary: string;              // card
  url: string;                  // projeto no ar
  urlLabel: string;
  cover: ImageMetadata;
  coverAlt: string;
  gallery: { img: ImageMetadata; alt: string; caption: string }[];
  context: string;
  goal: string;
  solution: { t: string; d: string }[];
  decisions: string[];
  results: string[];            // só itens verificáveis
  stack: string[];
  services: string[];           // slugs de services.ts
  links: { href: string; label: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'grimoria',
    name: 'Grimoria',
    kind: 'Plataforma online completa · projeto próprio',
    status: 'Em produção desde 2026',
    title: 'Grimoria: servidor, site e pagamentos automáticos | Projeto de Marcelo Fernandes',
    description: 'Estudo de caso: servidor Linux na AWS com Docker e Nginx, site em dois idiomas, loja com PIX e entrega automática, backups, monitoramento e ferramentas próprias em Python.',
    summary: 'Servidor de jogo online com site, loja com PIX e entrega automática, infraestrutura na AWS e operação 24 horas.',
    url: 'https://grimoria.servegame.com/',
    urlLabel: 'grimoria.servegame.com',
    cover: grimoriaHome,
    coverAlt: 'Página inicial do site do Grimoria, com o logotipo, os botões Criar Conta e Download e o painel de boas-vindas',
    gallery: [
      { img: grimoriaHome, alt: 'Página inicial do Grimoria', caption: 'Página inicial: cadastro, download do cliente, status do servidor e notícias.' },
      { img: grimoriaLoja, alt: 'Loja de itens do Grimoria com 555 produtos, busca e categorias', caption: 'Loja de itens: catálogo com busca e categorias, pagamento por PIX e entrega automática no personagem.' },
    ],
    context: 'O Grimoria é um servidor de Tibia (Open Tibia) criado e operado por mim. É um serviço online completo: o servidor do jogo, o site onde os jogadores criam conta, uma loja com pagamento e a comunidade, tudo no ar 24 horas por dia.',
    goal: 'Operar sozinho um serviço online com custo baixo, pagamentos que não dependem de ninguém conferir à mão, conteúdo em português e um ambiente que possa ser recriado sem perder as personalizações.',
    solution: [
      { t: 'Infraestrutura', d: 'Servidor Ubuntu na AWS (região São Paulo) com Docker Compose: servidor do jogo, servidor de login, site, banco MariaDB e monitoramento em contêineres separados.' },
      { t: 'Nginx e segurança', d: 'Nginx como proxy reverso com HTTPS (Let\'s Encrypt), regras de segurança próprias e firewall com iptables. Os serviços internos só escutam na máquina local.' },
      { t: 'Pagamentos automáticos', d: 'PIX pelo Mercado Pago com confirmação por webhook. Depois do pagamento, uma fila entrega os itens comprados no personagem em poucos segundos, mesmo com ele desconectado. Também aceita Bitcoin, com confirmação pela rede.' },
      { t: 'Personalização reaplicável', d: 'Um script de inicialização reaplica todas as personalizações (configurações, traduções, mapa e correções) sempre que o contêiner sobe. Recriar o servidor não perde nada.' },
      { t: 'Tradução para o português', d: 'Um gancho no código C++ do servidor traduz as mensagens do jogo a partir de um arquivo de regras, então mudar um texto não exige recompilar. Mais de 750 personagens do jogo também foram traduzidos.' },
      { t: 'Site em dois idiomas', d: 'Site em PHP (MyAAC) com tema próprio, navegação sem recarregar a página, português e inglês com detecção do idioma do navegador e páginas de loja e conta.' },
      { t: 'Operação e monitoramento', d: 'Backup diário do banco, painéis no Grafana e Prometheus, alertas no celular e uma ferramenta em Python que mostra os acessos ao site em tempo real, com localização aproximada calculada no próprio servidor (nenhum IP é enviado para fora).' },
      { t: 'Cliente e instalador', d: 'Instalador próprio para Windows (Inno Setup), distribuído pelo GitHub Releases e verificado no VirusTotal antes de cada publicação.' },
    ],
    decisions: [
      'Contêineres separados por função: dá para reiniciar o site sem derrubar o jogo, e vice-versa.',
      'Backup antes de cada mudança e procedimento de reversão anotado, porque não há equipe para corrigir um erro de madrugada.',
      'Textos de tradução em arquivo, fora do código compilado: uma compilação leva cerca de 25 minutos e uma troca de texto não deve depender disso.',
      'Pagamento confirmado pelo servidor (webhook) e não pelo navegador do comprador, para que ninguém consiga simular um pagamento.',
      'Dados de localização dos visitantes calculados com uma base local, sem enviar IPs a serviços externos.',
    ],
    results: [
      'O site, o cadastro, a loja e os downloads estão no ar e podem ser conferidos no endereço do projeto.',
      'A loja de itens tem mais de 500 produtos, pagos por PIX e entregues sem intervenção manual.',
      'O ambiente já foi recriado e reiniciado várias vezes sem perder personalizações, graças ao script de inicialização.',
    ],
    stack: ['Ubuntu', 'AWS EC2', 'Docker Compose', 'Nginx', 'Let\'s Encrypt', 'MariaDB', 'PHP', 'Twig', 'Lua', 'C++', 'Python', 'Mercado Pago API', 'Grafana', 'Prometheus', 'Inno Setup'],
    services: ['manutencao_servidores', 'software', 'automacao_relatorios', 'seguranca_cibernetica', 'cloud'],
    links: [
      { href: 'https://grimoria.servegame.com/', label: 'Abrir o site do Grimoria' },
      { href: 'https://github.com/marcelo-udi/grimoria-client/releases', label: 'Instalador no GitHub' },
    ],
  },
  {
    slug: 'cortes-grafica',
    name: 'Côrtes Gráfica',
    kind: 'Loja online para gráfica · demonstração',
    status: 'Projeto demonstrativo',
    title: 'Loja online para gráfica (demonstração) | Projeto de Marcelo Fernandes',
    description: 'Estudo de caso: loja online de impressos com catálogo, cotação por quantidade, frete, PIX, envio de arte e painéis para arte-finalista, expedição e entregador. Node.js e Express.',
    summary: 'Loja online de impressos com cotação, frete, PIX, envio de arte e painéis para cada etapa da produção.',
    url: 'https://cortes-demo.onrender.com/',
    urlLabel: 'cortes-demo.onrender.com',
    cover: cortesHome,
    coverAlt: 'Página inicial da loja demonstrativa da Côrtes Gráfica, com o título "Há 30 anos causando boas impressões" e fotos de embalagens',
    gallery: [
      { img: cortesHome, alt: 'Página inicial da loja demonstrativa', caption: 'Página inicial: segmentos de produtos, busca e pedido de orçamento pelo WhatsApp.' },
      { img: cortesMobile, alt: 'A mesma loja vista na tela de um celular', caption: 'Versão para celular.' },
    ],
    context: 'Uma demonstração de loja online para uma gráfica de Uberlândia. Em gráfica, o pedido não termina no pagamento: a arte precisa ser enviada e conferida, a produção passa por várias pessoas e a entrega tem rota própria.',
    goal: 'Mostrar como o pedido de impressos pode ser feito pela internet do começo ao fim: escolher o produto, cotar, pagar, enviar a arte e acompanhar cada etapa até a entrega.',
    solution: [
      { t: 'Catálogo e cotação', d: 'Catálogo por segmento com busca, filtros e ordenação. O preço é calculado por faixa de quantidade e pelas opções escolhidas, com cupons de desconto.' },
      { t: 'Checkout', d: 'Carrinho, endereços salvos, frete por PAC, SEDEX ou retirada no balcão, previsão de produção e entrega e pagamento por PIX com QR code, ou "combinar com a equipe".' },
      { t: 'Envio de arte', d: 'O cliente envia o arquivo da arte pelo site, e o arte-finalista confere e aprova antes da impressão.' },
      { t: 'Painéis por função', d: 'Painéis separados para administração, arte-finalista, expedição e entregador, cada um com o seu acesso, e rastreio do pedido para o cliente.' },
      { t: 'Backend', d: 'API em Node.js e Express com autenticação por JWT, upload de arquivos com Multer e login opcional com Google, Facebook ou Apple.' },
      { t: 'Publicação', d: 'Publicado no Render com um arquivo de configuração versionado, e com scripts prontos para rodar numa VPS própria com Nginx e systemd.' },
    ],
    decisions: [
      'Frontend sem framework (HTML, CSS e JavaScript): páginas leves, que carregam rápido no celular.',
      'Banco de dados em arquivo JSON na demonstração, para rodar em qualquer servidor sem instalar banco. A camada de dados é isolada e pode ser trocada por um banco relacional.',
      'Segredos (chave PIX, IDs de login social e PINs das equipes) ficam em variáveis de ambiente do servidor, nunca no código publicado.',
      'Login social opcional: sem as chaves configuradas, a loja funciona em modo demonstração.',
    ],
    results: [
      'A demonstração está no ar e pode ser navegada: catálogo, carrinho e checkout.',
      'Dados, preços e pedidos são de demonstração.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'JWT', 'Multer', 'OAuth', 'Render', 'Nginx', 'systemd'],
    services: ['site_institucional', 'software'],
    links: [
      { href: 'https://cortes-demo.onrender.com/', label: 'Abrir a demonstração' },
    ],
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
