import { motion } from 'framer-motion'
import { useCallback, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useOptionalHomeScroll } from '../../../hooks/useHomeScroll'
import { nav, type NavItem } from '../model/navigation.data'
import styles from '../styles/SiteHeader.module.css'

function sectionIdFromNavItem(item: NavItem): string | null {
  const { to } = item
  if (typeof to === 'string') return null
  const hash = to.hash
  if (!hash) return null
  return hash.replace(/^#/, '')
}

type SiteHeaderProps = {
  variant?: 'default' | 'project'
}

export function SiteHeader({ variant = 'default' }: SiteHeaderProps) {
  const homeScroll = useOptionalHomeScroll()

  const handleSectionNav = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      if (!homeScroll) return
      event.preventDefault()
      homeScroll.scrollToSection(sectionId)
      window.history.replaceState(null, '', `/#${sectionId}`)
    },
    [homeScroll],
  )

  return (
    <motion.header
      className={
        variant === 'project'
          ? `${styles.header} ${styles.headerOnProject}`
          : styles.header
      }
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        className={styles.brand}
        to="/"
        onClick={(event) => handleSectionNav(event, 'inicio')}
      >
        Luiz Felipe
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {nav.map((item) => {
          const sectionId = sectionIdFromNavItem(item)
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={
                sectionId
                  ? (event) => handleSectionNav(event, sectionId)
                  : undefined
              }
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </motion.header>
  )
}
