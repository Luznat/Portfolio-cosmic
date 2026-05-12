import { HeroBackgroundVideo } from './HeroBackgroundVideo'
import { HeroContent } from './HeroContent'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <section id="inicio" className={styles.section}>
      <HeroBackgroundVideo />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.inner}>
        <HeroContent />
      </div>
    </section>
  )
}
