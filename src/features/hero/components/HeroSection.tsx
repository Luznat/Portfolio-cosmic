import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'
import { HeroBackgroundVideo } from './HeroBackgroundVideo'
import { HeroContent } from './HeroContent'
import { useHomeScroll } from '../../../hooks/useHomeScroll'
import styles from '../styles/HeroSection.module.css'

export function HeroSection() {
  const {
    scrollYProgress,
    wormholeProgress,
    constellationRevealed,
    beginWormhole,
  } = useHomeScroll()
  const reduce = useReducedMotion()

  const gateMv = useMotionValue(0)
  useEffect(() => {
    gateMv.set(constellationRevealed ? 1 : 0)
  }, [constellationRevealed, gateMv])

  const scale = useTransform(
    [scrollYProgress, wormholeProgress, gateMv],
    ([s, w, g]) => {
      if ((g as number) > 0.5) return 0.042
      const wh = (w as number) * (w as number)
      const t = Math.min(1, (s as number) / 0.52)
      const scrollBase = 1.1 - (reduce ? 0.06 : 0.09) * t
      return scrollBase * (1 - wh) + 0.022 * wh
    },
  )

  const opacity = useTransform(
    [scrollYProgress, wormholeProgress, gateMv],
    ([s, w, g]) => {
      if ((g as number) > 0.5) return 0.08
      const wh = (w as number) * (w as number)
      const t = Math.min(1, (s as number) / 0.55)
      const scrollBase = 1 - (reduce ? 0.12 : 0.18) * t
      return scrollBase * (1 - wh * 0.92) + 0.05 * wh
    },
  )

  const blurPx = useTransform(
    [scrollYProgress, wormholeProgress, gateMv],
    ([s, w, g]) => {
      if ((g as number) > 0.5) return reduce ? 2 : 5
      const wh = (w as number) * (w as number)
      const scrollBlur = (reduce ? 0.4 : 0.9) * Math.min(1, (s as number) / 0.48)
      return scrollBlur + wh * (reduce ? 2 : 9)
    },
  )
  const filter = useMotionTemplate`blur(${blurPx}px)`

  const overlayOpacity = useTransform(
    [scrollYProgress, wormholeProgress, gateMv],
    ([s, w, g]) => {
      if ((g as number) > 0.5) return 0.4
      const wh = (w as number) * (w as number)
      const t = Math.min(1, (s as number) / 0.5)
      const base = 1 - (reduce ? 0.08 : 0.14) * t
      return base * (1 - wh * 0.35) + 0.25 * wh
    },
  )

  const innerBlurPx = useTransform(
    [scrollYProgress, wormholeProgress, gateMv],
    ([s, w, g]) => {
      if ((g as number) > 0.5) return reduce ? 1.2 : 3.2
      const wh = (w as number) * (w as number)
      const scrollBlur = (reduce ? 0.22 : 0.48) * Math.min(1, (s as number) / 0.48)
      return scrollBlur + wh * (reduce ? 1.1 : 5.5)
    },
  )
  const innerFilter = useMotionTemplate`blur(${innerBlurPx}px)`

  const innerY = useTransform(
    [wormholeProgress, gateMv],
    ([w, g]) => {
      if ((g as number) > 0.5) return 0
      const wh = (w as number) * (w as number)
      return wh * (reduce ? 7 : 16)
    },
  )

  const foregroundStyle = {
    scale,
    opacity,
    filter: innerFilter,
    y: innerY,
  }

  return (
    <section id="inicio" className={styles.section} data-hero-section>
      <motion.div
        className={styles.videoParallax}
        style={{ scale, opacity, filter }}
      >
        <HeroBackgroundVideo />
      </motion.div>
      <motion.div
        className={styles.overlay}
        aria-hidden
        style={{ opacity: overlayOpacity }}
      />
      <div className={styles.innerLift}>
        <motion.div className={styles.inner} style={foregroundStyle}>
          <HeroContent />
        </motion.div>
      </div>
      <motion.div className={styles.scrollCueBand} style={foregroundStyle}>
        <button
          type="button"
          className={styles.scrollCue}
          onClick={beginWormhole}
          aria-label="Entrar na jornada espacial"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}
