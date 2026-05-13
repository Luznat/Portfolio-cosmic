import { memo, useMemo } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { isCoarsePointer } from '../../utils/motionPreference'
import styles from './StarDustField.module.css'

export interface StarSpec {
  readonly x: string
  readonly y: string
  readonly r: number
  readonly o: number
  readonly depth: number
  readonly blur: number
}

const STAR_LAYOUT: readonly StarSpec[] = [
  { x: '8%', y: '12%', r: 0.45, o: 0.35, depth: 0.12, blur: 0.8 },
  { x: '18%', y: '22%', r: 0.35, o: 0.28, depth: 0.2, blur: 0 },
  { x: '88%', y: '18%', r: 0.4, o: 0.32, depth: 0.15, blur: 1 },
  { x: '92%', y: '38%', r: 0.3, o: 0.22, depth: 0.25, blur: 0 },
  { x: '14%', y: '48%', r: 0.5, o: 0.4, depth: 0.08, blur: 1.2 },
  { x: '6%', y: '62%', r: 0.28, o: 0.2, depth: 0.18, blur: 0 },
  { x: '78%', y: '58%', r: 0.38, o: 0.26, depth: 0.22, blur: 0.6 },
  { x: '52%', y: '8%', r: 0.32, o: 0.18, depth: 0.3, blur: 0 },
  { x: '44%', y: '28%', r: 0.26, o: 0.16, depth: 0.28, blur: 0.9 },
  { x: '62%', y: '72%', r: 0.42, o: 0.3, depth: 0.14, blur: 0 },
  { x: '30%', y: '78%', r: 0.34, o: 0.24, depth: 0.2, blur: 0.7 },
  { x: '84%', y: '82%', r: 0.36, o: 0.22, depth: 0.16, blur: 0 },
  { x: '48%', y: '88%', r: 0.3, o: 0.2, depth: 0.24, blur: 1 },
  { x: '22%', y: '34%', r: 0.22, o: 0.14, depth: 0.35, blur: 0 },
  { x: '70%', y: '28%', r: 0.24, o: 0.15, depth: 0.32, blur: 0.5 },
  { x: '38%', y: '52%', r: 0.2, o: 0.12, depth: 0.4, blur: 0 },
  { x: '56%', y: '44%', r: 0.28, o: 0.18, depth: 0.26, blur: 0.8 },
  { x: '12%', y: '88%', r: 0.26, o: 0.16, depth: 0.22, blur: 0 },
  { x: '94%', y: '62%', r: 0.32, o: 0.2, depth: 0.18, blur: 1 },
  { x: '26%', y: '8%', r: 0.2, o: 0.12, depth: 0.38, blur: 0 },
] as const

function StarDot({
  spec,
  scrollYProgress,
  wormholeProgress,
  streakBias,
}: {
  spec: StarSpec
  scrollYProgress: MotionValue<number>
  wormholeProgress: MotionValue<number>
  streakBias: number
}) {
  const y = useTransform(
    [scrollYProgress, wormholeProgress],
    ([s, w]) => {
      const drift = spec.depth * 14 * (s as number)
      const wh = (w as number) * (w as number)
      return drift + wh * (-95 - streakBias * 3.5)
    },
  )

  return (
    <motion.circle
      className={styles.star}
      cx={spec.x}
      cy={spec.y}
      r={spec.r}
      fill="var(--text-emphasis)"
      fillOpacity={spec.o}
      style={{
        y,
        filter: spec.blur > 0 ? `blur(${spec.blur}px)` : undefined,
      }}
    />
  )
}

export type StarDustFieldProps = {
  readonly scrollYProgress: MotionValue<number>
  readonly wormholeProgress: MotionValue<number>
}

export const StarDustField = memo(function StarDustField({
  scrollYProgress,
  wormholeProgress,
}: StarDustFieldProps) {
  const compact = useMemo(() => {
    if (typeof window === 'undefined') return false
    return (
      isCoarsePointer() || window.matchMedia('(max-width: 768px)').matches
    )
  }, [])

  const stars = useMemo(
    () => (compact ? STAR_LAYOUT.slice(0, 11) : [...STAR_LAYOUT]),
    [compact],
  )

  const groupStretch = useTransform(
    wormholeProgress,
    [0, 0.12, 1],
    [1, compact ? 4 : 8, compact ? 10 : 18],
  )
  const groupY = useTransform(wormholeProgress, [0, 1], [0, compact ? -28 : -48])

  return (
    <svg
      className={styles.field}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.g
        style={{
          scaleY: groupStretch,
          y: groupY,
          transformOrigin: '50px 50px',
        }}
      >
        {stars.map((spec, i) => (
          <StarDot
            key={i}
            spec={spec}
            scrollYProgress={scrollYProgress}
            wormholeProgress={wormholeProgress}
            streakBias={i}
          />
        ))}
      </motion.g>
    </svg>
  )
})
