import { memo } from 'react'
import contactSunBackdrop from '../../shared/assets/images/sol-contato.png'
import styles from './ContactSection.module.css'

export const ContactSection = memo(function ContactSection() {
  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div
        className={styles.sectionBackdrop}
        style={{ backgroundImage: `url(${contactSunBackdrop})` }}
        aria-hidden
      />
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
