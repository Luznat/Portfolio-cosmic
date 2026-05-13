import { motion } from 'framer-motion'
import { memo } from 'react'
import { ConstellationProjects } from '../../components/projects/ConstellationProjects'
import { StarDustField } from '../../components/projects/StarDustField'
import { useHomeScroll } from '../../hooks/useHomeScroll'
import styles from './ProjectsJourneySection.module.css'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

export const ProjectsJourneySection = memo(function ProjectsJourneySection() {
  const { scrollYProgress, wormholeProgress, constellationRevealed } =
    useHomeScroll()

  return (
    <section
      id="projetos"
      className={styles.section}
      aria-labelledby="journey-heading"
    >
      <div className={styles.stars} aria-hidden>
        <StarDustField
          scrollYProgress={scrollYProgress}
          wormholeProgress={wormholeProgress}
        />
      </div>
      <div className={styles.stage}>
        <h2 id="journey-heading" className={styles.kicker}>
          Jornada
        </h2>
        <div className={styles.constellationWrap}>
          {constellationRevealed ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              <ConstellationProjects />
            </motion.div>
          ) : (
            <div className={styles.constellationPlaceholder} aria-hidden />
          )}
        </div>
      </div>
      <footer id="contato" className={styles.footer}>
        <h2 className={styles.footerTitle}>Contato</h2>
        <p className={styles.footerText}>
          Espaço reservado para email, redes ou formulário — mantém a leitura
          limpa até lá.
        </p>
      </footer>
    </section>
  )
})
