import { SectionTicks } from '../components/SectionTicks'
import { HeroSection } from '../sections/HeroSection'
import { NextStepsSection } from '../sections/NextStepsSection'
import '../styles/home.css'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionTicks />
      <NextStepsSection />
      <SectionTicks />
      <section id="spacer" aria-hidden />
    </>
  )
}
