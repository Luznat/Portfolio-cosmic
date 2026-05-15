import { memo, useCallback } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { FeaturedProject } from '../../../../content/featuredProjects'
import { revealOpacity, revealScale } from '../lib/scrollReveal'
import { STAR_PROJECT_URL } from '../lib/starAssetUrls'
import styles from './mainProjectStar.module.css'

export type MainProjectStarProps = {
  readonly project: FeaturedProject
  readonly scrollYProgress: MotionValue<number>
  readonly reveal: readonly [number, number]
  readonly hoverConstellationSlug: string | null
  readonly onHoverConstellation: () => void
}

export const MainProjectStar = memo(function MainProjectStar({
  project,
  scrollYProgress,
  reveal,
  hoverConstellationSlug,
  onHoverConstellation,
}: MainProjectStarProps) {
  const constellationLit = hoverConstellationSlug === project.slug

  const opacity = useTransform(scrollYProgress, (progress) =>
    revealOpacity(progress, reveal),
  )
  const scale = useTransform(scrollYProgress, (progress) =>
    revealScale(progress, reveal, 0.9, 1),
  )

  const glowOpacity = useTransform(scrollYProgress, (progress) => {
    if (constellationLit) return 1
    return revealOpacity(progress, reveal, 0.1)
  })

  const enter = useCallback(() => onHoverConstellation(), [onHoverConstellation])

  return (
    <div
      className={styles.mainAnchor}
      style={{ left: `${project.cx}%`, top: `${project.cy}%` }}
      data-constellation-lit={constellationLit ? '1' : undefined}
      onMouseEnter={enter}
    >
      <motion.div className={styles.mainAnchorMotion} style={{ opacity, scale }}>
        <Link
          className={styles.mainHit}
          to={`/projects/${project.slug}`}
          data-active={constellationLit ? '1' : undefined}
          data-constellation-lit={constellationLit ? '1' : undefined}
        >
          <span className={styles.srOnly}>
            {project.name} — {project.tagline}
          </span>
          <div className={styles.mainStack}>
            <motion.div
              className={styles.coreGlow}
              style={{ opacity: glowOpacity }}
              aria-hidden
            />
            <motion.div
              className={styles.breathRing}
              style={{ opacity: glowOpacity }}
              aria-hidden
            />
            <img
              className={styles.mainStarImg}
              src={STAR_PROJECT_URL}
              alt=""
              draggable={false}
            />
            <div className={styles.coreHalo} aria-hidden />
            <div className={styles.coreCover}>
              {project.coverSrc ? (
                <img
                  className={styles.corePhoto}
                  src={project.coverSrc}
                  alt=""
                  draggable={false}
                />
              ) : (
                <div className={styles.coreFallback} aria-hidden />
              )}
            </div>
            <div className={styles.mainCaption} aria-hidden>
              <span className={styles.mainName}>{project.name}</span>
              <span className={styles.mainTag}>{project.tagline}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
})
