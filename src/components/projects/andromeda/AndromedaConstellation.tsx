import { memo, useCallback, useMemo, useState } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useHomeScroll } from '../../../hooks/useHomeScroll'
import {
  featuredProjects,
  type FeaturedProject,
} from '../../../content/featuredProjects'
import {
  buildConstellationSchedule,
  type ScheduledEdge,
} from './constellationSchedule'
import { ConstellationLines } from './ConstellationLines'
import { MainProjectStar } from './MainProjectStar'
import { SatelliteStar } from './SatelliteStar'
import styles from './andromedaConstellation.module.css'

const SEQUENCE_FROM_JOURNEY_LO = 0
const SEQUENCE_FROM_JOURNEY_HI = 0.50

type ConstellationLayerProps = {
  readonly project: FeaturedProject
  readonly edges: readonly ScheduledEdge[]
  readonly sequenceProgress: MotionValue<number>
  readonly layerParallaxScrollYProgress: MotionValue<number>
  readonly parallaxSign: number
  readonly mainReveal: readonly [number, number]
  readonly satelliteRevealById: ReadonlyMap<string, readonly [number, number]>
  readonly hoverId: string | null
  readonly onHover: (id: string | null) => void
}

const ConstellationLayer = memo(function ConstellationLayer({
  project,
  edges,
  sequenceProgress,
  layerParallaxScrollYProgress,
  parallaxSign,
  mainReveal,
  satelliteRevealById,
  hoverId,
  onHover,
}: ConstellationLayerProps) {
  const strength = project.constellationParallax ?? 0
  const layerY = useTransform(
    layerParallaxScrollYProgress,
    [0, 1],
    [parallaxSign * 64 * strength, parallaxSign * -72 * strength],
    { clamp: true },
  )

  return (
    <motion.div className={styles.constellationLayer} style={{ y: layerY }}>
      <ConstellationLines
        scrollYProgress={sequenceProgress}
        edges={edges}
        hoverId={hoverId}
      />
      {project.satellites.map((s) => {
        const reveal = satelliteRevealById.get(s.id)
        if (!reveal) return null
        return (
          <SatelliteStar
            key={s.id}
            satellite={s}
            scrollYProgress={sequenceProgress}
            reveal={reveal}
            hoverId={hoverId}
            onHover={onHover}
          />
        )
      })}
      <MainProjectStar
        project={project}
        scrollYProgress={sequenceProgress}
        reveal={mainReveal}
        hoverId={hoverId}
        onHover={onHover}
      />
    </motion.div>
  )
})

export type AndromedaConstellationProps = {
  readonly journeyScrollYProgress: MotionValue<number>
}

export const AndromedaConstellation = memo(function AndromedaConstellation({
  journeyScrollYProgress,
}: AndromedaConstellationProps) {
  const { scrollYProgress: mainScrollYProgress } = useHomeScroll()
  const [hoverId, setHoverId] = useState<string | null>(null)

  const schedule = useMemo(
    () => buildConstellationSchedule(featuredProjects),
    [],
  )

  const mainRevealBySlug = useMemo(() => {
    const m = new Map(schedule.mainStars.map((m) => [m.slug, m.reveal] as const))
    return m
  }, [schedule.mainStars])

  const satelliteRevealById = useMemo(() => {
    const m = new Map<string, readonly [number, number]>()
    for (const sr of schedule.satellites) {
      m.set(sr.id, sr.reveal)
    }
    return m
  }, [schedule.satellites])

  const edgesByProjectSlug = useMemo(() => {
    const m = new Map<string, ScheduledEdge[]>()
    for (const p of featuredProjects) {
      m.set(p.slug, [])
    }
    for (const e of schedule.edges) {
      const list = m.get(e.projectSlug)
      if (list) {
        list.push(e)
      }
    }
    return m
  }, [schedule.edges])

  const sequenceProgress = useTransform(
    journeyScrollYProgress,
    [SEQUENCE_FROM_JOURNEY_LO, SEQUENCE_FROM_JOURNEY_HI],
    [0, 1],
    { clamp: true },
  )

  const nebulaOpacity = useTransform(
    journeyScrollYProgress,
    [0, 0.1],
    [0, 1],
    { clamp: true },
  )

  const fieldParallaxY = useTransform(
    mainScrollYProgress,
    [0, 1],
    [34, -40],
    { clamp: true },
  )

  const onHover = useCallback((id: string | null) => {
    setHoverId(id)
  }, [])

  return (
    <div className={styles.stage}>
      <motion.div
        className={styles.nebula}
        style={{ opacity: nebulaOpacity }}
        aria-hidden
      />
      <motion.div className={styles.starField} style={{ y: fieldParallaxY }}>
        {featuredProjects.map((p, index) => {
          const mainReveal = mainRevealBySlug.get(p.slug)
          if (!mainReveal) return null
          const edges = edgesByProjectSlug.get(p.slug) ?? []
          const parallaxSign = index === 0 ? 1 : -1
          return (
            <ConstellationLayer
              key={p.slug}
              project={p}
              edges={edges}
              sequenceProgress={sequenceProgress}
              layerParallaxScrollYProgress={journeyScrollYProgress}
              parallaxSign={parallaxSign}
              mainReveal={mainReveal}
              satelliteRevealById={satelliteRevealById}
              hoverId={hoverId}
              onHover={onHover}
            />
          )
        })}
      </motion.div>
    </div>
  )
})
