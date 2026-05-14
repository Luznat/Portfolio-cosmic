import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useHomeScroll } from '../../../hooks/useHomeScroll'
import {
  featuredProjects,
  type ProjectSatellite,
} from '../../../content/featuredProjects'
import { buildConstellationSchedule } from './constellationSchedule'
import { ConstellationLines } from './ConstellationLines'
import { MainProjectStar } from './MainProjectStar'
import { SatelliteStar } from './SatelliteStar'
import styles from './andromedaConstellation.module.css'

export const AndromedaConstellation = memo(function AndromedaConstellation() {
  const { scrollContainerRef } = useHomeScroll()
  const stageRef = useRef<HTMLDivElement>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const schedule = useMemo(
    () => buildConstellationSchedule(featuredProjects),
    [],
  )

  const satelliteById = useMemo(() => {
    const m = new Map<string, ProjectSatellite>()
    for (const p of featuredProjects) {
      for (const s of p.satellites) {
        m.set(s.id, s)
      }
    }
    return m
  }, [])

  const mainRevealBySlug = useMemo(() => {
    const m = new Map(schedule.mainStars.map((m) => [m.slug, m.reveal] as const))
    return m
  }, [schedule.mainStars])

  const { scrollYProgress: rawStageProgress } = useScroll({
    container: scrollContainerRef,
    target: stageRef,
    offset: ['start end', 'end start'],
  })

  /** Full constellation timeline in the first half of the stage crossing (less finger travel). */
  const scrollYProgress = useTransform(
    rawStageProgress,
    [0, 0.48],
    [0, 1],
    { clamp: true },
  )

  const nebulaOpacity = useTransform(
    scrollYProgress,
    [0, 0.06],
    [0, 1],
    { clamp: true },
  )

  const parallaxY = useTransform(scrollYProgress, [0, 1], [12, -14])

  const onHover = useCallback((id: string | null) => {
    setHoverId(id)
  }, [])

  return (
    <div ref={stageRef} className={styles.stage}>
      <motion.div
        className={styles.nebula}
        style={{ opacity: nebulaOpacity }}
        aria-hidden
      />
      <motion.div className={styles.starField} style={{ y: parallaxY }}>
        <ConstellationLines
          scrollYProgress={scrollYProgress}
          edges={schedule.edges}
          hoverId={hoverId}
        />
        {schedule.satellites.map((sr) => {
          const satellite = satelliteById.get(sr.id)
          if (!satellite) return null
          return (
            <SatelliteStar
              key={sr.id}
              satellite={satellite}
              scrollYProgress={scrollYProgress}
              reveal={sr.reveal}
              hoverId={hoverId}
              onHover={onHover}
            />
          )
        })}
        {featuredProjects.map((p) => {
          const reveal = mainRevealBySlug.get(p.slug)
          if (!reveal) return null
          return (
            <MainProjectStar
              key={p.slug}
              project={p}
              scrollYProgress={scrollYProgress}
              reveal={reveal}
              hoverId={hoverId}
              onHover={onHover}
            />
          )
        })}
      </motion.div>
    </div>
  )
})
