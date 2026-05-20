import { useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import { contactIntro, contactLinks } from '../../content/contact'
import contactSunBackdrop from '../../shared/assets/images/sol-contato.png'
import styles from './ContactSection.module.css'

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
        <div
          className={styles.sectionBackdrop}
          style={{ backgroundImage: `url(${contactSunBackdrop})` }}
        />
        <div className={styles.sunCorona} />
        <div className={styles.sunGlow} />
        <div className={styles.sunRim} />
      </div>
      <div className={styles.inner}>
        <p className={styles.kicker}>{contactIntro.kicker}</p>
        <h2 id="contact-heading" className={styles.title}>
          {contactIntro.title}
        </h2>
        <p className={styles.lead}>{contactIntro.lead}</p>
        <nav className={styles.links} aria-label="Canais de contato">
          <ul className={styles.linkList}>
            {contactLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkDetail}>{link.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
})
