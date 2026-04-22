import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowRightLeft,
  BadgeCheck,
  Bell,
  CheckCircle2,
  Clock,
  FileJson,
  FileOutput,
  FileSearch,
  FileText,
  Inbox,
  Layers,
  Link2,
  List,
  Mail,
  Network,
  Plug2,
  RefreshCw,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  SplitSquareHorizontal,
  Stethoscope,
  Tags,
  Upload,
  UserSearch,
  type LucideIcon,
} from 'lucide-react'
import type { ProcessStep, SolutionIconId } from '../data/solutions'

const ICON_MAP: Record<SolutionIconId, LucideIcon> = {
  scan: ScanLine,
  scroll: FileSearch,
  shield: ShieldCheck,
  send: Send,
  inbox: Inbox,
  search: Search,
  userSearch: UserSearch,
  badgeCheck: BadgeCheck,
  bell: Bell,
  list: List,
  link: Link2,
  layers: Layers,
  stethoscope: Stethoscope,
  check: CheckCircle2,
  mail: Mail,
  tag: Tags,
  split: SplitSquareHorizontal,
  fileText: FileText,
  fileJson: FileJson,
  plug: Plug2,
  arrows: ArrowRightLeft,
  clock: Clock,
  upload: Upload,
  fileOutput: FileOutput,
  network: Network,
  refresh: RefreshCw,
}

type Props = {
  steps: ProcessStep[]
  heading: string
  lede?: string
}

export function SolutionProcessFlow({ steps, heading, lede }: Props) {
  return (
    <div className="solution-flow">
      <header className="solution-flow__head">
        <span className="solution-flow__eyebrow">THE PIPELINE</span>
        <h2>{heading}</h2>
        {lede && <p>{lede}</p>}
      </header>

      <ol className="solution-flow__track" role="list">
        {steps.map((step, i) => {
          const Icon = ICON_MAP[step.icon] ?? CheckCircle2
          return (
            <motion.li
              key={step.title}
              className="solution-flow__step"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <div className="solution-flow__step-inner">
                <span className="solution-flow__step-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="solution-flow__step-icon" aria-hidden>
                  <Icon size={22} />
                </div>
                <h3 className="solution-flow__step-title">{step.title}</h3>
                <p className="solution-flow__step-body">{step.body}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="solution-flow__connector" aria-hidden>
                  <ArrowRight size={16} />
                </span>
              )}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
