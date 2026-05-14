import { motion } from 'framer-motion'
import { memo } from 'react'
import { AndromedaConstellation } from '../../components/projects/andromeda/AndromedaConstellation'
import { StarDustField } from '../../components/projects/StarDustField'
import { useHomeScroll } from '../../hooks/useHomeScroll'
import styles from './ProjectsJourneySection.module.css'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

export const ProjectsJourneySection = memo(function ProjectsJourneySection() {
  const { scrollYProgress } = useHomeScroll()

  return (
    <section
      id="projetos"
      className={styles.section}
      aria-labelledby="journey-heading"
    >
      <div className={styles.stars} aria-hidden>
        <StarDustField scrollYProgress={scrollYProgress} density="sparse" />
      </div>
      <div className={styles.stage}>
        <h2 id="journey-heading" className={styles.kicker}>
          Andrômeda
        </h2>
        <p id="andromeda-map-desc" className={styles.subkicker}>
          Duas constelações — cada estrela grande é um projeto; as linhas seguem
          só o caminho entre estrelas vizinhas.
        </p>
        <div className={styles.constellationWrap}>
          <motion.div
            className={styles.constellationMount}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition}
            aria-describedby="andromeda-map-desc"
          >
            <AndromedaConstellation />
          </motion.div>
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
