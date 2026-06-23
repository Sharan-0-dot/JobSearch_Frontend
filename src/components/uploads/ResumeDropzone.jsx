import { useState, useRef, useCallback } from 'react'
import { UploadCloud, FileText } from 'lucide-react'

const ACCEPTED_TYPES = ['.pdf', '.doc', '.docx']

function isAcceptedFile(file) {
  const name = file.name.toLowerCase()
  return ACCEPTED_TYPES.some((ext) => name.endsWith(ext))
}

export default function ResumeDropzone({ onFileSelected, disabled }) {
  const [isDragging, setIsDragging] = useState(false)
  const [rejectedMessage, setRejectedMessage] = useState(null)
  const inputRef = useRef(null)

  const handleFiles = useCallback((files) => {
    const file = files[0]
    if (!file) return
    if (!isAcceptedFile(file)) {
      setRejectedMessage('Only PDF, DOC, or DOCX files are supported.')
      return
    }
    setRejectedMessage(null)
    onFileSelected(file)
  }, [onFileSelected])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    handleFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e) => {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); !disabled && setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 px-6 py-12 rounded-lg border-2 border-dashed
                    cursor-pointer transition-colors text-center
                    ${isDragging ? 'border-accent bg-accent-soft' : 'border-border bg-surface'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent'}`}
      >
        {isDragging ? (
          <FileText size={28} className="text-accent" />
        ) : (
          <UploadCloud size={28} className="text-ink-muted" />
        )}
        <p className="font-body text-body text-ink">
          Drag a resume here, or <span className="text-accent underline">browse</span>
        </p>
        <p className="font-body text-caption text-ink-muted">PDF, DOC, or DOCX</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
      </div>
      {rejectedMessage && (
        <p className="font-body text-caption text-danger mt-2">{rejectedMessage}</p>
      )}
    </div>
  )
}