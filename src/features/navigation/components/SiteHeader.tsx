import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { nav } from '../model/navigation.data'
import styles from '../styles/SiteHeader.module.css'

export function SiteHeader() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link className={styles.brand} to="/">
        Luiz Felipe
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {nav.map((item) => (
          <Link key={item.label} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  )
}
