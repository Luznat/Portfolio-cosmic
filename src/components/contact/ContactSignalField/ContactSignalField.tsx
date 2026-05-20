import { motion } from 'framer-motion'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import {
  contactConstellationEdges,
  contactIntro,
  contactLayoutById,
  contactLinks,
  contactSignalAnchors,
  contactSignalById,
  type ContactLink,
  type ContactSignalLayout,
} from '../../../content/contact'
import { usePointerParallax } from '../../../hooks/usePointerParallax'
import styles from './ContactSignalField.module.css'

const PARALLAX_STRENGTH_X = 18
const PARALLAX_STRENGTH_Y = 14

const introReveal = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1] as const,
}

type ContactSignalFieldProps = {
  readonly reduceMotion: boolean | null
}

export const ContactSignalField = memo(function ContactSignalField({
  reduceMotion,
}: ContactSignalFieldProps) {
  const fieldRef = useRef<HTMLDivElement | null>(null)
  const motionEnabled = !reduceMotion
  const pointer = usePointerParallax(fieldRef, motionEnabled)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const anchorById = useMemo(
    () => new Map(contactSignalAnchors.map((anchor) => [anchor.id, anchor] as const)),
    [],
  )

  const activeEdges = useMemo(() => {
    if (!hoveredId) return []
    return contactConstellationEdges.filter(
      (edge) => edge.from === hoveredId || edge.to === hoveredId,
    )
  }, [hoveredId])

  const resolvePoint = useCallback(
    (id: string) => {
      const layout = contactLayoutById.get(id)
      if (layout) return { cx: layout.cx, cy: layout.cy }
      return anchorById.get(id) ?? null
    },
    [anchorById],
  )

  const handleEnter = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  return (
    <div
      ref={fieldRef}
      className={styles.field}
      data-motion={motionEnabled ? 'on' : 'off'}
    >
      <motion.header
        className={styles.intro}
        initial={motionEnabled ? { opacity: 0, y: 14 } : false}
        whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ ...introReveal, delay: 0.05 }}
      >
        <p className={styles.kicker}>{contactIntro.kicker}</p>
        <h2 id="contact-heading" className={styles.title}>
          {contactIntro.title}
        </h2>
        <p className={styles.lead}>{contactIntro.lead}</p>
      </motion.header>

      <svg
        className={styles.constellationSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {activeEdges.map((edge) => {
          if (!hoveredId) return null
          const signalPoint = contactLayoutById.get(hoveredId)
          const otherId = edge.from === hoveredId ? edge.to : edge.from
          const otherPoint = resolvePoint(otherId)
          if (!signalPoint || !otherPoint) return null
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={signalPoint.cx}
              y1={signalPoint.cy}
              x2={otherPoint.cx}
              y2={otherPoint.cy}
              className={styles.constellationLine}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>

      <nav className={styles.signals} aria-label="Canais de contato">
        <ul className={styles.signalList}>
          {contactLinks.map((link) => {
            const layout = contactLayoutById.get(link.id)
            if (!layout) return null
            return (
              <ContactSignal
                key={link.id}
                link={link}
                layout={layout}
                pointer={pointer}
                motionEnabled={motionEnabled}
                isActive={hoveredId === link.id}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            )
          })}
        </ul>
      </nav>
    </div>
  )
})

type ContactSignalProps = {
  readonly link: ContactLink
  readonly layout: ContactSignalLayout
  readonly pointer: { readonly x: number; readonly y: number }
  readonly motionEnabled: boolean
  readonly isActive: boolean
  readonly onEnter: (id: string) => void
  readonly onLeave: () => void
}

function ContactSignal({
  link,
  layout,
  pointer,
  motionEnabled,
  isActive,
  onEnter,
  onLeave,
}: ContactSignalProps) {
  const displayLabel = contactSignalById.get(link.id)?.label.toUpperCase() ?? link.label

  const parallaxX = pointer.x * layout.depth * PARALLAX_STRENGTH_X
  const parallaxY = pointer.y * layout.depth * PARALLAX_STRENGTH_Y

  return (
    <li
      className={styles.signalItem}
      data-signal={link.id}
      style={{
        ['--signal-x' as string]: `${layout.cx}%`,
        ['--signal-y' as string]: `${layout.cy}%`,
        ['--float-duration' as string]: `${layout.floatDuration}s`,
        ['--float-delay' as string]: `${layout.floatDelay}s`,
        ['--orbit-x' as string]: `${layout.orbitX}px`,
        ['--orbit-y' as string]: `${layout.orbitY}px`,
        ['--signal-depth' as string]: String(layout.depth),
      }}
    >
      <motion.a
        className={styles.signal}
        href={link.href}
        data-active={isActive ? 'true' : undefined}
        style={
          motionEnabled
            ? { x: parallaxX, y: parallaxY }
            : undefined
        }
        {...(link.external
          ? { target: '_blank', rel: 'noreferrer' }
          : {})}
        onMouseEnter={() => onEnter(link.id)}
        onMouseLeave={onLeave}
        onFocus={() => onEnter(link.id)}
        onBlur={onLeave}
        initial={motionEnabled ? { opacity: 0 } : false}
        whileInView={motionEnabled ? { opacity: 1 } : undefined}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        <span className={styles.signalGlow} aria-hidden />
        <span className={styles.signalCore}>
          <span className={styles.signalLabel}>{displayLabel}</span>
          <span className={styles.signalDetail}>{link.detail}</span>
        </span>
        <span className={styles.particles} aria-hidden>
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
        </span>
      </motion.a>
    </li>
  )
}
