export interface FeaturedProject {
  readonly slug: string
  readonly name: string
  readonly tagline: string
  /** Normalized layout position (0–100) within the constellation viewBox */
  readonly cx: number
  readonly cy: number
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: 'orbit-mobile',
    name: 'Orbit',
    tagline: 'Experiência mobile imersiva',
    cx: 28,
    cy: 58,
  },
  {
    slug: 'nebula-kit',
    name: 'Nebula Kit',
    tagline: 'Design system espacial',
    cx: 72,
    cy: 42,
  },
] as const

export function getFeaturedProjectBySlug(
  slug: string,
): FeaturedProject | undefined {
  return featuredProjects.find((p) => p.slug === slug)
}
