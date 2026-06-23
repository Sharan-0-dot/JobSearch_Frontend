export function scoreColor(score) {
  if (score == null) return 'muted'
  if (score > 70) return 'accent'
  if (score >= 40) return 'warn'
  return 'muted'
}

export const scoreColorClasses = {
  accent: { stroke: 'stroke-accent', text: 'text-accent', bg: 'bg-accent-soft' },
  warn: { stroke: 'stroke-warn', text: 'text-warn', bg: 'bg-warn-soft' },
  muted: { stroke: 'stroke-ink-muted', text: 'text-ink-muted', bg: 'bg-bg' },
}