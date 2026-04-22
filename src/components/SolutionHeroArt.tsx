import type { SolutionSlug } from '../legal/routes'

/**
 * Per-solution hero illustrations. Each SVG draws from the site theme tokens
 * (`--clr-accent`, `--clr-primary`, `--clr-text-primary`, etc.) so the art
 * stays on-brand in both light and dark modes.
 */

type Props = {
  kind: SolutionSlug
}

export function SolutionHeroArt({ kind }: Props) {
  switch (kind) {
    case 'ocr':
      return <OcrArt />
    case 'eligibility':
      return <EligibilityArt />
    case 'codes':
      return <CodesArt />
    case 'denials':
      return <DenialsArt />
    case 'integrations':
      return <IntegrationsArt />
  }
}

/* ---------------------------------------------------------------- OCR --- */
function OcrArt() {
  return (
    <svg
      viewBox="0 0 520 340"
      className="solution-art"
      role="img"
      aria-label="Scanned form being extracted into structured fields"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ocrGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--clr-primary)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="ocrScan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--clr-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="520" height="340" fill="url(#ocrGlow)" rx="22" />

      {/* Paper */}
      <g transform="translate(30,28)">
        <rect width="220" height="284" rx="14" fill="var(--clr-surface)" stroke="var(--clr-border)" />
        <rect x="16" y="18" width="110" height="10" rx="3" fill="var(--clr-text-muted)" opacity="0.55" />
        <rect x="16" y="34" width="70" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.35" />

        {/* Field boxes — dashed, the "extracted" targets */}
        <g fill="none" stroke="var(--clr-accent)" strokeDasharray="4 4" strokeWidth="1.5">
          <rect x="16" y="58" width="188" height="28" rx="4" />
          <rect x="16" y="98" width="90" height="28" rx="4" />
          <rect x="114" y="98" width="90" height="28" rx="4" />
          <rect x="16" y="138" width="188" height="38" rx="4" />
          <rect x="16" y="188" width="90" height="28" rx="4" />
          <rect x="114" y="188" width="90" height="28" rx="4" />
          <rect x="16" y="228" width="188" height="40" rx="4" />
        </g>

        {/* Scan bar */}
        <rect x="0" y="80" width="220" height="6" fill="url(#ocrScan)">
          <animate attributeName="y" values="12;260;12" dur="4.5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Connector lines */}
      <g stroke="var(--clr-accent)" strokeWidth="1.4" fill="none" opacity="0.55">
        <path d="M 250 90 C 290 90, 290 80, 320 80" />
        <path d="M 250 140 C 290 140, 290 150, 320 150" />
        <path d="M 250 200 C 290 200, 290 220, 320 220" />
      </g>

      {/* Structured output panel */}
      <g transform="translate(320,40)">
        <rect width="170" height="260" rx="12" fill="var(--clr-bg-mid)" stroke="var(--clr-border)" />
        <g fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="11" fill="var(--clr-text-primary)">
          <text x="16" y="30" fill="var(--clr-accent)">patient</text>
          <text x="16" y="46">"Jane Doe"</text>
          <text x="16" y="72" fill="var(--clr-accent)">dob</text>
          <text x="16" y="88">1978-04-12</text>
          <text x="16" y="114" fill="var(--clr-accent)">memberId</text>
          <text x="16" y="130">A1042-88-320</text>
          <text x="16" y="156" fill="var(--clr-accent)">cpt</text>
          <text x="16" y="172">99213, 36415</text>
          <text x="16" y="198" fill="var(--clr-accent)">icd10</text>
          <text x="16" y="214">E11.9, Z79.4</text>
          <text x="16" y="240" fill="var(--clr-accent)">confidence</text>
          <text x="16" y="256">0.96</text>
        </g>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------- Eligibility --- */
function EligibilityArt() {
  return (
    <svg
      viewBox="0 0 520 340"
      className="solution-art"
      role="img"
      aria-label="Member card queried against a payer returning active coverage"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="elgGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="520" height="340" rx="22" fill="url(#elgGlow)" />

      {/* Member card */}
      <g transform="translate(32,100)">
        <rect width="180" height="120" rx="14" fill="var(--clr-surface)" stroke="var(--clr-border)" />
        <circle cx="28" cy="30" r="12" fill="var(--clr-accent)" opacity="0.85" />
        <rect x="48" y="22" width="100" height="8" rx="3" fill="var(--clr-text-primary)" opacity="0.8" />
        <rect x="48" y="36" width="72" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.7" />
        <rect x="16" y="64" width="148" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.35" />
        <rect x="16" y="78" width="110" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.35" />
        <rect x="16" y="94" width="86" height="10" rx="3" fill="var(--clr-primary)" opacity="0.85" />
      </g>

      {/* Outbound arrow */}
      <g stroke="var(--clr-accent)" strokeWidth="2" fill="none">
        <path d="M 220 138 L 298 138" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.5s" repeatCount="indefinite" />
        </path>
        <polyline points="292,132 304,138 292,144" fill="var(--clr-accent)" stroke="none" />
      </g>
      <text x="230" y="124" fontSize="11" fontWeight="700" fill="var(--clr-accent)" letterSpacing="2">
        270
      </text>

      {/* Payer node */}
      <g transform="translate(310,86)">
        <rect width="160" height="150" rx="14" fill="var(--clr-bg-mid)" stroke="var(--clr-border)" />
        <g transform="translate(80,52)">
          <path
            d="M 0 -26 L 22 -14 L 22 12 C 22 22, 12 30, 0 32 C -12 30, -22 22, -22 12 L -22 -14 Z"
            fill="none"
            stroke="var(--clr-accent)"
            strokeWidth="2"
          />
          <path
            d="M -8 4 L -2 10 L 10 -4"
            stroke="var(--clr-accent)"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text x="80" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--clr-text-primary)" letterSpacing="2">
          PAYER
        </text>
      </g>

      {/* Return arrow */}
      <g stroke="var(--clr-primary)" strokeWidth="2" fill="none">
        <path d="M 298 198 L 222 198" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1.5s" repeatCount="indefinite" />
        </path>
        <polyline points="228,192 216,198 228,204" fill="var(--clr-primary)" stroke="none" />
      </g>
      <text x="228" y="218" fontSize="11" fontWeight="700" fill="var(--clr-primary)" letterSpacing="2">
        271 · ACTIVE
      </text>
    </svg>
  )
}

/* -------------------------------------------------------------- Codes --- */
function CodesArt() {
  // Layout constants — give the verdict panel a clean left-hand gutter.
  const DX_W = 62
  const DX_H = 32
  const MOD_W = 52
  const CHIP_GAP = 10
  const ROW_X = 28
  const PANEL_X = 338
  const PANEL_W = 158
  const SCAN_X = ROW_X - 4
  const SCAN_W = PANEL_X - SCAN_X - 12
  type Chip = { label: string; kind: 'dx' | 'cpt' | 'mod'; x: number; y: number; ok: boolean }
  const chips: Chip[] = [
    // ICD-10
    { label: 'E11.9', kind: 'dx', x: ROW_X + 0 * (DX_W + CHIP_GAP), y: 58, ok: true },
    { label: 'Z79.4', kind: 'dx', x: ROW_X + 1 * (DX_W + CHIP_GAP), y: 58, ok: true },
    { label: 'I10', kind: 'dx', x: ROW_X + 2 * (DX_W + CHIP_GAP), y: 58, ok: true },
    { label: 'O09.1', kind: 'dx', x: ROW_X + 3 * (DX_W + CHIP_GAP), y: 58, ok: false },
    // CPT / HCPCS
    { label: '99213', kind: 'cpt', x: ROW_X + 0 * (DX_W + CHIP_GAP), y: 152, ok: true },
    { label: '36415', kind: 'cpt', x: ROW_X + 1 * (DX_W + CHIP_GAP), y: 152, ok: true },
    { label: '80053', kind: 'cpt', x: ROW_X + 2 * (DX_W + CHIP_GAP), y: 152, ok: true },
    { label: '93000', kind: 'cpt', x: ROW_X + 3 * (DX_W + CHIP_GAP), y: 152, ok: false },
    // Modifiers
    { label: '-25', kind: 'mod', x: ROW_X + 0 * (MOD_W + CHIP_GAP), y: 238, ok: true },
    { label: '-59', kind: 'mod', x: ROW_X + 1 * (MOD_W + CHIP_GAP), y: 238, ok: true },
    { label: '-XU', kind: 'mod', x: ROW_X + 2 * (MOD_W + CHIP_GAP), y: 238, ok: false },
  ]

  return (
    <svg
      viewBox="0 0 520 340"
      className="solution-art"
      role="img"
      aria-label="Diagnosis and procedure codes being validated and bundled"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="codeGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--clr-primary)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="codeScan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--clr-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="520" height="340" rx="22" fill="url(#codeGlow)" />

      {/* Scanner sweep — softly highlights rows left-to-right */}
      <rect
        x={SCAN_X}
        y="44"
        width="38"
        height="248"
        rx="12"
        fill="url(#codeScan)"
        opacity="0.55"
      >
        <animate
          attributeName="x"
          values={`${SCAN_X};${SCAN_X + SCAN_W - 38};${SCAN_X}`}
          dur="6s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
        />
      </rect>

      {/* Row labels */}
      <text x={ROW_X} y="46" fontSize="10" fontWeight="800" letterSpacing="2" fill="var(--clr-text-muted)">
        ICD-10
      </text>
      <text x={ROW_X} y="140" fontSize="10" fontWeight="800" letterSpacing="2" fill="var(--clr-text-muted)">
        CPT / HCPCS
      </text>
      <text x={ROW_X} y="226" fontSize="10" fontWeight="800" letterSpacing="2" fill="var(--clr-text-muted)">
        MODIFIERS
      </text>

      {/* Chips */}
      {chips.map((c, i) => {
        const w = c.kind === 'mod' ? MOD_W : DX_W
        const stroke = c.ok ? 'var(--clr-accent)' : 'var(--clr-accent-warm)'
        const markX = c.x + w - 12
        const markY = c.y + DX_H / 2
        return (
          <g key={`${c.label}-${c.x}-${c.y}`}>
            <rect
              x={c.x}
              y={c.y}
              width={w}
              height={DX_H}
              rx="9"
              fill={stroke}
              fillOpacity="0.14"
              stroke={stroke}
              strokeWidth="1.2"
            >
              {!c.ok && (
                <animate
                  attributeName="fill-opacity"
                  values="0.14;0.26;0.14"
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${0.3 + (i % 4) * 0.15}s`}
                />
              )}
            </rect>
            <text
              x={c.x + w / 2 - 6}
              y={c.y + 21}
              textAnchor="middle"
              fontFamily="ui-monospace, 'SF Mono', monospace"
              fontWeight="700"
              fontSize="11"
              fill={stroke}
            >
              {c.label}
            </text>
            {c.ok ? (
              <path
                d={`M ${markX - 4} ${markY} l 3 3 l 6 -6`}
                stroke={stroke}
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <g>
                <line
                  x1={markX - 5}
                  y1={markY - 5}
                  x2={markX + 5}
                  y2={markY + 5}
                  stroke={stroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1={markX + 5}
                  y1={markY - 5}
                  x2={markX - 5}
                  y2={markY + 5}
                  stroke={stroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        )
      })}

      {/* Verdict panel */}
      <g transform={`translate(${PANEL_X},56)`}>
        <rect
          width={PANEL_W}
          height="228"
          rx="14"
          fill="var(--clr-bg-mid)"
          stroke="var(--clr-border)"
        />
        {/* Breathing accent ring — subtle, indicates the panel is "live" */}
        <rect
          x="-1"
          y="-1"
          width={PANEL_W + 2}
          height="230"
          rx="15"
          fill="none"
          stroke="var(--clr-accent)"
          strokeWidth="1"
          opacity="0.25"
        >
          <animate attributeName="opacity" values="0.08;0.35;0.08" dur="3.6s" repeatCount="indefinite" />
        </rect>

        <text
          x={PANEL_W / 2}
          y="28"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          letterSpacing="2"
          fill="var(--clr-text-muted)"
        >
          VERDICT
        </text>

        {[
          { label: 'Pointer · ok', ok: true, y: 52 },
          { label: 'Bundling · ok', ok: true, y: 90 },
          { label: 'NCCI · block', ok: false, y: 128 },
          { label: 'E\u0026M · ok', ok: true, y: 166 },
        ].map((row, idx) => {
          const color = row.ok ? 'var(--clr-accent)' : 'var(--clr-accent-warm)'
          return (
            <g key={row.label} transform={`translate(16,${row.y})`}>
              <circle cx="10" cy="10" r="10" fill={color} fillOpacity="0.22">
                {!row.ok && (
                  <animate
                    attributeName="fill-opacity"
                    values="0.2;0.45;0.2"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              {row.ok ? (
                <path
                  d="M 5 10 l 3.5 3.5 l 6.5 -6.5"
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <g>
                  <line x1="5" y1="5" x2="15" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="5" x2="5" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
                </g>
              )}
              <text x="30" y="15" fontSize="12" fill="var(--clr-text-primary)">
                {row.label}
              </text>
              {/* Staggered fade-in cue on initial render */}
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.5s"
                begin={`${0.3 + idx * 0.1}s`}
                fill="freeze"
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/* ----------------------------------------------------------- Denials --- */
function DenialsArt() {
  return (
    <svg
      viewBox="0 0 520 340"
      className="solution-art"
      role="img"
      aria-label="A denied claim being triaged into resubmit, appeal, or corrected claim paths"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="denGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-accent-warm, #ff9c9c)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--clr-primary)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="520" height="340" rx="22" fill="url(#denGlow)" />

      {/* Denied claim */}
      <g transform="translate(30,90)">
        <rect width="180" height="180" rx="14" fill="var(--clr-surface)" stroke="var(--clr-border)" />
        <rect x="16" y="22" width="120" height="10" rx="3" fill="var(--clr-text-muted)" opacity="0.6" />
        <rect x="16" y="40" width="80" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.35" />
        <rect x="16" y="60" width="148" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.25" />
        <rect x="16" y="74" width="128" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.25" />
        <rect x="16" y="88" width="138" height="6" rx="2" fill="var(--clr-text-muted)" opacity="0.25" />

        {/* Stamp */}
        <g transform="translate(90,110) rotate(-8)">
          <rect x="-50" y="-18" width="100" height="36" rx="6" fill="none" stroke="var(--clr-accent-warm)" strokeWidth="2.2" />
          <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="800" letterSpacing="3" fill="var(--clr-accent-warm)">
            DENIED
          </text>
        </g>
      </g>

      {/* 3 branch paths — rendered FIRST so the hub disk sits on top of their
          origin, eliminating the visible gap that appears when the paths start
          outside the hub. Each path has an id for traveling pulses below. */}
      {(() => {
        // Chips are anchored on the right side of the viewBox (520 wide).
        // Width / x chosen so the longest hint ("Template + evidence") fits
        // comfortably inside the chip without clipping the border.
        const CHIP_X = 340
        const branches = [
          { id: 'den-branch-0', d: `M 238 170 Q ${CHIP_X - 50} 100, ${CHIP_X} 100`, delay: 0 },
          { id: 'den-branch-1', d: `M 238 170 L ${CHIP_X} 170`, delay: 0.4 },
          { id: 'den-branch-2', d: `M 238 170 Q ${CHIP_X - 50} 240, ${CHIP_X} 240`, delay: 0.8 },
        ]
        return (
          <>
            <defs>
              {branches.map((b) => (
                <path key={b.id} id={b.id} d={b.d} fill="none" />
              ))}
            </defs>

            {/* Visible branch strokes */}
            <g stroke="var(--clr-accent)" strokeWidth="1.8" fill="none" opacity="0.85">
              {branches.map((b) => (
                <path key={`stroke-${b.id}`} d={b.d} />
              ))}
            </g>

            {/* Traveling pulses so the routing feels alive */}
            {branches.map((b) => (
              <g key={`pulse-${b.id}`}>
                <circle r="6" fill="var(--clr-accent)" opacity="0.22">
                  <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${b.delay}s`}>
                    <mpath xlinkHref={`#${b.id}`} />
                  </animateMotion>
                </circle>
                <circle r="3" fill="var(--clr-accent)">
                  <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${b.delay}s`}>
                    <mpath xlinkHref={`#${b.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur="2.8s"
                    repeatCount="indefinite"
                    begin={`${b.delay}s`}
                  />
                </circle>
              </g>
            ))}
          </>
        )
      })()}

      {/* Splitter hub — drawn after the paths so their origin is tucked under */}
      <g transform="translate(238,170)">
        <circle r="18" fill="var(--clr-accent)" opacity="0.2">
          <animate attributeName="r" values="18;22;18" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.22;0.08;0.22" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="10" fill="var(--clr-accent)" />
      </g>

      {/* Action chips — width sized so the longest hint fits inside the border.
          CHIP_X is kept in sync with the branch paths above. */}
      {(() => {
        const CHIP_X = 340
        const CHIP_W = 168
        const items = [
          { y: 78, label: 'Resubmit', hint: 'Clean-claim fix', delay: 0 },
          { y: 148, label: 'Appeal', hint: 'Template + evidence', delay: 0.4 },
          { y: 218, label: 'Correct', hint: 'Corrected claim', delay: 0.8 },
        ]
        return items.map((a) => (
          <g key={a.label} transform={`translate(${CHIP_X},${a.y})`}>
            <rect width={CHIP_W} height="44" rx="10" fill="var(--clr-bg-mid)" stroke="var(--clr-border)" />
            <circle cx="18" cy="22" r="6" fill="var(--clr-accent)">
              <animate
                attributeName="opacity"
                values="0.55;1;0.55"
                dur="2.8s"
                repeatCount="indefinite"
                begin={`${a.delay + 1.2}s`}
              />
            </circle>
            <text x="34" y="20" fontSize="13" fontWeight="700" fill="var(--clr-text-primary)">
              {a.label}
            </text>
            <text x="34" y="36" fontSize="11" fill="var(--clr-text-muted)">
              {a.hint}
            </text>
          </g>
        ))
      })()}
    </svg>
  )
}

/* ------------------------------------------------------ Integrations --- */
function IntegrationsArt() {
  // Hub center + node geometry
  const HUB_X = 260
  const HUB_Y = 170
  const NODE_W = 72
  const NODE_H = 32
  const HUB_R = 46
  const NODE_EDGE_MARGIN = 4

  // Each node picks a "direction" — outgoing (hub → payer, e.g. submissions)
  // or incoming (payer → hub, e.g. acknowledgements). Mixed so the hub looks
  // like live, bidirectional traffic.
  type Dir = 'out' | 'in'
  type Spoke = {
    x: number
    y: number
    label: string
    dir: Dir
    dur: number
    delay: number
    // computed endpoints — the visible line and the pulse motion both run
    // from the hub's perimeter to the node's edge, never *inside* either.
    startX: number
    startY: number
    endX: number
    endY: number
  }

  // Finds the point where the line from hub→nodeCenter exits the node
  // rectangle, then backs off a small margin so the pulse stops just outside.
  function computeEndpoints(x: number, y: number) {
    const cx = x + NODE_W / 2
    const cy = y + NODE_H / 2
    const dx = cx - HUB_X
    const dy = cy - HUB_Y
    const vlen = Math.hypot(dx, dy)
    const f = Math.max(Math.abs(dx) / (NODE_W / 2), Math.abs(dy) / (NODE_H / 2))
    // t is fraction of the full hub→center distance; subtract the node half
    // (1/f of the path) plus a pixel margin so the pulse/line stops short.
    const nodeEndT = 1 - (1 / f + NODE_EDGE_MARGIN / vlen)
    const hubStartT = (HUB_R - 2) / vlen // start just inside the hub ring
    return {
      startX: HUB_X + dx * hubStartT,
      startY: HUB_Y + dy * hubStartT,
      endX: HUB_X + dx * nodeEndT,
      endY: HUB_Y + dy * nodeEndT,
    }
  }

  // Right-side x values mirror the left around the hub (viewBox centre = 260)
  // so each pair sits at an identical distance from its edge of the panel.
  // For a node of width NODE_W (72), mirror(x_left) = VIEWBOX_W - NODE_W - x_left
  // where VIEWBOX_W = 520 → right_x = 448 - left_x.
  const LX_TOP = 56
  const LX_MID = 40
  const LX_BOT = 80
  const rawSpokes = [
    { x: LX_TOP, y: 72, label: 'Aetna', dir: 'out' as Dir, dur: 2.4, delay: 0 },
    { x: 448 - LX_TOP, y: 72, label: 'BCBS', dir: 'in' as Dir, dur: 2.8, delay: 0.4 },
    { x: LX_MID, y: 184, label: 'UHC', dir: 'in' as Dir, dur: 2.2, delay: 0.9 },
    { x: 448 - LX_MID, y: 184, label: 'Cigna', dir: 'out' as Dir, dur: 2.6, delay: 0.2 },
    { x: LX_BOT, y: 282, label: 'Humana', dir: 'out' as Dir, dur: 3.0, delay: 1.1 },
    { x: 448 - LX_BOT, y: 282, label: 'Medicare', dir: 'in' as Dir, dur: 2.6, delay: 0.6 },
  ]
  const spokes: Spoke[] = rawSpokes.map((s) => ({ ...s, ...computeEndpoints(s.x, s.y) }))

  // Pulse color depends on direction — outgoing uses the mint accent (submissions),
  // incoming uses the blue primary (acknowledgements coming back).
  const colorFor = (dir: Dir) => (dir === 'out' ? 'var(--clr-accent)' : 'var(--clr-primary)')

  return (
    <svg
      viewBox="0 0 520 340"
      className="solution-art"
      role="img"
      aria-label="A canonical hub sending and receiving data across payer endpoints"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="intGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="intBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--clr-primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0.02" />
        </linearGradient>

        {/* One path per spoke — from the hub's perimeter to just outside the
            payer node's edge. The traveling pulses follow these paths so they
            never cross the label text. */}
        {spokes.map((s, i) => (
          <path
            key={`def-${s.label}`}
            id={`int-spoke-${i}`}
            d={`M ${s.startX} ${s.startY} L ${s.endX} ${s.endY}`}
            fill="none"
          />
        ))}
      </defs>

      <rect width="520" height="340" rx="22" fill="url(#intBg)" />
      <circle cx={HUB_X} cy={HUB_Y} r="140" fill="url(#intGlow)" />

      {/* Spoke lines — dashed stroke with offset animation to give a flowing feel.
          Lines stop at the node edge so they never overlap the label text. */}
      {spokes.map((s, i) => {
        const color = colorFor(s.dir)
        return (
          <g key={`line-${s.label}`}>
            <line
              x1={s.startX}
              y1={s.startY}
              x2={s.endX}
              y2={s.endY}
              stroke={color}
              strokeWidth="1.3"
              strokeDasharray="4 6"
              opacity="0.45"
              fill="none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from={s.dir === 'out' ? '20' : '0'}
                to={s.dir === 'out' ? '0' : '20'}
                dur={`${s.dur * 0.6}s`}
                repeatCount="indefinite"
                begin={`${s.delay}s`}
              />
            </line>

            {/* Traveling pulse — small dot that runs along the spoke to show
                an actual payload in transit. keyPoints reverses direction for
                'in' spokes. */}
            <circle r="3.2" fill={color}>
              <animateMotion
                dur={`${s.dur}s`}
                repeatCount="indefinite"
                begin={`${s.delay}s`}
                calcMode="linear"
                keyPoints={s.dir === 'out' ? '0;1' : '1;0'}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#int-spoke-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.88;1"
                dur={`${s.dur}s`}
                repeatCount="indefinite"
                begin={`${s.delay}s`}
              />
            </circle>

            {/* Soft glow halo behind the pulse for a brighter trail */}
            <circle r="6" fill={color} opacity="0.18">
              <animateMotion
                dur={`${s.dur}s`}
                repeatCount="indefinite"
                begin={`${s.delay}s`}
                calcMode="linear"
                keyPoints={s.dir === 'out' ? '0;1' : '1;0'}
                keyTimes="0;1"
              >
                <mpath xlinkHref={`#int-spoke-${i}`} />
              </animateMotion>
            </circle>
          </g>
        )
      })}

      {/* Payer nodes */}
      {spokes.map((s, i) => {
        const color = colorFor(s.dir)
        return (
          <g key={s.label} transform={`translate(${s.x},${s.y})`}>
            <rect width={NODE_W} height={NODE_H} rx="9" fill="var(--clr-surface)" stroke="var(--clr-border)" />
            <text x={NODE_W / 2} y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--clr-text-primary)">
              {s.label}
            </text>
            {/* Status dot — parked in the top-right corner so it never sits on
                the label text. Pulses softly to show the link is live. */}
            <circle cx={NODE_W - 8} cy={6} r="2.6" fill={color} opacity="0.85">
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur={`${2 + (i % 3) * 0.6}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )
      })}

      {/* Central hub — breathing accent ring + inner dot */}
      <g transform={`translate(${HUB_X},${HUB_Y})`}>
        <circle r="46" fill="var(--clr-bg-mid)" stroke="var(--clr-border)" />
        <circle r="30" fill="none" stroke="var(--clr-accent)" strokeWidth="1.4" opacity="0.6">
          <animate attributeName="r" values="30;36;30" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="12" fill="var(--clr-accent)">
          <animate attributeName="r" values="12;14;12" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <text y="64" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="2" fill="var(--clr-text-primary)">
          CANONICAL
        </text>
      </g>

      {/* Direction legend — small pills in the top-right so viewers decode the
          two pulse colors ("OUT" = submissions, "IN" = acknowledgements). */}
      <g transform="translate(370,14)">
        <g transform="translate(0,0)">
          <rect width="62" height="20" rx="10" fill="var(--clr-surface)" stroke="var(--clr-border)" />
          <circle cx="10" cy="10" r="3" fill="var(--clr-accent)" />
          <text x="36" y="14" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="2" fill="var(--clr-text-primary)">
            OUT
          </text>
        </g>
        <g transform="translate(72,0)">
          <rect width="62" height="20" rx="10" fill="var(--clr-surface)" stroke="var(--clr-border)" />
          <circle cx="10" cy="10" r="3" fill="var(--clr-primary)" />
          <text x="36" y="14" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="2" fill="var(--clr-text-primary)">
            IN
          </text>
        </g>
      </g>
    </svg>
  )
}
