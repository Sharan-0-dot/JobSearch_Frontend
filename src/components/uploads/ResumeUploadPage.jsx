import { useState, useCallback } from 'react'
import { useUser } from '../../context/UserContext'
import { uploadResume } from '../../api/resumeApi'
import { useToast } from '../../hooks/useToast'
import ResumeDropzone from './ResumeDropzone'
import UploadProgressState from './UploadProgressState'
import ExtractedSkillsPreview from './ExtractedSkillsPreview'
import ErrorState from '../shared/ErrorState'
import Button from '../shared/Button'

export default function ResumeUploadPage() {
  const { userId } = useUser()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const handleFileSelected = useCallback(async (selectedFile) => {
    setFile(selectedFile)
    setError(null)
    setResult(null)
    setUploading(true)
    try {
      const res = await uploadResume(userId, selectedFile)
      setResult(res)
      showToast('Resume uploaded and processed')
    } catch (err) {
      setError(err)
    } finally {
      setUploading(false)
    }
  }, [userId])

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="font-display text-display text-ink mb-1">Upload resume</h1>
      <p className="font-body text-body text-ink-muted mb-6">
        We'll extract your skills and use them to match and rank jobs.
      </p>

      {uploading && <UploadProgressState filename={file?.name} />}

      {!uploading && error && (
        <div className="flex flex-col gap-3">
          <ErrorState error={error} onRetry={handleReset} />
        </div>
      )}

      {!uploading && !error && result && (
        <div className="flex flex-col gap-4">
          <ExtractedSkillsPreview result={result} />
          <Button variant="secondary" onClick={handleReset}>Upload another</Button>
        </div>
      )}

      {!uploading && !result && !error && (
        <ResumeDropzone onFileSelected={handleFileSelected} disabled={uploading} />
      )}
    </div>
  )
}