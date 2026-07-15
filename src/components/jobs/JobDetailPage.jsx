import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Building2, ExternalLink } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { useUser } from '../../context/UserContext'
import { getJobById } from '../../api/jobsApi'
import { getResumeAnalysis, analyzeResume } from '../../api/resumeApi'
import MatchRing from '../shared/MatchRing'
import SkillTag from '../shared/SkillTag'
import Spinner from '../shared/Spinner'
import ErrorState from '../shared/ErrorState'
import Button from '../shared/Button'
import AnalyzeResumeButton from './AnalyzeResumeButton'
import ResumeAnalysisPanel from '../resume/ResumeAnalysisPanel'
import JobFeedbackControls from './JobFeedbackControls'

export default function JobDetailPage() {
  const { id } = useParams()
  const { userId } = useUser()
  const navigate = useNavigate()
  const { data: job, loading, error, refetch } = useApi(() => getJobById(id), [id])

  const [analysis, setAnalysis] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState(null)

  useEffect(() => {
    let active = true
    setAnalysisLoading(true)
    getResumeAnalysis(id, userId)
      .then((data) => active && setAnalysis(data))
      .catch(() => active && setAnalysis(null))
      .finally(() => active && setAnalysisLoading(false))
    return () => { active = false }
  }, [id, userId])

  const handleAnalyze = useCallback(async () => {
    setAnalyzing(true)
    setAnalyzeError(null)
    try {
      const result = await analyzeResume(id, userId)
      setAnalysis(result)
    } catch (err) {
      setAnalyzeError(err)
    } finally {
      setAnalyzing(false)
    }
  }, [id, userId])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={24} className="text-ink-muted" />
      </div>
    )
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  if (!job) return null

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/app/jobs')}
        className="flex items-center gap-1.5 font-body text-caption text-ink-muted hover:text-ink mb-4"
      >
        <ArrowLeft size={14} /> Back to jobs
      </button>

      <div className="flex items-start gap-4 mb-6">
        <MatchRing score={null} size={56} />
        <div className="flex-1">
          <h1 className="font-display text-display text-ink">{job.title}</h1>
          <div className="flex items-center gap-3 mt-1 text-ink-muted">
            <span className="flex items-center gap-1 font-body text-body">
              <Building2 size={14} /> {job.company}
            </span>
            <span className="flex items-center gap-1 font-body text-body">
              <MapPin size={14} /> {job.location}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {job.employmentType && (
              <span className="font-body text-caption px-2 py-0.5 rounded bg-bg text-ink-muted border border-border">
                {job.employmentType}
              </span>
            )}
            {job.remoteStatus && (
              <span className="font-body text-caption px-2 py-0.5 rounded bg-bg text-ink-muted border border-border">
                {job.remoteStatus}
              </span>
            )}
            {job.experienceLevel && (
              <span className="font-body text-caption px-2 py-0.5 rounded bg-bg text-ink-muted border border-border">
                {job.experienceLevel}
              </span>
            )}
          </div>
        </div>
      </div>

      {job.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="font-body text-caption font-medium text-ink-muted mb-2">Skills</h2>
          <div className="flex gap-1.5 flex-wrap">
            {job.skills.map((skill) => <SkillTag key={skill} skill={skill} variant="matched" />)}
          </div>
        </div>
      )}

      {job.description && (
        <div className="mb-6">
          <h2 className="font-body text-caption font-medium text-ink-muted mb-2">Description</h2>
          <p className="font-body text-body text-ink whitespace-pre-line">{job.description}</p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        {job.applyLink && job.isApplyLinkValid && (
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
            <Button>
              Apply <ExternalLink size={14} />
            </Button>
          </a>
        )}
        <JobFeedbackControls jobId={job.id} />
      </div>

      <div className="border-t border-border pt-6">
        {analysisLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size={20} className="text-ink-muted" />
          </div>
        ) : analysis ? (
          <ResumeAnalysisPanel analysis={analysis} />
        ) : (
          <div className="flex flex-col items-start gap-2">
            <p className="font-body text-body text-ink-muted">
              See how your resume matches this role.
            </p>
            <AnalyzeResumeButton onAnalyze={handleAnalyze} loading={analyzing} />
            {analyzeError && (
              <p className="font-body text-caption text-danger">
                {analyzeError.message || 'Could not analyze resume. Try again.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}