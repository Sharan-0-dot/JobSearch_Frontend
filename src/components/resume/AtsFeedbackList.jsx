export default function AtsFeedbackList({ feedback }) {
  if (!feedback || feedback.length === 0) return null

  return (
    <div>
      <h3 className="font-body text-caption font-medium text-ink-muted mb-2">ATS feedback</h3>
      <ul className="flex flex-col gap-1.5">
        {feedback.map((item, i) => (
          <li key={i} className="font-body text-body text-ink flex gap-2">
            <span className="text-warn">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}