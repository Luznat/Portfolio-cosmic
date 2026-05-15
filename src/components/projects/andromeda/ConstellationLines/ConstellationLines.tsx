import { memo, useMemo } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ScheduledEdge } from '../lib/constellationSchedule'
import styles from './constellationLines.module.css'

function edgeTouchIds(edge: ScheduledEdge): readonly string[] {
  const a =
    edge.from.kind === 'project' ? edge.from.slug : edge.from.id
  const b = edge.to.kind === 'project' ? edge.to.slug : edge.to.id
  return [a, b]
}

const ConstellationLine = memo(function ConstellationLine({
  edge,
  scrollYProgress,
  hoverId,
}: {
  edge: ScheduledEdge
  scrollYProgress: MotionValue<number>
  hoverId: string | null
}) {
  const lineOpacity = useTransform(
    scrollYProgress,
    [
      edge.reveal[0],
      edge.reveal[1],
      Math.min(1, edge.reveal[1] + 0.06),
    ],
    [0, 1, 1],
    { clamp: true },
  )

  const touches = useMemo(
    () => (hoverId ? edgeTouchIds(edge).includes(hoverId) : false),
    [edge, hoverId],
  )
  const muted = Boolean(hoverId && !touches)
  const lineClass =
    `${styles.constLine}` +
    (touches && hoverId ? ` ${styles.constLineBright}` : '')

  return (
    <motion.line
      x1={edge.from.cx}
      y1={edge.from.cy}
      x2={edge.to.cx}
      y2={edge.to.cy}
      className={lineClass}
      data-muted={muted ? '1' : undefined}
      vectorEffect="non-scaling-stroke"
      style={{ opacity: lineOpacity }}
    />
  )
})

export type ConstellationLinesProps = {
  readonly scrollYProgress: MotionValue<number>
  readonly edges: readonly ScheduledEdge[]
  readonly hoverId: string | null
}

export const ConstellationLines = memo(function ConstellationLines({
  scrollYProgress,
  edges,
  hoverId,
}: ConstellationLinesProps) {
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
          hoverId={hoverId}
        />
      ))}
    </svg>
  )
})
