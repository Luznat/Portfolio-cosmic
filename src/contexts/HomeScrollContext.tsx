import type { MotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import { createContext, useContext } from 'react'

export type HomeScrollContextValue = {
  readonly scrollYProgress: MotionValue<number>
  readonly scrollToSection: (sectionId: string) => void
  readonly scrollToJourney: () => void
  /** `<main id="home-scroll">` — required for `useScroll({ container })` on nested sections */
  readonly scrollContainerRef: RefObject<HTMLDivElement | null>
}

export const HomeScrollContext = createContext<HomeScrollContextValue | null>(
  null,
)

export function useOptionalHomeScroll(): HomeScrollContextValue | null {
  return useContext(HomeScrollContext)
}

export function useHomeScroll(): HomeScrollContextValue {
  const ctx = useOptionalHomeScroll()
  if (!ctx) {
    throw new Error(
      'useHomeScroll must be used within HomeScrollContext.Provider',
    )
  }
  return ctx
}
