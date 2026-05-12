import { motion } from 'framer-motion'
import { GITHUB_PROFILE_HREF } from '../../data/site'
import styles from './HeroContent.module.css'

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.14 * i,
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function HeroContent() {
  return (
    <div className={styles.content}>
      <motion.h1
        className={styles.title}
        variants={reveal}
        custom={0}
        initial="hidden"
        animate="show"
      >
        Alinhando os cosmos para experiências mobile além das estrelas.
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        variants={reveal}
        custom={1}
        initial="hidden"
        animate="show"
      >
        Desenvolvendo experiências mobile imersivas com identidade cósmica.
      </motion.p>
      <div className={styles.actions}>
        <motion.a
          className={styles.btn}
          href="#projetos"
          variants={reveal}
          custom={2}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver Projetos
        </motion.a>
        <motion.a
          className={styles.btn}
          href={GITHUB_PROFILE_HREF}
          target="_blank"
          rel="noreferrer"
          variants={reveal}
          custom={3}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          GitHub
        </motion.a>
      </div>
    </div>
  )
}
