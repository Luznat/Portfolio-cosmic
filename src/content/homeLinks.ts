export interface DocLinkItem {
  href: string
  label: string
  image: 'vite' | 'react'
}

export interface SocialLinkItem {
  href: string
  label: string
  spriteId: string
}

export const documentationLinks: DocLinkItem[] = [
  { href: 'https://vite.dev/', label: 'Explore Vite', image: 'vite' },
  { href: 'https://react.dev/', label: 'Learn more', image: 'react' },
]

export const communityLinks: SocialLinkItem[] = [
  {
    href: 'https://github.com/vitejs/vite',
    label: 'GitHub',
    spriteId: 'github-icon',
  },
  {
    href: 'https://chat.vite.dev/',
    label: 'Discord',
    spriteId: 'discord-icon',
  },
  { href: 'https://x.com/vite_js', label: 'X.com', spriteId: 'x-icon' },
  {
    href: 'https://bsky.app/profile/vite.dev',
    label: 'Bluesky',
    spriteId: 'bluesky-icon',
  },
]
