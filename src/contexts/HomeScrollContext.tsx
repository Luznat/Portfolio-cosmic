import type { MotionValue } from 'framer-motion'
import { createContext, useContext } from 'react'

export type HomeScrollContextValue = {
  readonly scrollYProgress: MotionValue<number>
  readonly scrollToJourney: () => void
}

export const HomeScrollContext = createContext<HomeScrollContextValue | null>(
  null,
)

export function useHomeScroll(): HomeScrollContextValue {
  const ctx = useContext(HomeScrollContext)
  if (!ctx) {
    throw new Error(
      'useHomeScroll must be used within HomeScrollContext.Provider',
    )
  }
  return ctx
}
