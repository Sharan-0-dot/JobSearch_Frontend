import { scoreColor, scoreColorClasses } from '../../utils/scoreColor'

export default function ScoreBadge({ score }) {
  const colorKey = scoreColor(score)
  const colors = scoreColorClasses[colorKey]

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-caption font-medium ${colors.bg} ${colors.text}`}>
      {score == null ? '—' : score}
    </span>
  )
}