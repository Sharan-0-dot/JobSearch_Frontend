import Button from '../shared/Button'
import Spinner from '../shared/Spinner'

export default function AnalyzeResumeButton({ onAnalyze, loading }) {
  return (
    <Button onClick={onAnalyze} disabled={loading}>
      {loading ? <Spinner size={14} /> : null}
      Analyze resume
    </Button>
  )
}