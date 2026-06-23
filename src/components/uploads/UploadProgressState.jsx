import Spinner from '../shared/Spinner'

export default function UploadProgressState({ filename }) {
  return (
    <div className="flex items-center gap-3 py-6 px-4">
      <Spinner size={20} className="text-accent" />
      <div>
        <p className="font-body text-body text-ink">Uploading {filename}…</p>
        <p className="font-body text-caption text-ink-muted">Extracting text and parsing skills</p>
      </div>
    </div>
  )
}