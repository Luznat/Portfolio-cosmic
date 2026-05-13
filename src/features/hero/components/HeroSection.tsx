import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { HeroBackgroundVideo } from './HeroBackgroundVideo'
import { HeroContent } from './HeroContent'
import { useHomeScroll } from '../../../hooks/useHomeScroll'
import styles from '../styles/HeroSection.module.css'

export function HeroSection() {
  const { scrollYProgress, scrollToJourney } = useHomeScroll()
  const reduce = useReducedMotion()

  const scale = useTransform(scrollYProgress, (s) => {
    const t = Math.min(1, s / 0.52)
    return 1.1 - (reduce ? 0.06 : 0.09) * t
  })

  const opacity = useTransform(scrollYProgress, (s) => {
    const t = Math.min(1, s / 0.55)
    return 1 - (reduce ? 0.12 : 0.18) * t
  })

  const blurPx = useTransform(scrollYProgress, (s) => {
    return (reduce ? 0.4 : 0.9) * Math.min(1, s / 0.48)
  })
  const filter = useMotionTemplate`blur(${blurPx}px)`

  const overlayOpacity = useTransform(scrollYProgress, (s) => {
    const t = Math.min(1, s / 0.5)
    return 1 - (reduce ? 0.08 : 0.14) * t
  })

  const innerBlurPx = useTransform(scrollYProgress, (s) => {
    return (reduce ? 0.22 : 0.48) * Math.min(1, s / 0.48)
  })
  const innerFilter = useMotionTemplate`blur(${innerBlurPx}px)`

  const innerY = useTransform(scrollYProgress, (s) => {
    const t = Math.min(1, s / 0.48)
    return t * (reduce ? 5 : 12)
  })

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
          onClick={scrollToJourney}
          aria-label="Ir para a secção de projetos abaixo"
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
