import type { FeaturedProject } from '../../../../content/featuredProjects'

export type ConstellationBounds = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

/** Hit region in % viewBox — keeps layers from blocking each other's pointer events. */
export function getConstellationBounds(
  project: FeaturedProject,
  padding = 8,
): ConstellationBounds {
  const xs = [project.cx, ...project.satellites.map((s) => s.cx)]
  const ys = [project.cy, ...project.satellites.map((s) => s.cy)]
  const minX = Math.max(0, Math.min(...xs) - padding)
  const maxX = Math.min(100, Math.max(...xs) + padding)
  const minY = Math.max(0, Math.min(...ys) - padding)
  const maxY = Math.min(100, Math.max(...ys) + padding)

  return {
    left: minX,
    top: minY,
    width: Math.max(12, maxX - minX),
    height: Math.max(12, maxY - minY),
  }
}
