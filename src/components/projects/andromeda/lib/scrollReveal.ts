export function revealOpacity(
  progress: number,
  reveal: readonly [number, number],
  tail = 0,
): number {
  const [t0, t1] = reveal
  const tEnd = Math.min(1, t1 + tail)
  if (progress <= t0) return 0
  if (progress >= tEnd) return 1
  return (progress - t0) / (t1 - t0)
}

export function revealScale(
  progress: number,
  reveal: readonly [number, number],
  from: number,
  to = 1,
): number {
  const amount = revealOpacity(progress, reveal)
  return from + (to - from) * amount
}

export function constellationLineOpacity(
  progress: number,
  reveal: readonly [number, number],
  lit: boolean,
  dimmed: boolean,
): number {
  const base = revealOpacity(progress, reveal, 0.06)
  if (dimmed) return base * 0.86
  if (lit) return Math.min(1, base * 1.15)
  return base
}
