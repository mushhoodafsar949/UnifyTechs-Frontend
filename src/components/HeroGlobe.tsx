import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import type { ThemeMode } from '../theme'
import { US_GLOBE_MARKERS } from '../data/usCoverage'

type Props = {
  theme: ThemeMode
}

/**
 * Rotating globe with WebGL markers at lat/lng. Labels use cobe's CSS anchor API (`--cobe-{id}`,
 * `--cobe-visible-{id}`) so text tracks rotation and fades when the point faces away.
 * @see https://github.com/shuding/cobe#bindable-markers--arcs
 */
export function HeroGlobe({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let phi = 0
    let globe: ReturnType<typeof createGlobe> | undefined
    let raf = 0

    const isDark = theme === 'dark'

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const markers = US_GLOBE_MARKERS.map((m) => ({
      location: [m.lat, m.lng] as [number, number],
      size: 0.052,
      id: m.id,
    }))

    const build = () => {
      globe?.destroy()

      const rect = container.getBoundingClientRect()
      const raw = Math.min(rect.width, rect.height) || 560
      const size = Math.min(Math.max(raw, 360), 920)

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: Math.floor(size),
        height: Math.floor(size),
        phi: phi,
        theta: 0.22,
        dark: isDark ? 1 : 0,
        diffuse: 1.22,
        mapSamples: 16000,
        mapBrightness: isDark ? 5.8 : 6,
        mapBaseBrightness: isDark ? 0.06 : 0,
        baseColor: isDark ? ([0.07, 0.09, 0.13] as [number, number, number]) : ([0.9, 0.93, 0.97] as [number, number, number]),
        markerColor: isDark ? ([0.28, 0.82, 0.72] as [number, number, number]) : ([0.12, 0.42, 0.88] as [number, number, number]),
        glowColor: isDark ? ([0.09, 0.11, 0.15] as [number, number, number]) : ([0.88, 0.92, 0.98] as [number, number, number]),
        markers,
        markerElevation: 0.04,
        scale: 1.06,
        opacity: isDark ? 0.88 : 0.82,
      })
    }

    const tick = () => {
      phi += reducedMotion ? 0 : 0.0032
      globe?.update({ phi })
      if (!reducedMotion) raf = requestAnimationFrame(tick)
    }

    build()
    if (!reducedMotion) raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      build()
      globe?.update({ phi })
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      globe?.destroy()
    }
  }, [theme])

  return (
    <div ref={containerRef} className="hero-globe">
      <canvas ref={canvasRef} className="hero-globe__canvas" aria-hidden />
      <div className="hero-globe__labels" aria-hidden="true">
        {US_GLOBE_MARKERS.map((m) => (
          <span key={m.id} className="hero-globe__marker-label" data-marker={m.id}>
            <span className="hero-globe__marker-abbr">{m.code}</span>
            <span className="hero-globe__marker-name">{m.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
