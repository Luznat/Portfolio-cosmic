import type { FeaturedProject, ProjectSatellite } from '../../../content/featuredProjects'

export type SchedulePoint =
  | { kind: 'project'; slug: string; cx: number; cy: number }
  | { kind: 'satellite'; id: string; cx: number; cy: number }

export interface ScheduledEdge {
  readonly key: string
  readonly from: SchedulePoint
  readonly to: SchedulePoint
  /** Normalized scroll segment through the constellation stage (0–1) */
  readonly reveal: readonly [number, number]
}

export interface MainStarReveal {
  readonly slug: string
  readonly reveal: readonly [number, number]
}

export interface SatelliteReveal {
  readonly id: string
  readonly reveal: readonly [number, number]
}

function resolvePoint(
  projects: readonly FeaturedProject[],
  nodeId: string,
): SchedulePoint | undefined {
  for (const p of projects) {
    if (nodeId === p.slug) {
      return { kind: 'project', slug: p.slug, cx: p.cx, cy: p.cy }
    }
    const sat = p.satellites.find((s: ProjectSatellite) => s.id === nodeId)
    if (sat) {
      return { kind: 'satellite', id: sat.id, cx: sat.cx, cy: sat.cy }
    }
  }
  return undefined
}

/**
 * Per project: first star of the chain appears, then each line segment, then the
 * next star, etc. Each project is its own constellation — no edges between projects.
 */
export function buildConstellationSchedule(
  projects: readonly FeaturedProject[],
): {
  edges: readonly ScheduledEdge[]
  mainStars: readonly MainStarReveal[]
  satellites: readonly SatelliteReveal[]
} {
  const edges: ScheduledEdge[] = []
  const satelliteRevealById = new Map<string, readonly [number, number]>()
  const mainRevealBySlug = new Map<string, readonly [number, number]>()

  const n = projects.length
  const startPad = 0
  const gapBetweenProjects = n > 1 ? 0.012 : 0
  const usable = 1 - startPad - gapBetweenProjects * Math.max(0, n - 1)
  const bandW = usable / Math.max(1, n)

  let bandCursor = startPad

  projects.forEach((p) => {
    const bandStart = bandCursor
    const bandEnd = bandStart + bandW
    const chain = p.constellationChain
    const steps = 2 * chain.length - 1
    const stepW = (bandEnd - bandStart) / steps

    for (let i = 0; i < steps; i++) {
      const t0 = bandStart + i * stepW
      const t1 = bandStart + (i + 1) * stepW - stepW * 0.04

      if (i % 2 === 0) {
        const nodeIdx = i / 2
        const nodeId = chain[nodeIdx]
        if (nodeId === p.slug) {
          mainRevealBySlug.set(p.slug, [t0, Math.max(t0 + 0.02, t1)])
        } else {
          const sat = p.satellites.find((s) => s.id === nodeId)
          if (sat) {
            satelliteRevealById.set(sat.id, [t0, Math.max(t0 + 0.02, t1)])
          }
        }
      } else {
        const k = (i - 1) / 2
        const a = resolvePoint(projects, chain[k])
        const b = resolvePoint(projects, chain[k + 1])
        if (a && b) {
          edges.push({
            key: `${chain[k]}__${chain[k + 1]}`,
            from: a,
            to: b,
            reveal: [t0, Math.max(t0 + 0.02, t1)],
          })
        }
      }
    }

    bandCursor = bandEnd + gapBetweenProjects
  })

  const mainStars: MainStarReveal[] = projects.map((p) => {
    const reveal = mainRevealBySlug.get(p.slug)
    if (!reveal) {
      return { slug: p.slug, reveal: [0, 0.1] as const }
    }
    return { slug: p.slug, reveal }
  })

  const satellites: SatelliteReveal[] = []
  for (const p of projects) {
    for (const s of p.satellites) {
      const reveal = satelliteRevealById.get(s.id)
      if (reveal) {
        satellites.push({ id: s.id, reveal })
      }
    }
  }

  return { edges, mainStars, satellites }
}
