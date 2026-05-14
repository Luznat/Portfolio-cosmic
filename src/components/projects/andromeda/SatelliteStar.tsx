import { memo, useCallback } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ProjectSatellite } from '../../../content/featuredProjects'
import { satelliteAssetUrl } from './starAssetUrls'
import styles from './andromedaConstellation.module.css'

export type SatelliteStarProps = {
  readonly satellite: ProjectSatellite
  readonly scrollYProgress: MotionValue<number>
  readonly reveal: readonly [number, number]
  readonly hoverId: string | null
  readonly onHover: (id: string | null) => void
}

export const SatelliteStar = memo(function SatelliteStar({
  satellite,
  scrollYProgress,
  reveal,
  hoverId,
  onHover,
}: SatelliteStarProps) {
  const opacity = useTransform(
    scrollYProgress,
    [reveal[0], reveal[1]],
    [0, 1],
    { clamp: true },
  )
  const scale = useTransform(
    scrollYProgress,
    [reveal[0], reveal[1]],
    [0.88, 1],
    { clamp: true },
  )
  const glow = useTransform(
    scrollYProgress,
    [reveal[0], Math.min(1, reveal[1] + 0.12)],
    [0, 1],
    { clamp: true },
  )

  const enter = useCallback(() => onHover(satellite.id), [onHover, satellite.id])
  const leave = useCallback(() => onHover(null), [onHover])
  const active = hoverId === satellite.id

  return (
    <motion.div
      className={styles.satAnchor}
      style={{ left: `${satellite.cx}%`, top: `${satellite.cy}%`, opacity, scale }}
    >
      <div
        className={styles.satHit}
        aria-hidden
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <motion.div
          className={styles.satGlow}
          style={{ opacity: glow }}
          aria-hidden
        />
        <img
          className={styles.satImg}
          src={satelliteAssetUrl(satellite.variant)}
          alt=""
          draggable={false}
          data-active={active ? '1' : undefined}
        />
      </div>
    </motion.div>
  )
})
