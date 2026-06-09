import { useState } from 'react'
import { Link } from 'react-router-dom'
import { andromedaAppContent } from '../../content/projects/andromedaApp'
import { ArtifactScreenshotModal } from './ArtifactScreenshotModal'
import './andromeda-project.css'

const content = andromedaAppContent
const artifacts = content.artifacts.items

export function AndromedaProjectView() {
  const [activeArtifact, setActiveArtifact] = useState(0)
  const [modalArtifactIndex, setModalArtifactIndex] = useState<number | null>(
    null,
  )
  const artifact = artifacts[activeArtifact]
  const modalArtifact =
    modalArtifactIndex !== null ? artifacts[modalArtifactIndex] : null

  const openArtifactModal = (index: number) => {
    setActiveArtifact(index)
    setModalArtifactIndex(index)
  }

  const closeArtifactModal = () => {
    setModalArtifactIndex(null)
  }

  const showPrevArtifact = () => {
    setModalArtifactIndex((current) => {
      if (current === null || current <= 0) return current
      const next = current - 1
      setActiveArtifact(next)
      return next
    })
  }

  const showNextArtifact = () => {
    setModalArtifactIndex((current) => {
      if (current === null || current >= artifacts.length - 1) return current
      const next = current + 1
      setActiveArtifact(next)
      return next
    })
  }

  return (
    <div className="andromeda">
      <Link className="andromeda__back" to="/#projetos">
        ← Voltar ao mapa
      </Link>

      <div className="andromeda__hero">
        <header className="andromeda__overview">
          <p className="andromeda__kicker">{content.kicker}</p>
          <h1 className="andromeda__title">{content.headline}</h1>
          <p className="andromeda__tagline">{content.tagline}</p>

          <dl className="andromeda__meta">
            {content.meta.map((item) => (
              <div key={item.label} className="andromeda__metaRow">
                <dt>{item.label}</dt>
                <dd
                  data-tone={'tone' in item ? item.tone : undefined}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="andromeda__description">{content.description}</p>

          <div className="andromeda__actions">
            <a
              className="andromeda__btn andromeda__btn--primary"
              href={content.links.project}
              target="_blank"
              rel="noreferrer"
            >
              Ver projeto ↗
            </a>
            <a
              className="andromeda__btn andromeda__btn--ghost"
              href={content.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>

        <figure
          className="andromeda__vortex andromeda__vortex--anchor"
          aria-label="Capturas de tela do Andrômeda App"
        >
          {content.heroScreens.map((screen, index) => (
            <div
              key={screen.id}
              className="andromeda__vortexShotWrap"
              data-vortex-index={index}
            >
              <img
                className="andromeda__vortexShot"
                src={screen.src}
                srcSet={`${screen.src} 1080w`}
                sizes="(min-width: 64rem) 11rem, (min-width: 40rem) 9rem, 7rem"
                alt={screen.alt}
                width={1080}
                height={2210}
                loading={index === 1 ? 'eager' : 'lazy'}
                decoding={index === 1 ? 'sync' : 'async'}
                fetchPriority={index === 1 ? 'high' : 'auto'}
              />
            </div>
          ))}
        </figure>

        <aside className="andromeda__insights" aria-label="Detalhes do projeto">
          {content.insights.map((block) => (
            <section key={block.id} className="andromeda__insight">
              <h2>
                <span className="andromeda__insightIcon" aria-hidden>
                  {block.icon}
                </span>
                {block.title}
              </h2>
              {Array.isArray(block.body) ? (
                <ul>
                  {block.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{block.body}</p>
              )}
            </section>
          ))}
        </aside>
      </div>

      <section
        className="andromeda__artifacts"
        aria-labelledby="andromeda-artifacts-heading"
      >
        <div className="andromeda__artifactsHead">
          <p className="andromeda__artifactsProgress">
            {content.artifacts.progressLabel}
          </p>
          <h2 id="andromeda-artifacts-heading">
            <span aria-hidden>✦ </span>
            {content.artifacts.sectionTitle}
          </h2>
        </div>

        <div className="andromeda__carousel">
          <button
            type="button"
            className="andromeda__carouselNav"
            aria-label="Artefato anterior"
            disabled={activeArtifact <= 0}
            onClick={() => setActiveArtifact((i) => Math.max(0, i - 1))}
          >
            ‹
          </button>

          <ul className="andromeda__thumbs" role="list">
            {artifacts.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="andromeda__thumb"
                  data-active={index === activeArtifact ? 'true' : undefined}
                  aria-label={`${item.label} — ampliar captura`}
                  aria-current={index === activeArtifact ? 'true' : undefined}
                  onClick={() => openArtifactModal(index)}
                >
                  <img src={item.src} alt="" width={120} height={260} />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="andromeda__carouselNav"
            aria-label="Próximo artefato"
            disabled={activeArtifact >= artifacts.length - 1}
            onClick={() =>
              setActiveArtifact((i) => Math.min(artifacts.length - 1, i + 1))
            }
          >
            ›
          </button>
        </div>

        {artifact ? (
          <p className="andromeda__artifactCaption">{artifact.label}</p>
        ) : null}
      </section>

      {modalArtifact && modalArtifactIndex !== null ? (
        <ArtifactScreenshotModal
          artifact={modalArtifact}
          index={modalArtifactIndex}
          total={artifacts.length}
          onClose={closeArtifactModal}
          onPrev={showPrevArtifact}
          onNext={showNextArtifact}
        />
      ) : null}
    </div>
  )
}
