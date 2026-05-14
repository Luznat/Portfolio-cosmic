import { memo, useCallback } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { FeaturedProject } from '../../../content/featuredProjects'
import { STAR_PROJECT_URL } from './starAssetUrls'
import styles from './andromedaConstellation.module.css'

export type MainProjectStarProps = {
  readonly project: FeaturedProject
  readonly scrollYProgress: MotionValue<number>
  readonly reveal: readonly [number, number]
  readonly hoverId: string | null
  readonly onHover: (id: string | null) => void
}

export const MainProjectStar = memo(function MainProjectStar({
  project,
  scrollYProgress,
  reveal,
  hoverId,
  onHover,
}: MainProjectStarProps) {
  const opacity = useTransform(
    scrollYProgress,
    [reveal[0], reveal[1]],
    [0, 1],
    { clamp: true },
  )
  const scale = useTransform(
    scrollYProgress,
    [reveal[0], reveal[1]],
    [0.9, 1],
    { clamp: true },
  )
  const glow = useTransform(
    scrollYProgress,
    [reveal[0], Math.min(1, reveal[1] + 0.1)],
    [0, 1],
    { clamp: true },
  )

  const enter = useCallback(() => onHover(project.slug), [onHover, project.slug])
  const leave = useCallback(() => onHover(null), [onHover])
  const active = hoverId === project.slug

  return (
    <motion.div
      className={styles.mainAnchor}
      style={{
        left: `${project.cx}%`,
        top: `${project.cy}%`,
        opacity,
        scale,
      }}
    >
      <Link
        className={styles.mainHit}
        to={`/projects/${project.slug}`}
        onMouseEnter={enter}
        onMouseLeave={leave}
        data-active={active ? '1' : undefined}
      >
        <span className={styles.srOnly}>
          {project.name} — {project.tagline}
        </span>
        <div className={styles.mainStack}>
          <motion.div
            className={styles.coreGlow}
            style={{ opacity: glow }}
            aria-hidden
          />
          <motion.div
            className={styles.breathRing}
            style={{ opacity: glow }}
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
  )
})
