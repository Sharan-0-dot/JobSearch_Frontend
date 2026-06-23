export default function SuggestedImprovementsList({ improvements }) {
  if (!improvements || improvements.length === 0) return null

  return (
    <div>
      <h3 className="font-body text-caption font-medium text-ink-muted mb-2">Suggested improvements</h3>
      <ul className="flex flex-col gap-1.5">
        {improvements.map((item, i) => (
          <li key={i} className="font-body text-body text-ink flex gap-2">
            <span className="text-accent">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}