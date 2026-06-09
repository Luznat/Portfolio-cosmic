import { Link, useParams } from 'react-router-dom'
import { SiteHeader } from '../../features/navigation'
import { andromedaAppSlug } from '../../content/projects/andromedaApp'
import { getFeaturedProjectBySlug } from '../../content/featuredProjects'
import projectBackdrop from '../../shared/assets/images/projetos/back-groud/Picsart_26-06-03_15-22-45-787.png'
import projectHoleOverlay from '../../shared/assets/images/projetos/back-groud/buraco.png'
import { AndromedaProjectView } from './AndromedaProjectView'
import './project-page.css'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getFeaturedProjectBySlug(slug) : undefined
  const isAndromeda = slug === andromedaAppSlug

  return (
    <>
      <SiteHeader variant="project" />
      <main
        className={
          isAndromeda ? 'projectPage projectPage--andromeda' : 'projectPage'
        }
      >
        <div className="projectPage__backdrop" aria-hidden>
          <div className="projectPage__backdropSpin">
            <img
              className="projectPage__backdropImg"
              src={projectBackdrop}
              alt=""
              decoding="async"
              fetchPriority="low"
            />
          </div>
        </div>
        <div className="projectPage__inner">
          {isAndromeda ? (
            <AndromedaProjectView />
          ) : !project ? (
            <>
              <p className="projectPage__muted">Projeto não encontrado.</p>
              <Link className="projectPage__back" to="/#projetos">
                ← Voltar
              </Link>
            </>
          ) : (
            <>
              <p className="projectPage__crumb">
                <Link to="/#projetos">Andrômeda</Link>
                <span aria-hidden> / </span>
                <span>{project.name}</span>
              </p>
              <h1 className="projectPage__title">{project.name}</h1>
              <p className="projectPage__tagline">{project.tagline}</p>
              <div className="projectPage__body">
                <p className="projectPage__lead">
                  Detalhes do caso — substitui por conteúdo real (stack, media,
                  links) quando estiver pronto.
                </p>
              </div>
              <Link className="projectPage__back" to="/#projetos">
                ← Voltar ao mapa
              </Link>
            </>
          )}
        </div>
        {isAndromeda ? (
          <>
            <img
              className="projectPage__holeOverlay"
              src={projectHoleOverlay}
              alt=""
              width={640}
              height={552}
              decoding="async"
              aria-hidden
            />
          </>
        ) : null}
      </main>
    </>
  )
}
