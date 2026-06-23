import MatchRing from '../shared/MatchRing'

export default function MatchScoreSummary({ matchScore }) {
  return (
    <div className="flex items-center gap-4">
      <MatchRing score={matchScore} size={64} />
      <div>
        <p className="font-display text-display text-ink">{matchScore}</p>
        <p className="font-body text-caption text-ink-muted">Resume match score</p>
      </div>
    </div>
  )
}