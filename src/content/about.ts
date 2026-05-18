export type AboutHighlight = {
  readonly label: string
}

export const aboutAvatar = {
  alt: 'Retrato de Luiz Felipe',
} as const

export const aboutIntro = {
  kicker: 'Sobre mim',
  title: 'Do código ao cosmos do mobile',
  lead: 'Desenvolvedor focado em experiências mobile, com identidade visual forte, performance e detalhe em cada interação.',
  paragraphs: [
    'Trabalho na interseção entre engenharia e design: interfaces que respiram, animações com propósito e arquiteturas que escalam sem perder a alma do produto.',
    'Atualmente desenvolvo aplicações utilizando React, React Native, TypeScript e tecnologias modernas de frontend, explorando experiências imersivas, componentização, responsividade e construção de interfaces vivas e intuitivas.',
    'Também estudo UI/UX, animações para web e organização de arquitetura frontend, buscando unir estética, fluidez e funcionalidade em cada projeto.',
    'Este portfólio é um mapa — constelações de projetos, trajetos reais e fragmentos da forma como penso, crio e construo.',
  ],
} as const

export const aboutHighlights: readonly AboutHighlight[] = [
  { label: 'React Native & Expo' },
  { label: 'TypeScript' },
  { label: 'UI motion & acessibilidade' },
  { label: 'Design systems' },
] as const
