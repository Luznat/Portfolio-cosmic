import { motion } from 'framer-motion'
import { AboutAvatar } from '../../components/about/AboutAvatar/AboutAvatar'
import { AboutSkillsConstellation } from '../../components/about/AboutSkillsConstellation/AboutSkillsConstellation'
import { aboutIntro } from '../../content/about'
import aboutGalaxyBackdrop from '../../shared/assets/images/Galaxia_background_for_portfolio_202605181755.jpeg'
import styles from './AboutSection.module.css'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

export type AboutSectionProps = {
  readonly embedded?: boolean
}

function AboutSection({
  embedded = false,
}: AboutSectionProps) {
  return (
    <section
      id="sobre"
      className={embedded ? styles.embedded : styles.section}
      aria-labelledby="about-heading"
    >
      {embedded ? (
        <motion.div
          className={styles.sectionBackdrop}
          style={{ backgroundImage: `url(${aboutGalaxyBackdrop})` }}
          aria-hidden
        />
      ) : (
        <div className={styles.glow} aria-hidden />
      )}
      <motion.div className={styles.layout}>
        <AboutAvatar />
        <div className={styles.content}>
        <motion.p
          className={styles.kicker}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={revealTransition}
        >
          {aboutIntro.kicker}
        </motion.p>
        <motion.h2
          id="about-heading"
          className={styles.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ ...revealTransition, delay: 0.06 }}
        >
          {aboutIntro.title}
        </motion.h2>
        <motion.p
          className={styles.lead}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ ...revealTransition, delay: 0.1 }}
        >
          {aboutIntro.lead}
        </motion.p>
        <div className={styles.body}>
          {aboutIntro.paragraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className={styles.paragraph}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                ...revealTransition,
                delay: 0.14 + index * 0.06,
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        </div>
      </motion.div>
      <AboutSkillsConstellation />
    </section>
  )
}

export function ProjectsAboutSection() {
  return <AboutSection embedded />
}
