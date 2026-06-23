export default function ResumeFeedbackText({ feedback }) {
  if (!feedback) return null

  return (
    <div>
      <h3 className="font-body text-caption font-medium text-ink-muted mb-2">Feedback</h3>
      <p className="font-body text-body text-ink whitespace-pre-line">{feedback}</p>
    </div>
  )
}