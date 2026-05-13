import type { MotionValue } from 'framer-motion'
import { createContext, useContext } from 'react'

export type HomeScrollContextValue = {
  scrollYProgress: MotionValue<number>
  wormholeProgress: MotionValue<number>
  constellationRevealed: boolean
  beginWormhole: () => void
  beginReverseWormhole: () => void
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
