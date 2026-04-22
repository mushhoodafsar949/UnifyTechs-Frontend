import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient bar pinned to the very top of the viewport that tracks document scroll progress.
 * Uses framer's `useScroll` + spring so it glides smoothly instead of jumping on wheel ticks.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.18,
    restDelta: 0.002,
  })

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden
      role="presentation"
    />
  )
}
