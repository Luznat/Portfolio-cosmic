export type ContactLink = {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly detail: string
  readonly external?: boolean
}

export const contactEmail = 'Luiz.fep078@gmail.com'

/** Opens Gmail compose with the recipient prefilled */
export const contactEmailGmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`

export const githubProfileHref = 'https://github.com/Luznat'

export const linkedinProfileHref = 'https://www.linkedin.com/in/luiz-fep'

export const contactIntro = {
  kicker: 'Contato',
  title: 'Alcance-me por aqui',
  lead: 'Aberto a conversas sobre projetos, colaborações e oportunidades.',
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
