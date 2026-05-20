import { useScroll } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
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

  const scrollToSection = useCallback((sectionId: string) => {
    const main = mainRef.current
    if (!main) return

    const target = main.querySelector<HTMLElement>(`#${sectionId}`)
    if (!target) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    target.scrollIntoView({
      behavior: prefersReduced ? 'instant' : 'smooth',
      block: 'start',
    })
  }, [])

  const scrollToJourney = useCallback(() => {
    scrollToSection('projetos')
  }, [scrollToSection])

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [scrollToSection])

  return (
    <HomeScrollContext.Provider
      value={{
        scrollYProgress,
        scrollToSection,
        scrollToJourney,
        scrollContainerRef: mainRef,
      }}
    >
      <HomePage mainRef={mainRef} />
    </HomeScrollContext.Provider>
  )
}
