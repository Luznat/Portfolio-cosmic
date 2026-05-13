import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { featuredProjects } from '../../content/featuredProjects'
import styles from './ConstellationProjects.module.css'

const hoverTransition = {
  duration: 0.65,
  ease: [0.33, 0, 0.2, 1] as const,
}

export const ConstellationProjects = memo(function ConstellationProjects() {
  const [a, b] = featuredProjects

  return (
    <div className={styles.root}>
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <line
          className={styles.line}
          x1={a.cx}
          y1={a.cy}
          x2={b.cx}
          y2={b.cy}
        />
      </svg>
      {[a, b].map((p) => (
        <motion.div
          key={p.slug}
          className={styles.nodeAnchor}
          style={{ left: `${p.cx}%`, top: `${p.cy}%` }}
          whileHover={{ scale: 1.04, transition: hoverTransition }}
          whileTap={{ scale: 0.98 }}
        >
          <Link className={styles.node} to={`/projects/${p.slug}`}>
            <span className={styles.nodeLabel}>{p.name}</span>
            <span className={styles.nodeTag}>{p.tagline}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
})
