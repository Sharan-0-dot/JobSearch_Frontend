import { useState, useCallback } from 'react'
import { ThumbsUp, CheckCircle } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../hooks/useToast'
import { submitFeedback } from '../../api/feedbackApi'

export default function JobFeedbackControls({ jobId }) {
  const { userId } = useUser()
  const { showToast } = useToast()
  const [liked, setLiked] = useState(false)
  const [applied, setApplied] = useState(false)
  const [submitting, setSubmitting] = useState(null)

  const fire = useCallback(async (field, value) => {
    setSubmitting(field)
    try {
      await submitFeedback({ userId, jobId, [field]: value })
      showToast(field === 'liked' ? (value ? 'Marked as liked' : 'Removed like') : (value ? 'Marked as applied' : 'Unmarked applied'))
    } catch (err) {
      showToast(err.message || 'Could not save feedback', 'error')
      if (field === 'liked') setLiked((prev) => !prev)
      if (field === 'applied') setApplied((prev) => !prev)
    } finally {
      setSubmitting(null)
    }
  }, [userId, jobId, showToast])

  const toggleLiked = () => {
    const next = !liked
    setLiked(next)
    fire('liked', next)
  }

  const toggleApplied = () => {
    const next = !applied
    setApplied(next)
    fire('applied', next)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleLiked}
        disabled={submitting === 'liked'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-body text-caption transition-colors
          ${liked ? 'bg-accent-soft border-accent text-accent' : 'border-border text-ink-muted hover:text-ink'}`}
      >
        <ThumbsUp size={14} />
        {liked ? 'Liked' : 'Like'}
      </button>
      <button
        onClick={toggleApplied}
        disabled={submitting === 'applied'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-body text-caption transition-colors
          ${applied ? 'bg-accent-soft border-accent text-accent' : 'border-border text-ink-muted hover:text-ink'}`}
      >
        <CheckCircle size={14} />
        {applied ? 'Applied' : 'Mark applied'}
      </button>
    </div>
  )
}