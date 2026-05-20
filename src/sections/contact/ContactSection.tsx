import { useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import { ContactSignalField } from '../../components/contact/ContactSignalField/ContactSignalField'
import contactSunBackdrop from '../../shared/assets/images/sol-contato.png'
import styles from './ContactSection.module.css'

const SOLAR_PARTICLE_COUNT = 16

export const ContactSection = memo(function ContactSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div
        className={styles.backdropStage}
        data-reduce-motion={reduceMotion ? 'true' : undefined}
        aria-hidden
      >
        <div className={styles.starfield} />
        <div className={styles.nebula} />
        <div
          className={styles.sectionBackdrop}
          style={{ backgroundImage: `url(${contactSunBackdrop})` }}
        />
        <div className={styles.sunCorona} />
        <div className={styles.sunGlow} />
        <div className={styles.sunRim} />
        <div className={styles.solarParticles}>
          {Array.from({ length: SOLAR_PARTICLE_COUNT }, (_, index) => (
            <span
              key={index}
              className={styles.solarParticle}
              style={{ ['--particle-i' as string]: String(index) }}
            />
          ))}
        </div>
      </div>
      <ContactSignalField reduceMotion={reduceMotion} />
    </section>
  )
})
