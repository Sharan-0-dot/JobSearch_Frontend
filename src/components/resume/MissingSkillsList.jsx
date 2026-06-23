import SkillTag from '../shared/SkillTag'

export default function MissingSkillsList({ skills }) {
  if (!skills || skills.length === 0) return null

  return (
    <div>
      <h3 className="font-body text-caption font-medium text-ink-muted mb-2">Missing skills</h3>
      <div className="flex gap-1.5 flex-wrap">
        {skills.map((skill) => <SkillTag key={skill} skill={skill} variant="missing" />)}
      </div>
    </div>
  )
}