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

function chainEdgeReveal(
  projectIndex: number,
  edgeIndex: number,
): readonly [number, number] {
  const base = 0.05 + projectIndex * 0.3 + edgeIndex * 0.07
  return [base, base + 0.17]
}

function satelliteAppearRevealFromChain(
  projectIndex: number,
  chainIndex: number,
): readonly [number, number] {
  const base = 0.02 + projectIndex * 0.3 + chainIndex * 0.05
  return [base, base + 0.13]
}

function mainStarRevealFromChain(
  projectIndex: number,
  mainIndexInChain: number,
): readonly [number, number] {
  const base = 0.07 + projectIndex * 0.3 + mainIndexInChain * 0.05
  return [base, base + 0.15]
}

function backboneReveal(projectIndex: number): readonly [number, number] {
  const t0 = 0.48 + projectIndex * 0.08
  return [t0, t0 + 0.2]
}

export function buildConstellationSchedule(
  projects: readonly FeaturedProject[],
): {
  edges: readonly ScheduledEdge[]
  mainStars: readonly MainStarReveal[]
  satellites: readonly SatelliteReveal[]
} {
  const edges: ScheduledEdge[] = []
  const mainStars: MainStarReveal[] = []
  const satelliteRevealById = new Map<string, readonly [number, number]>()

  projects.forEach((p, projectIndex) => {
    const chain = p.constellationChain
    const mainIdx = chain.indexOf(p.slug)
    if (mainIdx >= 0) {
      mainStars.push({
        slug: p.slug,
        reveal: mainStarRevealFromChain(projectIndex, mainIdx),
      })
    }

    chain.forEach((nodeId, idx) => {
      if (nodeId === p.slug) return
      const sat = p.satellites.find((s) => s.id === nodeId)
      if (sat && !satelliteRevealById.has(sat.id)) {
        satelliteRevealById.set(
          sat.id,
          satelliteAppearRevealFromChain(projectIndex, idx),
        )
      }
    })

    for (let k = 0; k < chain.length - 1; k++) {
      const a = resolvePoint(projects, chain[k])
      const b = resolvePoint(projects, chain[k + 1])
      if (!a || !b) continue
      edges.push({
        key: `${chain[k]}__${chain[k + 1]}`,
        from: a,
        to: b,
        reveal: chainEdgeReveal(projectIndex, k),
      })
    }
  })

  for (let i = 0; i < projects.length - 1; i++) {
    const a = projects[i]
    const b = projects[i + 1]
    edges.push({
      key: `${a.slug}__${b.slug}`,
      from: { kind: 'project', slug: a.slug, cx: a.cx, cy: a.cy },
      to: { kind: 'project', slug: b.slug, cx: b.cx, cy: b.cy },
      reveal: backboneReveal(i),
    })
  }

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
