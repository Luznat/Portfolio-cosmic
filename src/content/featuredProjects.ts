import heroCover from '../shared/assets/images/hero.png'

export type SatelliteVariant = 1 | 2 | 3

export interface ProjectSatellite {
  readonly id: string
  readonly cx: number
  readonly cy: number
  readonly variant: SatelliteVariant
}

export interface FeaturedProject {
  readonly slug: string
  readonly name: string
  readonly tagline: string
  /** Main star position (0–100) inside the constellation viewBox */
  readonly cx: number
  readonly cy: number
  /** Optional cover for the luminous core (non-traditional “card”) */
  readonly coverSrc?: string
  readonly satellites: readonly ProjectSatellite[]
  /**
   * Ordered path: satellite ids and this project’s slug.
   * Consecutive entries draw thin constellation segments (celestial map style).
   */
  readonly constellationChain: readonly string[]
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: 'orbit-mobile',
    name: 'Orbit',
    tagline: 'Experiência mobile imersiva',
    cx: 30,
    cy: 52,
    coverSrc: heroCover,
    constellationChain: [
      'orbit-s1',
      'orbit-mobile',
      'orbit-s2',
      'orbit-s3',
    ],
    satellites: [
      { id: 'orbit-s1', cx: 10, cy: 30, variant: 1 },
      { id: 'orbit-s2', cx: 20, cy: 72, variant: 2 },
      { id: 'orbit-s3', cx: 44, cy: 34, variant: 3 },
    ],
  },
  {
    slug: 'nebula-kit',
    name: 'Nebula Kit',
    tagline: 'Design system espacial',
    cx: 76,
    cy: 52,
    constellationChain: ['neb-s1', 'nebula-kit', 'neb-s2', 'neb-s3'],
    satellites: [
      { id: 'neb-s1', cx: 58, cy: 40, variant: 2 },
      { id: 'neb-s2', cx: 92, cy: 40, variant: 3 },
      { id: 'neb-s3', cx: 72, cy: 22, variant: 1 },
    ],
  },
] as const

export function getFeaturedProjectBySlug(
  slug: string,
): FeaturedProject | undefined {
  return featuredProjects.find((p) => p.slug === slug)
}
