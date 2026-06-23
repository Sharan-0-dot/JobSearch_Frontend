import { CheckCircle2 } from 'lucide-react'
import SkillTag from '../shared/SkillTag'

export default function ExtractedSkillsPreview({ result }) {
  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex items-center gap-2 text-accent">
        <CheckCircle2 size={18} />
        <p className="font-body text-body font-medium text-ink">{result.message}</p>
      </div>
      <p className="font-body text-caption text-ink-muted">
        {result.filename} · {result.skillCount} skill{result.skillCount === 1 ? '' : 's'} found
      </p>
      {result.extractedSkills?.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {result.extractedSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} variant="matched" />
          ))}
        </div>
      )}
    </div>
  )
}