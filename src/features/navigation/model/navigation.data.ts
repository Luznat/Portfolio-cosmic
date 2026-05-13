import type { To } from 'react-router-dom'

export type NavItem = {
  readonly label: string
  readonly to: To
}

export const nav: readonly NavItem[] = [
  { label: 'Início', to: { pathname: '/', hash: 'inicio' } },
  { label: 'Projetos', to: { pathname: '/', hash: 'projetos' } },
  { label: 'Contato', to: { pathname: '/', hash: 'contato' } },
] as const
