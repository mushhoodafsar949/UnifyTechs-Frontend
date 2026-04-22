import { CSSProperties } from 'react'

type OrbitDot = {
  angle: number // anchor angle on the ring, in degrees (0 = top, clockwise positive)
  color?: string // dot fill color (defaults to cyan)
  size?: number // dot diameter in px
  cometDuration: number // seconds for this dot's own comet to complete one revolution
  cometColor?: string // color of the comet head/trail
  reverse?: boolean // if true this comet travels counter-clockwise
}

type OrbitRingConfig = {
  size: number // diameter as a % of the square stage (0-100)
  dots: OrbitDot[]
}

/**
 * Planetary-orbit background animation.
 *
 * Each dot on a ring gets its own independent comet that travels along the
 * ring's curve. The comet trail is rendered via a conic-gradient masked to
 * the ring's stroke so it perfectly follows the circle. At t=0 each comet is
 * positioned exactly on top of its dot; once per revolution the comet returns
 * to that position, at which moment the dot flares brightly.
 *
 * The parent element must have `position: relative` and `overflow: hidden`.
 */
const DEFAULT_DOT_COLOR = '#22d3ee'
const DEFAULT_COMET_COLOR = '#e0f2fe'

const RINGS: OrbitRingConfig[] = [
  {
    size: 28,
    dots: [{ angle: 40, color: '#22d3ee', size: 5, cometDuration: 48, cometColor: '#bae6fd' }],
  },
  {
    size: 50,
    dots: [
      { angle: 20, color: '#38bdf8', size: 5, cometDuration: 72, cometColor: '#bae6fd' },
      { angle: 230, color: '#a78bfa', size: 4, cometDuration: 88, cometColor: '#c4b5fd', reverse: true },
    ],
  },
  {
    size: 74,
    dots: [
      { angle: 30, color: '#38bdf8', size: 6, cometDuration: 96, cometColor: '#bae6fd' },
      { angle: 210, color: '#818cf8', size: 5, cometDuration: 108, cometColor: '#c4b5fd', reverse: true },
    ],
  },
  {
    size: 100,
    dots: [
      { angle: 60, color: '#22d3ee', size: 5, cometDuration: 120, cometColor: '#bae6fd' },
      { angle: 240, color: '#a78bfa', size: 5, cometDuration: 140, cometColor: '#c4b5fd', reverse: true },
    ],
  },
]

type RingCSS = CSSProperties & {
  '--orbit-size': string
}

type DotAnchorCSS = CSSProperties & {
  '--angle': string
  '--dot-size': string
  '--dot-color': string
  '--comet-duration': string
}

type CometSpinCSS = CSSProperties & {
  '--comet-duration': string
  '--comet-delay': string
  '--comet-color': string
}

/**
 * At t=0 the comet head should sit exactly on its paired dot.
 *
 * For a forward-rotating comet, the `tech-orbit-spin` keyframe rotates the
 * wrapper from 0° → 360° over `duration`. With an `animation-delay` of `-X`
 * seconds, rotation at t=0 becomes `(X / duration) * 360`. We want this to
 * equal the dot's angle A, so X = (A / 360) * duration, i.e.
 *   animation-delay = -(A / 360) * duration.
 *
 * For a reverse comet, `animation-direction: reverse` means rotation at t=0
 * (no delay) is already 360° ≡ 0°, and it decreases over time. With delay
 * `-X`, rotation at t=0 becomes `360 - (X / duration) * 360`. We want that
 * to equal A, so X = ((360 - A) / 360) * duration.
 */
function cometStartDelaySeconds(angle: number, duration: number, reverse: boolean) {
  const effective = reverse ? (360 - (angle % 360)) % 360 : angle % 360
  return -(effective / 360) * duration
}

export function TechOrbit() {
  return (
    <div className="tech-orbit tech-orbit--bg" aria-hidden>
      <div className="tech-orbit__stage">
        <span className="tech-orbit__spark tech-orbit__spark--a" />
        <span className="tech-orbit__spark tech-orbit__spark--b" />
        <span className="tech-orbit__spark tech-orbit__spark--c" />
        <span className="tech-orbit__spark tech-orbit__spark--d" />
        <span className="tech-orbit__spark tech-orbit__spark--e" />

        <div className="tech-orbit__core-halo" />

        {RINGS.map((ring, ringIdx) => {
          const ringStyle: RingCSS = { '--orbit-size': `${ring.size}%` }
          return (
            <div key={ringIdx} className="tech-orbit__ring" style={ringStyle}>
              <div className="tech-orbit__ring-border" />

              {ring.dots.map((d, dotIdx) => {
                const reverse = !!d.reverse
                const cometColor = d.cometColor ?? DEFAULT_COMET_COLOR
                const dotColor = d.color ?? DEFAULT_DOT_COLOR
                const size = d.size ?? 5
                const cometDelay = cometStartDelaySeconds(d.angle, d.cometDuration, reverse)

                const anchorStyle: DotAnchorCSS = {
                  '--angle': `${d.angle}deg`,
                  '--dot-size': `${size}px`,
                  '--dot-color': dotColor,
                  '--comet-duration': `${d.cometDuration}s`,
                }

                const cometSpinStyle: CometSpinCSS = {
                  '--comet-duration': `${d.cometDuration}s`,
                  '--comet-delay': `${cometDelay}s`,
                  '--comet-color': cometColor,
                }

                return (
                  <div key={dotIdx} className="tech-orbit__dot-pair">
                    {/* Stationary dot that glows when its comet returns */}
                    <div className="tech-orbit__dot-anchor" style={anchorStyle}>
                      <span className="tech-orbit__dot" />
                    </div>

                    {/* Dedicated comet traveling along the ring */}
                    <div
                      className={`tech-orbit__comet-spin${reverse ? ' tech-orbit__comet-spin--reverse' : ''}`}
                      style={cometSpinStyle}
                    >
                      <div className="tech-orbit__comet-arc" />
                      <span className="tech-orbit__comet-head" />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
