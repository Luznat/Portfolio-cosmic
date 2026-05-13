import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScrollContext } from '../contexts/HomeScrollContext'
import HomePage from '../pages/Home/HomePage'
import { ProjectPage } from '../pages/projects/ProjectPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWithScroll />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomeWithScroll() {
  const mainRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const wormholeProgress = useMotionValue(0)
  const [constellationRevealed, setConstellationRevealed] = useState(false)
  const runningRef = useRef(false)
  const doneRef = useRef(false)

  const { scrollYProgress } = useScroll({ container: mainRef })

  const beginWormhole = useCallback(() => {
    if (runningRef.current || doneRef.current) return
    const main = mainRef.current
    if (!main) return

    runningRef.current = true
    main.style.overflow = 'hidden'

    const duration = reduceMotion ? 0.55 : 1.28
    const ease = [0.9, 0, 0.12, 1] as const

    void animate(wormholeProgress, 1, {
      duration,
      ease,
      onComplete: () => {
        const hero = main.querySelector(
          '[data-hero-section]',
        ) as HTMLElement | null
        const top = hero?.offsetHeight ?? Math.round(main.clientHeight)

        wormholeProgress.set(0)
        main.scrollTo({ top, behavior: 'instant' })
        main.style.overflow = ''
        runningRef.current = false
        doneRef.current = true
        setConstellationRevealed(true)
      },
    })
  }, [reduceMotion, wormholeProgress])

  const beginReverseWormhole = useCallback(() => {
    if (runningRef.current || !doneRef.current) return
    const main = mainRef.current
    if (!main) return

    runningRef.current = true
    main.style.overflow = 'hidden'

    setConstellationRevealed(false)
    wormholeProgress.set(1)
    main.scrollTo({ top: 0, behavior: 'instant' })

    const duration = reduceMotion ? 0.55 : 1.28
    const ease = [0.14, 0, 0.22, 1] as const

    requestAnimationFrame(() => {
      void animate(wormholeProgress, 0, {
        duration,
        ease,
        onComplete: () => {
          main.style.overflow = ''
          runningRef.current = false
          doneRef.current = false
        },
      })
    })
  }, [reduceMotion, wormholeProgress])

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    let touchStartY = 0

    const onWheel = (e: WheelEvent) => {
      if (runningRef.current) {
        e.preventDefault()
        return
      }

      const hero = main.querySelector(
        '[data-hero-section]',
      ) as HTMLElement | null
      const heroH = hero?.offsetHeight ?? main.clientHeight
      const st = main.scrollTop

      if (e.deltaY < -5 && doneRef.current) {
        const nearHeroReturn =
          st >= heroH * 0.02 && st <= heroH * 1.08 + 40
        if (nearHeroReturn) {
          e.preventDefault()
          beginReverseWormhole()
          return
        }
      }

      if (doneRef.current) return
      if (e.deltaY <= 4) return

      if (st < heroH * 0.55) {
        e.preventDefault()
        beginWormhole()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (runningRef.current) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartY
      const dy = touchStartY - endY

      const hero = main.querySelector(
        '[data-hero-section]',
      ) as HTMLElement | null
      const heroH = hero?.offsetHeight ?? main.clientHeight
      const st = main.scrollTop

      if (dy > 48 && !doneRef.current && st < heroH * 0.55) {
        beginWormhole()
        return
      }

      if (
        dy < -52 &&
        doneRef.current &&
        st >= heroH * 0.02 &&
        st <= heroH * 1.08 + 40
      ) {
        beginReverseWormhole()
      }
    }

    main.addEventListener('wheel', onWheel, { passive: false })
    main.addEventListener('touchstart', onTouchStart, { passive: true })
    main.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      main.removeEventListener('wheel', onWheel)
      main.removeEventListener('touchstart', onTouchStart)
      main.removeEventListener('touchend', onTouchEnd)
    }
  }, [beginWormhole, beginReverseWormhole])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.035) {
      setConstellationRevealed((prev) => {
        if (prev) doneRef.current = false
        return false
      })
    }
  })

  return (
    <HomeScrollContext.Provider
      value={{
        scrollYProgress,
        wormholeProgress,
        constellationRevealed,
        beginWormhole,
        beginReverseWormhole,
      }}
    >
      <HomePage mainRef={mainRef} />
    </HomeScrollContext.Provider>
  )
}
