export type AboutSkillStar = {
  readonly id: string
  readonly label: string
  readonly cx: number
  readonly cy: number
}

export type AboutSkillEdge = {
  readonly from: string
  readonly to: string
}

export const aboutAvatar = {
  alt: 'Retrato de Luiz Felipe',
} as const

export const aboutIntro = {
  kicker: 'Sobre mim',
  title: 'Do código ao cosmos',
  lead: 'Desenvolvedor focado em experiências mobile, com identidade visual forte, performance e detalhe em cada interação.',
  paragraphs: [
    'Trabalho na interseção entre engenharia e design: interfaces que respiram, animações com propósito e arquiteturas que escalam sem perder a alma do produto.',
    'Atualmente desenvolvo aplicações utilizando React, React Native, TypeScript e tecnologias modernas de frontend, explorando experiências imersivas, componentização, responsividade e construção de interfaces vivas e intuitivas.',
    'Também estudo UI/UX, animações para web e organização de arquitetura frontend, buscando unir estética, fluidez e funcionalidade em cada projeto.',
    'Este portfólio é um mapa — constelações de projetos, trajetos reais e fragmentos da forma como penso, crio e construo.',
  ],
} as const

export const aboutSkillStars: readonly AboutSkillStar[] = [
  { id: 'rn', label: 'React Native & Expo', cx: 10, cy: 56 },
  { id: 'ts', label: 'TypeScript', cx: 28, cy: 24 },
  { id: 'react', label: 'React', cx: 50, cy: 14 },
  { id: 'ds', label: 'Design systems', cx: 78, cy: 22 },
  { id: 'js', label: 'JavaScript', cx: 88, cy: 54 },
  { id: 'motion', label: 'UI motion & acessibilidade', cx: 44, cy: 76 },
] as const

/** Tablet e mobile — hexágono mais alto, labels não se sobrepõem */
export const aboutSkillStarsCompact: readonly AboutSkillStar[] = [
  { id: 'ts', label: 'TypeScript', cx: 24, cy: 14 },
  { id: 'react', label: 'React', cx: 50, cy: 8 },
  { id: 'ds', label: 'Design systems', cx: 76, cy: 14 },
  { id: 'rn', label: 'React Native & Expo', cx: 14, cy: 46 },
  { id: 'js', label: 'JavaScript', cx: 86, cy: 46 },
  { id: 'motion', label: 'UI motion & acessibilidade', cx: 50, cy: 76 },
] as const

/** Telefones estreitos — duas colunas, três filas */
export const aboutSkillStarsMobile: readonly AboutSkillStar[] = [
  { id: 'ts', label: 'TypeScript', cx: 72, cy: 100 },
  { id: 'react', label: 'React', cx: 74, cy: 14 },
  { id: 'ds', label: 'Design systems', cx: 26, cy: 20 },
  { id: 'js', label: 'JavaScript', cx: 40, cy: 42 },
  { id: 'rn', label: 'React Native & Expo', cx: 26, cy: 72 },
  { id: 'motion', label: 'UI motion & acessibilidade', cx: 74, cy: 72 },
] as const

export const aboutSkillEdges: readonly AboutSkillEdge[] = [
  { from: 'react', to: 'ds' },
  { from: 'react', to: 'motion' },
  { from: 'js', to: 'ds' },
  { from: 'rn', to: 'motion' },
  { from: 'ts', to: 'motion' },
  { from: 'motion', to: 'js' },
] as const
