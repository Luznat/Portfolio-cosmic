import andromedaCover from '../shared/assets/images/projetos/andromeda-app/Group 6.png'

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
   * Scroll-linked drift for this constellation (lines + stars move together).
   * 0 = off. Typical 0.1–0.22 (multiplies pixel range).
   */
  readonly constellationParallax?: number
  /**
   * Single path: satellite ids and project slug; consecutive pairs draw segments.
   */
  readonly constellationChain: readonly string[]
}

/**
 * Two separate maps (0–100 viewBox): left = Andrômeda App, right = Nebula Kit.
 * Each follows a zig-zag like the Figma reference: top corner → main star →
 * lower opposite → mid outer → far corner.
 */
export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: 'andromeda-app',
    name: 'Andrômeda',
    tagline: 'Astronomia e exploração espacial',
    cx: 15,
    cy: 45,
    coverSrc: andromedaCover,
    constellationParallax: 0.10,
    constellationChain: [
      'and-s2',
      'and-s1',
      'andromeda-app',
      'and-s3',
      'and-s4',
    ],
    satellites: [
      { id: 'and-s1', cx: 10, cy: 24, variant: 1 },
      { id: 'and-s2', cx: 30, cy: 10, variant: 2 },
      { id: 'and-s3', cx: 40, cy: 54, variant: 3 },
      { id: 'and-s4', cx: 44, cy: 78, variant: 2 },
    ],
  },
  {
    slug: 'nebula-kit',
    name: 'Nebula Kit',
    tagline: 'Design system espacial',
    cx: 72,
    cy: 10,
    constellationParallax: 0.15,
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

/** Positions tuned for portrait — Andrômeda upper-left, Nebula lower-right (less overlap). */
export const featuredProjectsMobile: readonly FeaturedProject[] = [
  {
    slug: 'andromeda-app',
    name: 'Andrômeda',
    tagline: 'Astronomia e exploração espacial',
    cx: 22,
    cy: 38,
    coverSrc: andromedaCover,
    constellationParallax: 0.1,
    constellationChain: [
      'and-s2',
      'and-s1',
      'andromeda-app',
      'and-s3',
      'and-s4',
    ],
    satellites: [
      { id: 'and-s1', cx: 14, cy: 20, variant: 1 },
      { id: 'and-s2', cx: 34, cy: 8, variant: 2 },
      { id: 'and-s3', cx: 44, cy: 56, variant: 3 },
      { id: 'and-s4', cx: 48, cy: 72, variant: 2 },
    ],
  },
  {
    slug: 'nebula-kit',
    name: 'Nebula Kit',
    tagline: 'Design system espacial',
    cx: 72,
    cy: 32,
    constellationParallax: 0.15,
    constellationChain: [
      'neb-s1',
      'nebula-kit',
      'neb-s2',
      'neb-s3',
      'neb-s4',
    ],
    satellites: [
      { id: 'neb-s1', cx: 84, cy: 14, variant: 2 },
      { id: 'neb-s2', cx: 90, cy: 52, variant: 3 },
      { id: 'neb-s3', cx: 58, cy: 64, variant: 1 },
      { id: 'neb-s4', cx: 76, cy: 80, variant: 2 },
    ],
  },
] as const

export function getFeaturedProjectForViewport(
  mobile: boolean,
): readonly FeaturedProject[] {
  return mobile ? featuredProjectsMobile : featuredProjects
}

export function getFeaturedProjectBySlug(
  slug: string,
): FeaturedProject | undefined {
  return featuredProjects.find((p) => p.slug === slug)
}
