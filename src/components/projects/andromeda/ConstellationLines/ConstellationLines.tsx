import { memo } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ScheduledEdge } from '../lib/constellationSchedule'
import { constellationLineOpacity } from '../lib/scrollReveal'
import styles from './constellationLines.module.css'

const ConstellationLine = memo(function ConstellationLine({
  edge,
  scrollYProgress,
  constellationLit,
  constellationDimmed,
}: {
  edge: ScheduledEdge
  scrollYProgress: MotionValue<number>
  constellationLit: boolean
  constellationDimmed: boolean
}) {
  const displayOpacity = useTransform(scrollYProgress, (progress) =>
    constellationLineOpacity(
      progress,
      edge.reveal,
      constellationLit,
      constellationDimmed,
    ),
  )

  const lineClass =
    `${styles.constLine}` +
    (constellationLit ? ` ${styles.constLineConstellationLit}` : '')

  return (
    <motion.line
      x1={edge.from.cx}
      y1={edge.from.cy}
      x2={edge.to.cx}
      y2={edge.to.cy}
      className={lineClass}
      data-muted={constellationDimmed ? '1' : undefined}
      data-lit={constellationLit ? '1' : undefined}
      vectorEffect="non-scaling-stroke"
      style={{ opacity: displayOpacity }}
    />
  )
})

export type ConstellationLinesProps = {
  readonly scrollYProgress: MotionValue<number>
  readonly edges: readonly ScheduledEdge[]
  readonly projectSlug: string
  readonly hoverConstellationSlug: string | null
}

export const ConstellationLines = memo(function ConstellationLines({
  scrollYProgress,
  edges,
  projectSlug,
  hoverConstellationSlug,
}: ConstellationLinesProps) {
  const constellationLit = hoverConstellationSlug === projectSlug
  const constellationDimmed = Boolean(
    hoverConstellationSlug && hoverConstellationSlug !== projectSlug,
  )

  return (
    <svg
      className={styles.lineSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {edges.map((edge) => (
        <ConstellationLine
          key={edge.key}
          edge={edge}
          scrollYProgress={scrollYProgress}
          constellationLit={constellationLit}
          constellationDimmed={constellationDimmed}
        />
      ))}
    </svg>
  )
})
