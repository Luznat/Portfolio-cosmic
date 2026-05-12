import { useEffect, useRef } from 'react'
import heroVideoUrl from '../../assets/videos/nPQXGJoy-ezgif.com-reverse-video.mp4'
import styles from './HeroBackgroundVideo.module.css'

export function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPlayback = () => {
      if (mq.matches) {
        video.pause()
        video.currentTime = 0
        return
      }
      void video.play().catch(() => {})
    }

    syncPlayback()
    mq.addEventListener('change', syncPlayback)
    return () => mq.removeEventListener('change', syncPlayback)
  }, [])

  return (
    <div className={styles.wrap} aria-hidden>
      <video
        ref={ref}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
    </div>
  )
}
