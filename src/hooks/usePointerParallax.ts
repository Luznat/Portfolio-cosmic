import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

export type PointerOffset = {
  readonly x: number
  readonly y: number
}

export function usePointerParallax(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
): PointerOffset {
  const [offset, setOffset] = useState<PointerOffset>({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const handleMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      setOffset({ x, y })
    }

    const handleLeave = () => {
      setOffset({ x: 0, y: 0 })
    }

    container.addEventListener('pointermove', handleMove)
    container.addEventListener('pointerleave', handleLeave)

    return () => {
      container.removeEventListener('pointermove', handleMove)
      container.removeEventListener('pointerleave', handleLeave)
    }
  }, [containerRef, enabled])

  return offset
}
