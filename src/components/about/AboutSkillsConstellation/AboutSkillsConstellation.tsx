import { motion, useReducedMotion } from 'framer-motion'
import { memo, useCallback, useMemo, useState } from 'react'
import {
  aboutSkillEdges,
  aboutSkillStars,
  aboutSkillStarsCompact,
  aboutSkillStarsMobile,
  type AboutSkillStar,
} from '../../../content/about'
import { STAR_SKILL_URL } from '../../projects/andromeda/lib/starAssetUrls'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import styles from './AboutSkillsConstellation.module.css'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

function edgeTouchesHover(
  edge: { readonly from: string; readonly to: string },
  hoveredId: string | null,
): boolean {
  if (!hoveredId) return false
  return edge.from === hoveredId || edge.to === hoveredId
}

export const AboutSkillsConstellation = memo(function AboutSkillsConstellation() {
  const reduceMotion = useReducedMotion()
  const isNarrow = useMediaQuery('(max-width: 520px)')
  const isCompact = useMediaQuery('(max-width: 1024px)')
  const layout = isNarrow ? 'narrow' : isCompact ? 'compact' : 'wide'
  const stars = isNarrow
    ? aboutSkillStarsMobile
    : isCompact
      ? aboutSkillStarsCompact
      : aboutSkillStars
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const starById = useMemo(
    () => new Map(stars.map((star) => [star.id, star] as const)),
    [stars],
  )

  const handleEnter = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  return (
    <motion.div
      className={styles.constellation}
      data-layout={layout}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...revealTransition, delay: 0.18 }}
      aria-label="Constelação de competências"
    >
      <svg
        className={styles.lineSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {aboutSkillEdges.map((edge) => {
          const from = starById.get(edge.from)
          const to = starById.get(edge.to)
          if (!from || !to) return null
          const lit = edgeTouchesHover(edge, hoveredId)
          const dimmed = Boolean(hoveredId && !lit)
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              className={styles.line}
              data-lit={lit ? '1' : undefined}
              data-dimmed={dimmed ? '1' : undefined}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
      <ul className={styles.stars}>
        {stars.map((star, index) => (
          <SkillStarNode
            key={star.id}
            star={star}
            index={index}
            hoveredId={hoveredId}
            reduceMotion={reduceMotion ?? false}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        ))}
      </ul>
    </motion.div>
  )
})

type SkillStarNodeProps = {
  readonly star: AboutSkillStar
  readonly index: number
  readonly hoveredId: string | null
  readonly reduceMotion: boolean
  readonly onEnter: (id: string) => void
  readonly onLeave: () => void
}

function SkillStarNode({
  star,
  index,
  hoveredId,
  reduceMotion,
  onEnter,
  onLeave,
}: SkillStarNodeProps) {
  const lit = hoveredId === star.id
  const dimmed = Boolean(hoveredId && hoveredId !== star.id)

  return (
    <li
      className={styles.starItem}
      style={{
        left: `${star.cx}%`,
        top: `${star.cy}%`,
        ['--twinkle-delay' as string]: `${index * 0.9}s`,
        ['--twinkle-duration' as string]: `${3.4 + (index % 3) * 0.55}s`,
      }}
    >
      <motion.button
        type="button"
        className={styles.star}
        data-lit={lit ? '1' : undefined}
        data-dimmed={dimmed ? '1' : undefined}
        onMouseEnter={() => onEnter(star.id)}
        onMouseLeave={onLeave}
        onFocus={() => onEnter(star.id)}
        onBlur={onLeave}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, scale: 1 }
        }
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          ...revealTransition,
          delay: 0.22 + index * 0.07,
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <span className={styles.starVisual} aria-hidden>
          <span className={styles.starGlow} />
          <img className={styles.starImg} src={STAR_SKILL_URL} alt="" />
        </span>
        <span className={styles.label}>{star.label}</span>
      </motion.button>
    </li>
  )
}
