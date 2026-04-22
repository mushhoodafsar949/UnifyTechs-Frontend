import type { ReactNode } from 'react'

/**
 * SystemFlow
 * -----------------------------------------------------------------------------
 * Animated diagram used on the About section. Shows the UnifyTechs platform
 * sitting between payers (left) and care providers (right), with traveling
 * pulses that visualize:
 *
 *   - patient data flowing IN from providers
 *   - claims flowing OUT to payers
 *   - reports / EOBs flowing BACK from payers
 *   - processed results flowing BACK to providers
 *
 * All shapes and motions are declared in SMIL so the animation runs without
 * JS once the SVG is in the DOM, and the stylesheet controls the framing.
 */
export function SystemFlow() {
  return (
    <div className="system-flow">
      <div className="system-flow__intro">
        <span className="system-flow__eyebrow">HOW UNIFYTECHS CONNECTS YOU</span>
        <h3 className="system-flow__title">
          Two-way claims traffic between providers and every major payer — on one platform.
        </h3>
        <p className="system-flow__sub">
          Practices and facilities send patient encounters in. UnifyTechs normalizes, scrubs, and
          submits claims to payers. Responses, EOBs, and remits flow back on the same pipe —
          fully audit-logged.
        </p>
      </div>

      <div className="system-flow__canvas">
        <SystemFlowArt />
        <div className="system-flow__legend" aria-hidden="true">
          <span>
            <i className="system-flow__legend-dot system-flow__legend-dot--accent" />
            Data &amp; claims out
          </span>
          <span>
            <i className="system-flow__legend-dot system-flow__legend-dot--primary" />
            Reports &amp; responses back
          </span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ SVG --- */

type Side = 'payer' | 'provider'
type Spoke = {
  id: string
  side: Side
  // connection point just outside the node (endpoint facing the hub)
  x: number
  y: number
  // path endpoint at the hub's perimeter (computed)
  hubX: number
  hubY: number
  // Staggered durations + delays so the traffic feels organic
  outDur: number
  inDur: number
  outDelay: number
  inDelay: number
}

function SystemFlowArt() {
  // Canvas / hub geometry -----------------------------------------------------
  const VB_W = 960
  const VB_H = 400
  const HUB_X = 480
  const HUB_Y = 200
  const HUB_OUTER = 112
  const HUB_RING = 82
  const HUB_DISK = 58

  // Returns a point on the hub's outer ring along the line hub → target,
  // nudged out a few pixels so traveling pulses don't collide with the disk.
  function hubEdge(tx: number, ty: number, pad = 4) {
    const dx = tx - HUB_X
    const dy = ty - HUB_Y
    const d = Math.hypot(dx, dy) || 1
    const t = (HUB_RING + pad) / d
    return { x: HUB_X + dx * t, y: HUB_Y + dy * t }
  }

  // Spoke endpoints -----------------------------------------------------------
  // Payer cards sit at x=40..180 on the left; providers at x=818..880 on the right.
  const rawSpokes: Omit<Spoke, 'hubX' | 'hubY'>[] = [
    { id: 'pa', side: 'payer', x: 180, y: 110, outDur: 3.2, inDur: 2.8, outDelay: 0.0, inDelay: 1.4 },
    { id: 'pb', side: 'payer', x: 180, y: 270, outDur: 3.0, inDur: 3.2, outDelay: 0.7, inDelay: 2.1 },
    { id: 'doc', side: 'provider', x: 818, y: 90, outDur: 2.8, inDur: 3.0, outDelay: 0.3, inDelay: 1.7 },
    { id: 'prac', side: 'provider', x: 818, y: 200, outDur: 3.2, inDur: 2.6, outDelay: 1.0, inDelay: 2.4 },
    { id: 'fac', side: 'provider', x: 818, y: 310, outDur: 3.0, inDur: 3.2, outDelay: 0.4, inDelay: 1.9 },
  ]
  const spokes: Spoke[] = rawSpokes.map((s) => {
    const e = hubEdge(s.x, s.y)
    return { ...s, hubX: e.x, hubY: e.y }
  })

  // Payer cards + provider dot metadata --------------------------------------
  const payers = [
    { id: 'pa', label: 'Payer A', x: 40, y: 80, w: 140, h: 60 },
    { id: 'pb', label: 'Payer B', x: 40, y: 240, w: 140, h: 60 },
  ]
  // Inline glyphs (centered at 0,0, rendered inside each provider dot)
  const providers: { id: string; label: string; x: number; y: number; glyph: ReactNode }[] = [
    {
      id: 'doc',
      label: 'Providers',
      x: 840,
      y: 90,
      glyph: (
        <g stroke="var(--clr-primary)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Stethoscope — represents individual providers / clinicians */}
          <path d="M -6 -6 V -1 a 4 4 0 0 0 8 0 V -6" />
          <path d="M -2 3 V 5 a 4 4 0 0 0 4 4 a 4 4 0 0 0 4 -4 V 2" />
          <circle cx="6" cy="2" r="2" fill="var(--clr-primary)" />
        </g>
      ),
    },
    {
      id: 'prac',
      label: 'Practices',
      x: 840,
      y: 200,
      glyph: (
        <g stroke="var(--clr-primary)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Heart-pulse line */}
          <path d="M -9 0 H -4 L -2 -5 L 1 5 L 3 0 H 9" />
        </g>
      ),
    },
    {
      id: 'fac',
      label: 'Facilities',
      x: 840,
      y: 310,
      glyph: (
        <g stroke="var(--clr-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Facility building with cross — represents large hospitals / networks */}
          <rect x="-8" y="-7" width="16" height="14" rx="1.5" />
          <line x1="0" y1="-4" x2="0" y2="2" />
          <line x1="-3" y1="-1" x2="3" y2="-1" />
        </g>
      ),
    },
  ]

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="system-flow-art"
      role="img"
      aria-label="UnifyTechs platform exchanging patient data, claims, and reports between providers and payers"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sfBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-bg-dark)" />
          <stop offset="100%" stopColor="var(--clr-bg-mid)" />
        </linearGradient>
        <radialGradient id="sfHubGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--clr-accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </radialGradient>

        {/* One path per spoke, running node-edge → hub-edge. Pulses follow
            these paths in both directions via keyPoints. */}
        {spokes.map((s) => (
          <path
            key={`def-${s.id}`}
            id={`sf-${s.id}`}
            d={`M ${s.x} ${s.y} L ${s.hubX} ${s.hubY}`}
            fill="none"
          />
        ))}
      </defs>

      {/* Background + soft hub glow */}
      <rect x="0" y="0" width={VB_W} height={VB_H} rx="22" fill="url(#sfBg)" />
      <circle cx={HUB_X} cy={HUB_Y} r="180" fill="url(#sfHubGlow)" />

      {/* --- Spoke lines (dashed, subtle flow) --- */}
      {spokes.map((s) => (
        <line
          key={`line-${s.id}`}
          x1={s.x}
          y1={s.y}
          x2={s.hubX}
          y2={s.hubY}
          stroke="var(--clr-accent)"
          strokeWidth="1.2"
          strokeDasharray="5 7"
          opacity="0.4"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="24"
            to="0"
            dur={`${s.outDur}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* --- Traveling pulses (two per spoke: outbound + inbound) --- */}
      {spokes.map((s) => {
        // For payers: "out" = hub → payer (claim submission, mint accent)
        //             "in"  = payer → hub (report back, primary blue)
        // For providers: "out" = provider → hub (patient data in, mint accent)
        //                "in"  = hub → provider (reports back, primary blue)
        const outKey = s.side === 'payer' ? '1;0' : '0;1'
        const inKey = s.side === 'payer' ? '0;1' : '1;0'
        return (
          <g key={`pulse-${s.id}`}>
            {/* Outbound — submission / patient data */}
            <circle r="7" fill="var(--clr-accent)" opacity="0.22">
              <animateMotion
                dur={`${s.outDur}s`}
                repeatCount="indefinite"
                begin={`${s.outDelay}s`}
                calcMode="linear"
                keyPoints={outKey}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#sf-${s.id}`} />
              </animateMotion>
            </circle>
            <circle r="3.4" fill="var(--clr-accent)">
              <animateMotion
                dur={`${s.outDur}s`}
                repeatCount="indefinite"
                begin={`${s.outDelay}s`}
                calcMode="linear"
                keyPoints={outKey}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#sf-${s.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur={`${s.outDur}s`}
                repeatCount="indefinite"
                begin={`${s.outDelay}s`}
              />
            </circle>

            {/* Inbound — report / response */}
            <circle r="7" fill="var(--clr-primary)" opacity="0.22">
              <animateMotion
                dur={`${s.inDur}s`}
                repeatCount="indefinite"
                begin={`${s.inDelay}s`}
                calcMode="linear"
                keyPoints={inKey}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#sf-${s.id}`} />
              </animateMotion>
            </circle>
            <circle r="3.4" fill="var(--clr-primary)">
              <animateMotion
                dur={`${s.inDur}s`}
                repeatCount="indefinite"
                begin={`${s.inDelay}s`}
                calcMode="linear"
                keyPoints={inKey}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#sf-${s.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur={`${s.inDur}s`}
                repeatCount="indefinite"
                begin={`${s.inDelay}s`}
              />
            </circle>
          </g>
        )
      })}

      {/* --- Payer cards (left) --- */}
      {payers.map((p) => (
        <g key={p.id} transform={`translate(${p.x},${p.y})`}>
          <rect
            width={p.w}
            height={p.h}
            rx="12"
            fill="var(--clr-surface)"
            stroke="var(--clr-border)"
          />
          {/* Mini file-icon glyph on the left */}
          <g transform="translate(16,18)" stroke="var(--clr-text-muted)" strokeWidth="1.4" fill="none">
            <path d="M 0 0 H 16 L 22 6 V 24 H 0 Z" />
            <path d="M 16 0 V 6 H 22" />
            <line x1="5" y1="12" x2="17" y2="12" opacity="0.7" />
            <line x1="5" y1="17" x2="14" y2="17" opacity="0.55" />
          </g>
          <text x="54" y="28" fontSize="15" fontWeight="700" fill="var(--clr-text-primary)">
            {p.label}
          </text>
          <text x="54" y="46" fontSize="11" fill="var(--clr-text-muted)">
            Insurance group
          </text>
          {/* Status pip — breathes to signal an active link */}
          <circle cx={p.w - 14} cy="14" r="4" fill="var(--clr-accent)">
            <animate attributeName="opacity" values="0.35;1;0.35" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* --- Central UnifyTechs hub --- */}
      <g transform={`translate(${HUB_X},${HUB_Y})`}>
        {/* Outermost breathing halo */}
        <circle r={HUB_OUTER} fill="none" stroke="var(--clr-accent)" strokeWidth="1.1" opacity="0.25">
          <animate attributeName="r" values={`${HUB_OUTER};${HUB_OUTER + 12};${HUB_OUTER}`} dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.28;0.08;0.28" dur="3.6s" repeatCount="indefinite" />
        </circle>
        {/* Ring */}
        <circle r={HUB_RING} fill="var(--clr-bg-mid)" stroke="var(--clr-border)" strokeWidth="1.2" />
        <circle r={HUB_RING - 6} fill="none" stroke="var(--clr-accent)" strokeWidth="1.2" opacity="0.55">
          <animate attributeName="stroke-dasharray" values="0 999;200 999;0 999" dur="5s" repeatCount="indefinite" />
        </circle>
        {/* Inner disk */}
        <circle r={HUB_DISK} fill="var(--clr-bg-dark)" stroke="var(--clr-accent)" strokeWidth="1" opacity="0.85" />
        {/* Brand text */}
        <text
          y="-4"
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.5"
          fill="var(--clr-text-primary)"
        >
          UnifyTechs
        </text>
        <text
          y="14"
          textAnchor="middle"
          fontSize="9.5"
          letterSpacing="2"
          fill="var(--clr-accent)"
          fontWeight="700"
        >
          PROCESSING
        </text>
        {/* Processing micro-dots */}
        <g transform="translate(-12,26)" fill="var(--clr-accent)">
          <circle r="2">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" r="2">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.25s" repeatCount="indefinite" />
          </circle>
          <circle cx="24" r="2">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* --- Provider dots (right) --- */}
      {providers.map((p) => (
        <g key={p.id} transform={`translate(${p.x},${p.y})`}>
          {/* Pulsing halo behind the dot */}
          <circle r="28" fill="var(--clr-primary)" opacity="0.1">
            <animate attributeName="r" values="24;32;24" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Solid dot */}
          <circle r="22" fill="var(--clr-surface)" stroke="var(--clr-border)" />
          <circle r="22" fill="var(--clr-primary)" opacity="0.15" />
          {/* Glyph */}
          {p.glyph}
          {/* Label */}
          <text
            y="48"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--clr-text-primary)"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
