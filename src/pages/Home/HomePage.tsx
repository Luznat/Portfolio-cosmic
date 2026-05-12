import { SiteHeader } from '../../features/navigation'
import { HeroSection } from '../../features/hero'
import { NextStepsSection } from '../../features/next-steps'
import { SectionTicks } from '../../widgets/section-ticks'
import './home.css'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <SectionTicks />
      <NextStepsSection />
      <SectionTicks />
      <section id="spacer" aria-hidden />
    </>
  )
}
