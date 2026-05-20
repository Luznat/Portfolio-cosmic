export type ContactLink = {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly detail: string
  readonly external?: boolean
}

export type ContactSignalAnchor = {
  readonly id: string
  readonly cx: number
  readonly cy: number
}

export type ContactSignalLayout = {
  readonly id: string
  readonly cx: number
  readonly cy: number
  readonly depth: number
  readonly floatDuration: number
  readonly floatDelay: number
  readonly orbitX: number
  readonly orbitY: number
}

export type ContactConstellationEdge = {
  readonly from: string
  readonly to: string
}

export const contactEmail = 'Luiz.fep078@gmail.com'

/** Opens Gmail compose with the recipient prefilled */
export const contactEmailGmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`

export const githubProfileHref = 'https://github.com/Luznat'

export const linkedinProfileHref = 'https://www.linkedin.com/in/luiz-fep'

export const contactIntro = {
  kicker: 'Transmissão',
  title: 'Sinais no vácuo',
  lead: 'Canais abertos acima da estrela — alcance através do escuro.',
} as const

export const contactLinks: readonly ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: contactEmailGmailHref,
    detail: contactEmail,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: linkedinProfileHref,
    detail: 'linkedin.com/in/luiz-fep',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: githubProfileHref,
    detail: 'github.com/Luznat',
    external: true,
  },
]

export const contactSignalLayouts: readonly ContactSignalLayout[] = [
  {
    id: 'email',
    cx: 20,
    cy: 52,
    depth: 1,
    floatDuration: 11,
    floatDelay: 0,
    orbitX: 14,
    orbitY: 10,
  },
  {
    id: 'linkedin',
    cx: 74,
    cy: 26,
    depth: 0.62,
    floatDuration: 13.5,
    floatDelay: -2.4,
    orbitX: 11,
    orbitY: 13,
  },
  {
    id: 'github',
    cx: 52,
    cy: 48,
    depth: 0.82,
    floatDuration: 10.2,
    floatDelay: -4.1,
    orbitX: 16,
    orbitY: 9,
  },
]

export const contactSignalAnchors: readonly ContactSignalAnchor[] = [
  { id: 'anchor-a', cx: 38, cy: 18 },
  { id: 'anchor-b', cx: 8, cy: 52 },
  { id: 'anchor-c', cx: 88, cy: 38 },
  { id: 'anchor-d', cx: 62, cy: 14 },
]

export const contactConstellationEdges: readonly ContactConstellationEdge[] = [
  { from: 'email', to: 'anchor-a' },
  { from: 'email', to: 'anchor-b' },
  { from: 'linkedin', to: 'anchor-c' },
  { from: 'linkedin', to: 'anchor-d' },
  { from: 'github', to: 'anchor-a' },
  { from: 'github', to: 'anchor-d' },
]

export const contactSignalById = new Map(
  contactLinks.map((link) => [link.id, link] as const),
)

export const contactLayoutById = new Map(
  contactSignalLayouts.map((layout) => [layout.id, layout] as const),
)
