import { memo } from 'react'
import styles from './ContactSection.module.css'

export const ContactSection = memo(function ContactSection() {
  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={styles.inner}>
        <h2 id="contact-heading" className={styles.title}>
          Contato
        </h2>
        <p className={styles.text}>
          Espaço reservado para email, redes ou formulário — mantém a leitura
          limpa até lá.
        </p>
      </div>
    </section>
  )
})
