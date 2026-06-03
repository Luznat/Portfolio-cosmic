import { useLayoutEffect, useState } from 'react'
import { andromedaAppContent } from '../../content/projects/andromedaApp'
import './andromeda-project.css'

const frontScreen = andromedaAppContent.heroScreens[1]

type VortexLayout = {
  top: number
  left: number
  width: number
  height: number
}

export function AndromedaVortexFrontScreen() {
  const [layout, setLayout] = useState<VortexLayout | null>(null)

  useLayoutEffect(() => {
    const main = document.querySelector('.projectPage--andromeda')
    const anchor = document.querySelector('.andromeda__vortex--anchor')

    if (!main || !anchor) return

    const update = () => {
      const mainRect = main.getBoundingClientRect()
      const anchorRect = anchor.getBoundingClientRect()
      setLayout({
        top: anchorRect.top - mainRect.top,
        left: anchorRect.left - mainRect.left,
        width: anchorRect.width,
        height: anchorRect.height,
      })
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(anchor)
    observer.observe(main)
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!layout || !frontScreen) return null

  return (
    <div
      className="andromeda__vortex andromeda__vortexFrontLayer"
      style={{
        top: layout.top,
        left: layout.left,
        width: layout.width,
        height: layout.height,
      }}
      aria-hidden
    >
      <div className="andromeda__vortexShotWrap" data-vortex-index={1}>
        <img
          className="andromeda__vortexShot"
          src={frontScreen.src}
          srcSet={`${frontScreen.src} 1080w`}
          sizes="(min-width: 64rem) 13rem, (min-width: 40rem) 11rem, 9rem"
          alt=""
          width={1080}
          height={2210}
          decoding="async"
        />
      </div>
    </div>
  )
}
