import { useEffect, useRef, useState } from 'react'
import { scoreColor, scoreColorClasses } from '../../utils/scoreColor'

export default function MatchRing({ score, size = 40 }) {
  const colorKey = scoreColor(score)
  const colors = scoreColorClasses[colorKey]

  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const [animatedScore, setAnimatedScore] = useState(0)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (score == null) {
      setAnimatedScore(0)
      return
    }
    if (prefersReducedMotion.current) {
      setAnimatedScore(score)
      return
    }
    // animate from 0 to score on mount
    const start = performance.now()
    const duration = 400
    let raf
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 2)
      setAnimatedScore(Math.round(eased * score))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  if (score == null) {
    return (
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
        title="Not yet scored"
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            strokeWidth="3"
            strokeDasharray="3 4"
            className="stroke-border"
          />
        </svg>
        <span className="absolute font-mono text-caption text-ink-muted">—</span>
      </div>
    )
  }

  const dashOffset = circumference * (1 - animatedScore / 100)

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          strokeWidth="3"
          className="stroke-border"
        />
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${center} ${center})`}
          className={colors.stroke}
        />
      </svg>
      <span className={`absolute font-mono text-score font-medium ${colors.text}`} style={{ fontSize: size * 0.28 }}>
        {animatedScore}
      </span>
    </div>
  )
}