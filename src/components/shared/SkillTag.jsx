export default function SkillTag({ skill, variant = 'matched' }) {
  const styles = variant === 'matched'
    ? 'bg-accent-soft text-accent'
    : 'bg-warn-soft text-warn'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-caption ${styles}`}>
      {skill}
    </span>
  )
}