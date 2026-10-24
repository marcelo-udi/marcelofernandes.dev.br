// Catálogo de serviços. Cada item gera uma página em /<slug>.html (URLs antigas preservadas).
// Regra: só descrever o que é feito de verdade; nada de métricas, cases ou garantias sem prova.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  icon: string;
  group: 'principal' | 'complementar';
  name: string;          // nome curto (menus, cards)
  title: string;         // <title>
  description: string;   // meta description
  h1: string;
  lead: string;
  summary: string;       // frase do card
  problems: string[];    // situações que o cliente reconhece
  includes: string[];    // escopo
  limits: string[];      // o que não prometo / como funciona o limite
  steps: { t: string; d: string }[];
  stack?: string[];
  projects?: string[];   // slugs de src/data/projects.ts
  faq: Faq[];
  message: string;       // mensagem pronta do WhatsApp
  ogImage: string;
};

const passosPadrao = [
  { t: 'Conversa', d: 'Você conta o que precisa pelo WhatsApp ou por videochamada. Faço as perguntas certas para entender o problema.' },
  { t: 'Proposta', d: 'Envio escopo, prazo e valor por escrito. Só começo depois da sua aprovação.' },
  { t: 'Construção', d: 'Você acompanha o andamento e aprova as etapas antes de qualquer coisa ir para o ar.' },
  { t: 'Entrega', d: 'Publico, testo e explico como usar. Os acessos e o código ficam com você.' },
];

export const SERVICES: Service[] = [
  {
    slug: 'site_institucional',
    icon: 'Globe',
    group: 'principal',
    name: 'Criação de sites e lojas',
    title: 'Criação de Sites e Lojas Virtuais | Marcelo Fernandes',
    description: 'Crio sites, páginas de divulgação e lojas virtuais para pequenas empresas. Páginas rápidas, fáceis de usar no celular e preparadas para aparecer nas buscas. Atendimento em Uberlândia e em todo o Brasil.',
    h1: 'Criação de sites e lojas virtuais',
    lead: 'Crio páginas que explicam o que sua empresa faz, funcionam bem no celular e facilitam o contato pelo WhatsApp.',
    summary: 'Páginas claras, rápidas e preparadas para as buscas, com contato fácil pelo WhatsApp.',
    problems: [
      'Quem procura o seu serviço no Google encontra o concorrente, não você.',
      'O site atual é lento, quebra no celular ou está desatualizado.',
      'O negócio depende só das redes sociais e não tem um endereço próprio na internet.',
      'Você quer vender pela internet sem pagar comissão a marketplace em cada venda.',
    ],
    includes: [
      'Site para apresentar sua empresa, página de campanha ou loja virtual com catálogo, carrinho e pagamento.',
      'Layout próprio, pensado primeiro para o celular.',
      'Botões de WhatsApp com mensagem pronta em cada página.',
      'Configuração das páginas para mecanismos de busca: títulos, descrições, mapa do site e cadastro no Google Search Console.',
      'Google Maps, Google Analytics e formulários de contato configurados.',
      'Domínio, HTTPS e publicação prontos.',
      'Melhorias em sites existentes: velocidade, layout, correções e conteúdo.',
    ],
    limits: [
      'A posição no Google depende de vários fatores. Preparo o site para as buscas e explico o que pode melhorar o resultado.',
      'As informações do negócio vêm de você. Posso redigir os textos a partir de uma conversa.',
    ],
    steps: passosPadrao,
    stack: ['HTML e CSS modernos', 'Astro', 'JavaScript', 'PHP', 'Node.js', 'Cloudflare', 'GitHub Pages'],
    projects: ['cortes-grafica', 'grimoria'],
    faq: [
      { q: 'Quanto custa um site?', a: 'Depende do número de páginas, dos recursos e das integrações. Você recebe uma proposta fechada, com escopo e prazo, antes de começar. O orçamento é gratuito.' },
      { q: 'Em quanto tempo fica pronto?', a: 'O prazo vem na proposta. Um site institucional pequeno costuma levar menos tempo que uma loja virtual, que exige catálogo, pagamento e frete.' },
      { q: 'Vou conseguir atualizar o site depois?', a: 'Sim. Combinamos na proposta se você vai editar sozinho (com um painel) ou se prefere que eu faça as alterações.' },
      { q: 'O domínio e o site ficam no meu nome?', a: 'Sim. O domínio é registrado no seu nome e você recebe todos os acessos ao final.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero um orçamento de site.',
    ogImage: '/img/og/sites.jpg',
  },
  {
    slug: 'software',
    icon: 'LayoutDashboard',
    group: 'principal',
    name: 'Software sob medida',
    title: 'Software e Sistemas Web sob Medida | Marcelo Fernandes',
    description: 'Desenvolvo software para organizar pedidos, cadastros, pagamentos e o trabalho da equipe. Sistemas web sob medida para pequenas empresas em Uberlândia e em todo o Brasil.',
    h1: 'Software feito para o jeito que sua empresa trabalha',
    lead: 'Se planilhas e programas prontos já não resolvem, crio um sistema para reunir pedidos, informações e equipe em um só lugar.',
    summary: 'Organize pedidos, cadastros e equipe em um sistema feito para sua rotina.',
    problems: [
      'O controle está espalhado em planilhas que ninguém sabe qual é a versão certa.',
      'Um pedido passa por várias pessoas e não dá para saber em que etapa está.',
      'Os sistemas que você usa não conversam entre si e alguém copia dados à mão.',
      'Você precisa de um painel para a equipe, mas nenhum software pronto encaixa no seu jeito de trabalhar.',
    ],
    includes: [
      'Painéis administrativos com login e permissões por função.',
      'Cadastros, pedidos, agendamentos, estoque e acompanhamento de etapas.',
      'Pagamento online por PIX com confirmação automática (Mercado Pago).',
      'Integração com outros sistemas, planilhas e e-mail para evitar digitação repetida.',
      'Envio de arquivos pelos usuários, com validação.',
      'Publicação no servidor, backups e documentação de uso.',
    ],
    limits: [
      'Aplicativos nativos para as lojas da Apple e do Google não fazem parte do escopo padrão. Um sistema web responsivo costuma resolver, e avalio cada caso.',
      'Sistemas maiores são entregues em etapas, começando pela parte que mais economiza tempo.',
    ],
    steps: passosPadrao,
    stack: ['Node.js', 'Express', 'Python', 'PHP', 'MariaDB / MySQL', 'JWT', 'Docker'],
    projects: ['cortes-grafica', 'grimoria'],
    faq: [
      { q: 'Preciso saber exatamente o que quero antes de pedir?', a: 'Não. Conte como o trabalho é feito hoje e onde surgem atrasos ou erros. Na primeira conversa, definimos juntos o que o sistema precisa fazer.' },
      { q: 'O sistema fica preso a você?', a: 'Não. O código e os acessos são entregues a você, com documentação para que outro profissional possa continuar se for preciso.' },
      { q: 'Onde o sistema fica hospedado?', a: 'Num servidor ou serviço de nuvem escolhido conforme o uso e o orçamento. A conta fica no seu nome.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero conversar sobre um sistema web.',
    ogImage: '/img/og/software.jpg',
  },
  {
    slug: 'automacao_relatorios',
    icon: 'Workflow',
    group: 'complementar',
    name: 'Automação e dados',
    title: 'Automação de Tarefas e Relatórios com Python | Marcelo Fernandes',
    description: 'Automação de tarefas repetitivas com Python: planilhas, relatórios automáticos, tratamento de dados, painéis no Power BI e integração entre sistemas.',
    h1: 'Automação de tarefas e relatórios',
    lead: 'Tarefas repetitivas viram rotinas que rodam sozinhas: relatórios, planilhas e conferências sem copiar e colar, e sem depender de uma pessoa só.',
    summary: 'Relatórios e planilhas que se montam sozinhos, sem copiar e colar.',
    problems: [
      'Alguém passa horas por semana copiando dados de um sistema para uma planilha.',
      'O relatório do mês depende de uma pessoa e atrasa quando ela falta.',
      'As planilhas têm dados duplicados, formatos diferentes e erros de digitação.',
      'Você só descobre um problema quando o cliente reclama, porque nada avisa antes.',
    ],
    includes: [
      'Scripts em Python para tarefas repetitivas.',
      'Limpeza e organização de planilhas, CSV e exportações de sistemas.',
      'Relatórios gerados e enviados automaticamente, por e-mail ou num painel.',
      'Painéis de acompanhamento no Power BI.',
      'Integração entre sistemas por API.',
      'Rotinas agendadas e alertas no celular quando algo foge do normal.',
    ],
    limits: [
      'Antes de automatizar, confiro se o processo está bem definido. Automatizar um processo confuso só gera erro mais rápido.',
      'Quando a automação depende de um sistema de terceiros, ela fica limitada ao que esse sistema permite exportar ou integrar.',
    ],
    steps: passosPadrao,
    stack: ['Python', 'pandas', 'Power BI', 'APIs REST', 'cron', 'Linux'],
    projects: ['grimoria'],
    faq: [
      { q: 'Que tipo de tarefa dá para automatizar?', a: 'Em geral, toda tarefa repetitiva com regras claras: juntar planilhas, conferir valores, gerar relatórios, mover dados entre sistemas e enviar avisos.' },
      { q: 'Preciso de um servidor?', a: 'Nem sempre. Algumas automações rodam no seu próprio computador. As que precisam funcionar 24 horas vão para um servidor ou serviço de nuvem barato.' },
      { q: 'E se a automação parar de funcionar?', a: 'As rotinas registram o que fizeram e podem avisar quando falham. A entrega inclui instruções e um período de acompanhamento combinado na proposta.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero automatizar uma tarefa.',
    ogImage: '/img/og/automacao.jpg',
  },
  {
    slug: 'manutencao_servidores',
    icon: 'Server',
    group: 'complementar',
    name: 'Servidores Linux',
    title: 'Manutenção de Servidores Linux, Nginx e Docker | Marcelo Fernandes',
    description: 'Configuração e manutenção de servidores Linux: Nginx, HTTPS, Docker, backups automáticos, monitoramento e diagnóstico de lentidão. Uberlândia-MG e remoto para todo o Brasil.',
    h1: 'Servidores Linux, Nginx e Docker',
    lead: 'Configuro e mantenho o servidor onde o seu site ou sistema roda, com backup, monitoramento e acesso seguro, para ele continuar no ar e você saber de qualquer problema antes do cliente.',
    summary: 'Servidor com HTTPS, backup testado e alerta quando algo sai do normal.',
    problems: [
      'O site cai de vez em quando e ninguém sabe dizer por quê.',
      'O servidor nunca foi atualizado e ninguém sabe o que está instalado nele.',
      'Não existe backup, ou existe, mas nunca foi testado.',
      'O sistema ficou lento e a solução proposta é sempre pagar um plano maior.',
    ],
    includes: [
      'Instalação e configuração de servidores Ubuntu e Debian (VPS ou AWS EC2).',
      'Nginx como proxy reverso, com HTTPS (Let\'s Encrypt), compressão e cache.',
      'Aplicações em Docker e Docker Compose, recriáveis sem perder configuração.',
      'Backups automáticos com teste de restauração.',
      'Monitoramento com Grafana e Prometheus e alertas no celular.',
      'Diagnóstico de lentidão, quedas, disco cheio e uso de memória.',
    ],
    limits: [
      'Antes de mexer num servidor em produção, faço backup e combino a janela de manutenção. Toda mudança tem um caminho de volta documentado.',
      'O suporte contínuo é opcional e fica combinado na proposta, com o que está e o que não está coberto.',
    ],
    steps: passosPadrao,
    stack: ['Ubuntu / Debian', 'Nginx', 'Docker', 'Let\'s Encrypt', 'iptables', 'Grafana', 'Prometheus', 'Bash'],
    projects: ['grimoria'],
    faq: [
      { q: 'Você atende servidores que outra pessoa configurou?', a: 'Sim. Começo com um levantamento do que está instalado e funcionando, sem alterar nada, e só depois proponho mudanças.' },
      { q: 'Precisa ser presencial?', a: 'Não. O trabalho é feito por acesso remoto seguro (SSH com chave), com o seu consentimento e registro do que foi alterado.' },
      { q: 'Você trabalha com Windows Server?', a: 'O foco é Linux. Para servidores Windows, avalio caso a caso e digo com franqueza se é o melhor caminho.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e preciso de ajuda com um servidor Linux.',
    ogImage: '/img/og/servidores.jpg',
  },
  {
    slug: 'cloud',
    icon: 'Cloud',
    group: 'complementar',
    name: 'Nuvem e publicação',
    title: 'Publicação de Aplicações na Nuvem (AWS e VPS) | Marcelo Fernandes',
    description: 'Publicação de sites e sistemas na nuvem: escolha do provedor, AWS EC2, VPS, Cloudflare, domínio, DNS, migração de hospedagem e revisão de custos.',
    h1: 'Nuvem e publicação de aplicações',
    lead: 'Coloco o seu site ou sistema no ar na AWS, numa VPS ou num serviço gerenciado, no tamanho certo para o uso real e sem pagar por estrutura parada.',
    summary: 'Publique ou troque de hospedagem pagando só pelo que usa.',
    problems: [
      'A conta da hospedagem cresceu e ninguém sabe exatamente pelo que está pagando.',
      'Você precisa trocar de hospedagem sem deixar o site fora do ar.',
      'A aplicação funciona no computador do desenvolvedor, mas ninguém sabe publicá-la.',
      'O domínio, o e-mail e o DNS estão espalhados em contas diferentes.',
    ],
    includes: [
      'Escolha do provedor e do plano: AWS EC2, VPS, Render, GitHub Pages ou Cloudflare.',
      'Publicação de aplicações, com variáveis e segredos guardados no servidor.',
      'Domínio, DNS, CDN e HTTPS configurados.',
      'Migração de hospedagem planejada para reduzir o tempo fora do ar.',
      'Revisão de custos e do tamanho das máquinas.',
    ],
    limits: [
      'O foco são aplicações de pequenas e médias empresas. Arquiteturas grandes com Kubernetes ou várias nuvens precisam de uma análise específica antes de qualquer proposta.',
    ],
    steps: passosPadrao,
    stack: ['AWS EC2', 'Cloudflare', 'Render', 'GitHub Pages', 'Docker', 'Nginx'],
    projects: ['grimoria', 'cortes-grafica'],
    faq: [
      { q: 'AWS é sempre a melhor opção?', a: 'Não. Para muitos sites, uma hospedagem estática ou uma VPS simples custa menos e resolve. A escolha depende do uso, e explico os prós e contras de cada opção.' },
      { q: 'A conta da nuvem fica no meu nome?', a: 'Sim. A conta e o cartão de cobrança são seus. Recebo apenas o acesso necessário para o trabalho.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero publicar ou migrar uma aplicação na nuvem.',
    ogImage: '/img/og/cloud.jpg',
  },
  {
    slug: 'seguranca_cibernetica',
    icon: 'ShieldCheck',
    group: 'principal',
    name: 'Segurança de sites e dados',
    title: 'Segurança de Sites e Dados para Pequenas Empresas | Marcelo Fernandes',
    description: 'Reviso a segurança de sites e servidores, os acessos e as cópias de segurança. Você recebe um relatório com os riscos encontrados e as correções recomendadas.',
    h1: 'Mais segurança para seu site e seus dados',
    lead: 'Verifico quem pode acessar seu site e servidor, se os sistemas estão atualizados e se os dados podem ser recuperados em caso de problema.',
    summary: 'Revise acessos, atualizações e cópias de segurança antes que um problema apareça.',
    problems: [
      'O servidor tem portas abertas e acessos que ninguém lembra de ter criado.',
      'O site usa plugins e bibliotecas desatualizados há anos.',
      'Se o servidor fosse apagado hoje, não haveria como recuperar os dados.',
      'O formulário do site coleta dados de clientes, mas não existe política de privacidade.',
    ],
    includes: [
      'Revisão do site e do servidor, com relatório dos riscos encontrados e das correções recomendadas.',
      'Proteção dos acessos ao servidor e fechamento de serviços expostos sem necessidade.',
      'HTTPS e cabeçalhos de segurança configurados.',
      'Cópias de segurança automáticas, com teste para confirmar que os dados podem ser recuperados.',
      'Monitoramento de logs e de tentativas de acesso.',
      'Atualização de sistema e de dependências com risco conhecido.',
      'Orientação básica sobre LGPD para sites: política de privacidade e formulários.',
    ],
    limits: [
      'Nenhum sistema é totalmente seguro. A revisão identifica riscos conhecidos, orienta as correções e registra o que foi feito.',
      'Não ofereço teste de invasão formal nem parecer jurídico sobre LGPD.',
    ],
    steps: passosPadrao,
    stack: ['Linux', 'iptables', 'Nginx', 'SSH', 'Let\'s Encrypt', 'Logs'],
    projects: ['grimoria'],
    faq: [
      { q: 'A revisão pode derrubar o meu site?', a: 'A análise é feita sem alterar nada. As correções são aplicadas depois, com backup e em horário combinado.' },
      { q: 'Você faz teste de invasão?', a: 'Não. Faço uma revisão das configurações de segurança. Se você precisar de um teste de invasão formal, recomendo uma empresa especializada.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero uma revisão de segurança do meu servidor ou site.',
    ogImage: '/img/og/seguranca.jpg',
  },
  {
    slug: 'ia',
    icon: 'Sparkles',
    group: 'complementar',
    name: 'IA aplicada',
    title: 'Integração de Inteligência Artificial e Chatbots | Marcelo Fernandes',
    description: 'IA aplicada a tarefas reais: integração com APIs de IA, chatbots com as informações do seu negócio, extração de dados de documentos e automação de fluxos com revisão humana.',
    h1: 'Inteligência artificial aplicada ao dia a dia',
    lead: 'Uso modelos de IA, como Claude e ChatGPT, em tarefas concretas: responder dúvidas frequentes, organizar mensagens, resumir documentos e preencher planilhas.',
    summary: 'IA em tarefas concretas, com revisão humana onde a resposta importa.',
    problems: [
      'A equipe responde as mesmas perguntas de clientes todos os dias.',
      'Informações importantes chegam em PDFs, e-mails e mensagens e precisam ser digitadas à mão.',
      'Você quer usar IA no negócio, mas não sabe por onde começar sem expor dados.',
    ],
    includes: [
      'Integração com APIs de IA em sistemas, sites e planilhas.',
      'Assistentes e chatbots que respondem com base nas informações do seu negócio.',
      'Extração e classificação de dados de textos e documentos.',
      'Fluxos automatizados com IA e revisão humana nas etapas importantes.',
    ],
    limits: [
      'A IA erra. Por isso, todo fluxo tem revisão humana onde a resposta importa.',
      'Chaves de API e dados ficam no servidor, nunca no navegador do visitante. O custo de uso das APIs é estimado antes.',
    ],
    steps: passosPadrao,
    stack: ['APIs de IA (Anthropic, OpenAI)', 'Python', 'Node.js', 'Automação'],
    faq: [
      { q: 'Os dados da minha empresa vão para a IA?', a: 'Só o necessário para a tarefa, e isso é decidido com você antes. Quando o dado é sensível, avaliamos alternativas ou deixamos a IA fora daquela etapa.' },
      { q: 'Quanto custa usar a IA depois de pronto?', a: 'As APIs cobram por uso. Antes de implementar, faço uma estimativa com base no volume esperado.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero usar IA no meu negócio.',
    ogImage: '/img/og/ia.jpg',
  },
  {
    slug: 'material-grafico',
    icon: 'Printer',
    group: 'complementar',
    name: 'Material gráfico',
    title: 'Cartões de Visita, Pastas e Papelaria em Uberlândia | Marcelo Fernandes',
    description: 'Cartões de visita, pastas personalizadas, papel timbrado, envelopes, panfletos e folders com arte criada para o seu negócio e acompanhamento da produção. Uberlândia-MG.',
    h1: 'Material gráfico com a identidade do seu negócio',
    lead: 'Cartões de visita, pastas, papel timbrado e panfletos com a mesma identidade do seu site. Crio a arte e acompanho a produção com acabamento profissional.',
    summary: 'Cartões, pastas e papelaria com a mesma identidade do seu site.',
    problems: [
      'O cartão de visita não combina com o site nem com as redes sociais.',
      'Você precisa de material impresso para uma reunião ou evento e não sabe quais papéis e acabamentos escolher.',
      'A arte que você tem não está no formato certo para a gráfica.',
    ],
    includes: [
      'Cartões de visita em vários papéis e acabamentos.',
      'Pastas personalizadas com bolso e encaixe para cartão.',
      'Papel timbrado e envelopes.',
      'Panfletos e folders.',
      'Acabamentos como hot stamping, laminação fosca, verniz localizado e papéis especiais.',
      'Arte preparada para impressão e conferida antes de produzir.',
    ],
    limits: [
      'Prazo e valor dependem do papel, da quantidade e do acabamento escolhidos, e vêm na proposta.',
      'A prova de cor na tela é aproximada. Quando a cor é crítica, combinamos uma prova impressa.',
    ],
    steps: [
      { t: 'Conversa', d: 'Você conta o que precisa, para quando precisa e mostra a identidade que já tem.' },
      { t: 'Proposta', d: 'Envio as opções de papel e acabamento com valor e prazo.' },
      { t: 'Arte', d: 'Crio a arte e você aprova a versão final antes da impressão.' },
      { t: 'Produção', d: 'Acompanho a produção e a entrega do material.' },
    ],
    faq: [
      { q: 'Você faz só a arte ou só a impressão?', a: 'Os dois, juntos ou separados. Se você já tem a arte, eu confiro se ela está pronta para imprimir.' },
      { q: 'Dá para fazer o site e o material com a mesma identidade?', a: 'Sim. Essa é a vantagem de fazer tudo no mesmo lugar: cores, fontes e logo ficam iguais no papel e na internet.' },
    ],
    message: 'Olá, Marcelo! Vim pelo site e quero um orçamento de material gráfico.',
    ogImage: '/img/og/home.jpg',
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
