import { memo, useCallback, useMemo, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useHomeScroll } from '../../../../hooks/useHomeScroll'
import {
  getFeaturedProjectForViewport,
  type FeaturedProject,
} from '../../../../content/featuredProjects'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { getConstellationBounds } from '../lib/constellationBounds'
import {
  buildConstellationSchedule,
  type ScheduledEdge,
} from '../lib/constellationSchedule'
import { ConstellationLines } from '../ConstellationLines/ConstellationLines'
import { MainProjectStar } from '../MainProjectStar/MainProjectStar'
import { SatelliteStar } from '../SatelliteStar/SatelliteStar'
import styles from './andromedaConstellation.module.css'

const SEQUENCE_FROM_JOURNEY_LO = 0
const SEQUENCE_FROM_JOURNEY_HI = 0.50

type ConstellationLayerProps = {
  readonly project: FeaturedProject
  readonly edges: readonly ScheduledEdge[]
  readonly sequenceProgress: MotionValue<number>
  readonly layerParallaxScrollYProgress: MotionValue<number>
  readonly layerZIndex: number
  readonly parallaxSign: number
  readonly mainReveal: readonly [number, number]
  readonly satelliteRevealById: ReadonlyMap<string, readonly [number, number]>
  readonly hoverConstellationSlug: string | null
  readonly onHoverConstellation: (slug: string | null) => void
  readonly disableParallax: boolean
}

const ConstellationLayer = memo(function ConstellationLayer({
  project,
  edges,
  sequenceProgress,
  layerParallaxScrollYProgress,
  layerZIndex,
  parallaxSign,
  mainReveal,
  satelliteRevealById,
  hoverConstellationSlug,
  onHoverConstellation,
  disableParallax,
}: ConstellationLayerProps) {
  const strength = disableParallax ? 0 : (project.constellationParallax ?? 0)
  const layerY = useTransform(
    layerParallaxScrollYProgress,
    [0, 1],
    [parallaxSign * 64 * strength, parallaxSign * -72 * strength],
    { clamp: true },
  )

  const constellationLit = hoverConstellationSlug === project.slug
  const constellationDimmed = Boolean(
    hoverConstellationSlug && hoverConstellationSlug !== project.slug,
  )

  const lightConstellation = useCallback(() => {
    onHoverConstellation(project.slug)
  }, [onHoverConstellation, project.slug])

  const clearConstellation = useCallback(() => {
    onHoverConstellation(null)
  }, [onHoverConstellation])

  const bounds = useMemo(() => getConstellationBounds(project), [project])

  return (
    <motion.div
      className={styles.constellationLayer}
      style={{ y: layerY, zIndex: layerZIndex }}
      data-lit={constellationLit ? '1' : undefined}
      data-dimmed={constellationDimmed ? '1' : undefined}
    >
      <div
        className={styles.constellationHitArea}
        style={{
          left: `${bounds.left}%`,
          top: `${bounds.top}%`,
          width: `${bounds.width}%`,
          height: `${bounds.height}%`,
        }}
        onMouseEnter={lightConstellation}
        onMouseLeave={clearConstellation}
        aria-hidden
      />
      <ConstellationLines
        scrollYProgress={sequenceProgress}
        edges={edges}
        projectSlug={project.slug}
        hoverConstellationSlug={hoverConstellationSlug}
      />
      {project.satellites.map((s) => {
        const reveal = satelliteRevealById.get(s.id)
        if (!reveal) return null
        return (
          <SatelliteStar
            key={s.id}
            satellite={s}
            projectSlug={project.slug}
            scrollYProgress={sequenceProgress}
            reveal={reveal}
            hoverConstellationSlug={hoverConstellationSlug}
            onHoverConstellation={lightConstellation}
          />
        )
      })}
      <MainProjectStar
        project={project}
        scrollYProgress={sequenceProgress}
        reveal={mainReveal}
        hoverConstellationSlug={hoverConstellationSlug}
        onHoverConstellation={lightConstellation}
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
  const reduceMotion = useReducedMotion()
  const isMobileLayout = useMediaQuery('(max-width: 768px)')
  const disableParallax = reduceMotion || isMobileLayout
  const projects = useMemo(
    () => getFeaturedProjectForViewport(isMobileLayout),
    [isMobileLayout],
  )
  const [hoverConstellationSlug, setHoverConstellationSlug] = useState<
    string | null
  >(null)

  const schedule = useMemo(
    () => buildConstellationSchedule(projects),
    [projects],
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
    for (const p of projects) {
      m.set(p.slug, [])
    }
    for (const e of schedule.edges) {
      const list = m.get(e.projectSlug)
      if (list) {
        list.push(e)
      }
    }
    return m
  }, [projects, schedule.edges])

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
    disableParallax ? [0, 0] : [34, -40],
    { clamp: true },
  )

  const onHoverConstellation = useCallback((slug: string | null) => {
    setHoverConstellationSlug(slug)
  }, [])

  return (
    <div className={styles.stage}>
      <motion.div
        className={styles.nebula}
        style={{ opacity: nebulaOpacity }}
        aria-hidden
      />
      <motion.div className={styles.starField} style={{ y: fieldParallaxY }}>
        {[...projects]
          .map((p, featuredIndex) => ({ p, featuredIndex }))
          .sort((a, b) => b.p.cx - a.p.cx)
          .map(({ p, featuredIndex }) => {
            const mainReveal = mainRevealBySlug.get(p.slug)
            if (!mainReveal) return null
            const edges = edgesByProjectSlug.get(p.slug) ?? []
            const parallaxSign = featuredIndex === 0 ? 1 : -1
            const layerZIndex = projects.length - featuredIndex
            return (
              <ConstellationLayer
                key={p.slug}
                project={p}
                edges={edges}
                sequenceProgress={sequenceProgress}
                layerParallaxScrollYProgress={journeyScrollYProgress}
                layerZIndex={layerZIndex}
                parallaxSign={parallaxSign}
                mainReveal={mainReveal}
                satelliteRevealById={satelliteRevealById}
                hoverConstellationSlug={hoverConstellationSlug}
                onHoverConstellation={onHoverConstellation}
                disableParallax={disableParallax}
              />
            )
          })}
      </motion.div>
    </div>
  )
})
