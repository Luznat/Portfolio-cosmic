import { useScroll } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScrollContext } from '../contexts/HomeScrollContext'
import HomePage from '../pages/Home/HomePage'
import { ProjectPage } from '../pages/projects/ProjectPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomeRoute() {
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: mainRef })

  const scrollToJourney = useCallback(() => {
    const main = mainRef.current
    if (!main) return
    const hero = main.querySelector(
      '[data-hero-section]',
    ) as HTMLElement | null
    const top = hero?.offsetHeight ?? 0
    main.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <HomeScrollContext.Provider
      value={{
        scrollYProgress,
        scrollToJourney,
        scrollContainerRef: mainRef,
      }}
    >
      <HomePage mainRef={mainRef} />
    </HomeScrollContext.Provider>
  )
}
