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
   * Single path through this constellation: small stars (ids) and project slug.
   * Consecutive pairs are the only segments drawn (celestial map, no random chords).
   */
  readonly constellationChain: readonly string[]
}

/**
 * Two separate maps (0–100 viewBox): left = Orbit, right = Nebula Kit.
 * Each follows a zig-zag like the Figma reference: top corner → main star →
 * lower opposite → mid outer → far corner.
 */
export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: 'orbit-mobile',
    name: 'Orbit',
    tagline: 'Experiência mobile imersiva',
    cx: 15,
    cy: 45,
    coverSrc: heroCover,
    constellationChain: [
      'orbit-s2',
      'orbit-s1',
      'orbit-mobile',
      'orbit-s3',
      'orbit-s4',
    ],
    satellites: [
      { id: 'orbit-s1', cx: 10, cy: 24, variant: 1 },
      { id: 'orbit-s2', cx: 30, cy: 10, variant: 2 },
      { id: 'orbit-s3', cx: 40, cy: 54, variant: 3 },
      { id: 'orbit-s4', cx: 44, cy: 78, variant: 2 },
    ],
  },
  {
    slug: 'nebula-kit',
    name: 'Nebula Kit',
    tagline: 'Design system espacial',
    cx: 72,
    cy: 10,
    constellationChain: [
      'neb-s1',
      'nebula-kit',
      'neb-s2',
      'neb-s3',
      'neb-s4',
    ],
    satellites: [
      { id: 'neb-s1', cx: 85, cy: 5, variant: 2 },
      { id: 'neb-s2', cx: 86, cy: 72, variant: 3 },
      { id: 'neb-s3', cx: 60, cy: 54, variant: 1 },
      { id: 'neb-s4', cx: 65, cy: 80, variant: 2 },
    ],
  },
] as const

export function getFeaturedProjectBySlug(
  slug: string,
): FeaturedProject | undefined {
  return featuredProjects.find((p) => p.slug === slug)
}
