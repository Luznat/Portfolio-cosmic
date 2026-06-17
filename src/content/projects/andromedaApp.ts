import screenHome from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260521_185848_Andromeda.jpg'
import screenTarot from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260521_185900_Andromeda.jpg'
import screenProfile from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260521_185915_Andromeda.jpg'
import screenSearch from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260521_185946_Andromeda.jpg'
import screenMessages from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260609_155555_Andromeda.jpg'
import screenCategory from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260609_155633_Andromeda.jpg'
import screenChat from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260609_155808_Andromeda.jpg'
import screenSplash from '../../shared/assets/images/projetos/andromeda-app/Screenshot_20260526_023152_Andromeda.jpg'

export const andromedaAppSlug = 'andromeda-app' as const

export const andromedaAppContent = {
  slug: andromedaAppSlug,
  kicker: '+ Sistema',
  title: 'Andrômeda App',
  headline: 'ANDRÔMEDA APP',
  tagline: 'Aplicativo de astronomia e exploração espacial.',
  description:
    'Andrômeda é um aplicativo desenvolvido para conectar pessoas em busca de orientação espiritual com profissionais especializados em diversas práticas e abordagens. O objetivo é criar um ambiente acessível, seguro e acolhedor para facilitar o encontro entre quem procura auxílio e quem pode oferecê-lo.',
  meta: [
    { label: 'Status', value: 'Concluído', tone: 'success' as const },
    { label: 'Ano', value: '2026' },
    { label: 'Categoria', value: 'Mobile' },
    { label: 'Plataformas', value: 'Android · iOS' },
  ],
  links: {
    project: '#',
    github: '#',
  },
  heroScreens: [
    {
      id: 'home',
      src: screenHome,
      alt: 'Tela inicial do Andrômeda com recomendações e destaques',
    },
    {
      id: 'splash',
      src: screenSplash,
      alt: 'Tela de boas-vindas do Andrômeda com nebulosa e botão Iniciar jornada',
    },
    {
      id: 'profile',
      src: screenProfile,
      alt: 'Perfil do usuário com constelação e progresso no Andrômeda',
    },
  ],
  stack: [
    { id: 'rn', label: 'React Native', role: 'Framework' },
    { id: 'gh', label: 'GitHub', role: 'Versionamento' },
    { id: 'figma', label: 'Figma', role: 'Protótipo' },
    { id: 'firebase', label: 'Firebase', role: 'Backend' },
    { id: 'node', label: 'Node.js', role: 'API & Services' },
    { id: 'ts', label: 'TypeScript', role: 'Linguagem' },
  ],
  insights: [
    {
      id: 'mission',
      title: 'Missão',
      icon: '✦',
      body: 'Criar uma ponte entre quem busca respostas, autoconhecimento e desenvolvimento espiritual e os profissionais capazes de auxiliar nessa jornada.',
    },
    {
      id: 'challenges',
      title: 'Desafios',
      icon: '◇',
      body: [
        'Desenvolver uma plataforma capaz de atender diferentes perfis de usuários, incluindo clientes e profissionais espirituais.',
        'Performance em dispositivos de gama média.',
        'Identidade visual forte sem comprometer legibilidade.',
      ],
    },
    {
      id: 'solutions',
      title: 'Soluções',
      icon: '◎',
      body: 'Aplicação desenvolvida em React Native com arquitetura modular, componentes reutilizáveis e interface intuitiva, projetada para facilitar a conexão entre usuários e profissionais da área espiritual.',
    },
    {
      id: 'learnings',
      title: 'Aprendizados',
      icon: '✧',
      body: [
        'Integração com APIs complexas e cache inteligente.',
        'Otimização de listas e animações em mobile.',
        'Design system coerente do protótipo ao código.',
      ],
    },
  ],
  artifacts: {
    sectionTitle: 'Artefatos do sistema',
    progressLabel: 'Explorando sistema estelar',
    items: [
      {
        id: 'splash',
        label: 'Splash — Andrômeda',
        src: screenSplash,
        alt: 'Tela de boas-vindas do Andrômeda com nebulosa e botão Iniciar jornada',
      },
      {
        id: 'home',
        label: 'Início — recomendações',
        src: screenHome,
        alt: 'Tela inicial do Andrômeda com destaques e serviços recomendados',
      },
      {
        id: 'tarot',
        label: 'Tarot  — mentoria',
        src: screenTarot,
        alt: 'Detalhe da mentoria premium Tarot com horários e agendamento',
      },
      {
        id: 'profile',
        label: 'Perfil — constelação',
        src: screenProfile,
        alt: 'Perfil do usuário com constelação, créditos e progresso astral',
      },
      {
        id: 'search',
        label: 'Buscar — categorias',
        src: screenSearch,
        alt: 'Tela de busca com categorias populares e leituras em destaque',
      },
      {
        id: 'messages',
        label: 'Mensagens — conexões',
        src: screenMessages,
        alt: 'Lista de mensagens com guias e oráculos astrais',
      },
      {
        id: 'category',
        label: 'Categoria — tarot',
        src: screenCategory,
        alt: 'Categoria Tarot com filtros e lista de oráculos disponíveis',
      },
      {
        id: 'chat',
        label: 'Chat — Mensagem astrais',
        src: screenChat,
        alt: 'Conversa com Selene da Estrela em canal de mensagens astrais',
      },
    ],
  },
} as const

export type AndromedaAppContent = typeof andromedaAppContent
