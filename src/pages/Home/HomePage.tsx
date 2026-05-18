import type { RefObject } from 'react'
import { SiteHeader } from '../../features/navigation'
import { HeroSection } from '../../features/hero'
import { ContactSection } from '../../sections/contact/ContactSection'
import { ProjectsJourneySection } from '../../sections/projects-journey/ProjectsJourneySection'
import './home.css'

export type HomePageProps = {
  readonly mainRef: RefObject<HTMLDivElement | null>
}

export default function HomePage({ mainRef }: HomePageProps) {
  return (
    <>
      <SiteHeader />
      <main id="home-scroll" ref={mainRef} className="homeSnap" tabIndex={-1}>
        <HeroSection />
        <ProjectsJourneySection />
        <ContactSection />
      </main>
    </>
  )
}
