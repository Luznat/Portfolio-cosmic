import { motion } from 'framer-motion'
import styles from './SiteHeader.module.css'

const nav = [
  { href: '#inicio', label: 'Início' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
] as const

export function SiteHeader() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className={styles.brand} href="#inicio">
        Luiz Felipe
      </a>
      <nav className={styles.nav} aria-label="Principal">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}
