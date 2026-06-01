import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  SiFigma,
  SiFirebase,
  SiGithub,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { andromedaAppContent } from '../../content/projects/andromedaApp'
import './andromeda-project.css'

const content = andromedaAppContent

const stackIconById: Record<string, IconType> = {
  rn: SiReact,
  gh: SiGithub,
  figma: SiFigma,
  firebase: SiFirebase,
  node: SiNodedotjs,
  ts: SiTypescript,
}

export function AndromedaProjectView() {
  const [activeArtifact, setActiveArtifact] = useState(0)
  const artifact = content.artifacts.items[activeArtifact]

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

        <div className="andromeda__showcase">
          <div className="andromeda__orbit" aria-hidden>
            {content.stack.map((item, index) => (
              <article
                key={item.id}
                className="andromeda__stackChip"
                style={{ '--orbit-index': index } as CSSProperties}
              >
                <span className="andromeda__stackIcon" aria-hidden>
                  {(() => {
                    const Icon = stackIconById[item.id]
                    return Icon ? <Icon /> : null
                  })()}
                </span>
                <span className="andromeda__stackLabel">{item.label}</span>
                <span className="andromeda__stackRole">{item.role}</span>
              </article>
            ))}
          </div>

          <figure className="andromeda__device">
            <img
              className="andromeda__deviceImg"
              src={content.heroDeviceMockup}
              alt="Mockup do Andrômeda App em perspectiva, com a tela de boas-vindas"
              width={720}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>

          <ul className="andromeda__stackMobile" aria-label="Tecnologias do projeto">
            {content.stack.map((item) => (
              <li
                key={item.id}
                className="andromeda__stackChip andromeda__stackChip--mobile"
              >
                <span className="andromeda__stackIcon" aria-hidden>
                  {(() => {
                    const Icon = stackIconById[item.id]
                    return Icon ? <Icon /> : null
                  })()}
                </span>
                <span className="andromeda__stackLabel">{item.label}</span>
                <span className="andromeda__stackRole">{item.role}</span>
              </li>
            ))}
          </ul>
        </div>

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
            {content.artifacts.items.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="andromeda__thumb"
                  data-active={index === activeArtifact ? 'true' : undefined}
                  aria-label={item.label}
                  aria-current={index === activeArtifact ? 'true' : undefined}
                  onClick={() => setActiveArtifact(index)}
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
            disabled={activeArtifact >= content.artifacts.items.length - 1}
            onClick={() =>
              setActiveArtifact((i) =>
                Math.min(content.artifacts.items.length - 1, i + 1),
              )
            }
          >
            ›
          </button>
        </div>

        {artifact ? (
          <p className="andromeda__artifactCaption">{artifact.label}</p>
        ) : null}
      </section>
    </div>
  )
}
