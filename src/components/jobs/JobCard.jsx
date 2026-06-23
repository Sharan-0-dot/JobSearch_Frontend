import { useNavigate } from 'react-router-dom'
import { MapPin, Building2 } from 'lucide-react'
import MatchRing from '../shared/MatchRing'
import SkillTag from '../shared/SkillTag'

export default function JobCard({ job }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-surface border border-border rounded-lg p-4 cursor-pointer
                 transition-colors hover:border-accent flex gap-4"
    >
      <MatchRing score={null} />
      <div className="flex-1 min-w-0">
        <h3 className="font-body text-body font-medium text-ink truncate">{job.title}</h3>
        <div className="flex items-center gap-3 mt-1 text-ink-muted">
          <span className="flex items-center gap-1 font-body text-caption">
            <Building2 size={13} /> {job.company}
          </span>
          <span className="flex items-center gap-1 font-body text-caption">
            <MapPin size={13} /> {job.location}
          </span>
        </div>
        {job.skills?.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {job.skills.slice(0, 4).map((skill) => (
              <SkillTag key={skill} skill={skill} variant="matched" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}