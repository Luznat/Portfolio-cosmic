import { Link, useParams } from 'react-router-dom'
import { SiteHeader } from '../../features/navigation'
import { getFeaturedProjectBySlug } from '../../content/featuredProjects'
import './project-page.css'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getFeaturedProjectBySlug(slug) : undefined

  return (
    <>
      <SiteHeader />
      <main className="projectPage">
        <div className="projectPage__inner">
          {!project ? (
            <>
              <p className="projectPage__muted">Projeto não encontrado.</p>
              <Link className="projectPage__back" to="/#projetos">
                ← Voltar
              </Link>
            </>
          ) : (
            <>
              <p className="projectPage__crumb">
                <Link to="/#projetos">Jornada</Link>
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
                ← Voltar à jornada
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}
