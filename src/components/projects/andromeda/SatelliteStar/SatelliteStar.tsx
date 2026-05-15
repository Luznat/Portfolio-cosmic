import { memo, useCallback } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ProjectSatellite } from '../../../../content/featuredProjects'
import { revealOpacity, revealScale } from '../lib/scrollReveal'
import { satelliteAssetUrl } from '../lib/starAssetUrls'
import styles from './satelliteStar.module.css'

export type SatelliteStarProps = {
  readonly satellite: ProjectSatellite
  readonly projectSlug: string
  readonly scrollYProgress: MotionValue<number>
  readonly reveal: readonly [number, number]
  readonly hoverConstellationSlug: string | null
  readonly onHoverConstellation: () => void
}

export const SatelliteStar = memo(function SatelliteStar({
  satellite,
  projectSlug,
  scrollYProgress,
  reveal,
  hoverConstellationSlug,
  onHoverConstellation,
}: SatelliteStarProps) {
  const constellationLit = hoverConstellationSlug === projectSlug

  const opacity = useTransform(scrollYProgress, (progress) =>
    revealOpacity(progress, reveal),
  )
  const scale = useTransform(scrollYProgress, (progress) =>
    revealScale(progress, reveal, 0.88, 1),
  )

  const glowOpacity = useTransform(scrollYProgress, (progress) => {
    if (constellationLit) return 1
    return revealOpacity(progress, reveal, 0.12)
  })
  const enter = useCallback(() => onHoverConstellation(), [onHoverConstellation])

  return (
    <div
      className={styles.satAnchor}
      style={{ left: `${satellite.cx}%`, top: `${satellite.cy}%` }}
      data-constellation-lit={constellationLit ? '1' : undefined}
      onMouseEnter={enter}
    >
      <motion.div
        className={styles.satAnchorMotion}
        style={{ opacity, scale }}
      >
        <div className={styles.satHit} aria-hidden>
          <motion.div
            className={styles.satGlow}
            style={{ opacity: glowOpacity }}
            aria-hidden
          />
          <img
            className={styles.satImg}
            src={satelliteAssetUrl(satellite.variant)}
            alt=""
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  )
})
