export default function ToolsUsedTag({ tools }) {
  if (!tools || tools.length === 0) return null

  return (
    <div className="flex items-center gap-1.5 mt-2">
      <span className="font-body text-caption text-ink-muted">Used:</span>
      {tools.map((tool) => (
        <span
          key={tool}
          className="font-mono text-caption px-1.5 py-0.5 rounded bg-accent-soft text-accent"
        >
          {tool}
        </span>
      ))}
    </div>
  )
}