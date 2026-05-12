import { SectionTicks } from '../components/SectionTicks'
import { SiteHeader } from '../components/SiteHeader'
import { HeroSection } from '../sections/Hero'
import { NextStepsSection } from '../sections/NextStepsSection'
import '../styles/home.css'

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
