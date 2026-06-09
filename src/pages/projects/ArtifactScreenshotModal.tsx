import { useEffect, useId } from 'react'
import type { AndromedaAppContent } from '../../content/projects/andromedaApp'
import './andromeda-project.css'

type ArtifactItem = AndromedaAppContent['artifacts']['items'][number]

type ArtifactScreenshotModalProps = {
  artifact: ArtifactItem
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function ArtifactScreenshotModal({
  artifact,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: ArtifactScreenshotModalProps) {
  const titleId = useId()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onNext, onPrev])

  return (
    <div
      className="andromedaArtifactModal"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="andromedaArtifactModal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="andromedaArtifactModal__close"
          aria-label="Fechar visualização"
          onClick={onClose}
        >
          ×
        </button>

        <figure className="andromedaArtifactModal__figure">
          <img
            className="andromedaArtifactModal__img"
            src={artifact.src}
            alt={artifact.alt}
            width={1080}
            height={2210}
            decoding="async"
          />
          <figcaption id={titleId} className="andromedaArtifactModal__caption">
            {artifact.label}
          </figcaption>
        </figure>

        <div className="andromedaArtifactModal__nav">
          <button
            type="button"
            className="andromedaArtifactModal__navBtn"
            aria-label="Artefato anterior"
            disabled={index <= 0}
            onClick={onPrev}
          >
            ‹
          </button>
          <p className="andromedaArtifactModal__counter" aria-live="polite">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            className="andromedaArtifactModal__navBtn"
            aria-label="Próximo artefato"
            disabled={index >= total - 1}
            onClick={onNext}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
