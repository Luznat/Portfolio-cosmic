import { motion } from 'framer-motion'
import { aboutAvatar } from '../../../content/about'
import aboutPhoto from '../../../shared/assets/images/foto-sobre-mim.png'
import styles from './AboutAvatar.module.css'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

export function AboutAvatar() {
  return (
    <motion.figure
      className={styles.figure}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...revealTransition, delay: 0.04 }}
    >
      <motion.div
        className={styles.portrait}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          className={styles.photo}
          src={aboutPhoto}
          alt={aboutAvatar.alt}
          width={512}
          height={512}
          decoding="async"
          loading="lazy"
        />
      </motion.div>
    </motion.figure>
  )
}
