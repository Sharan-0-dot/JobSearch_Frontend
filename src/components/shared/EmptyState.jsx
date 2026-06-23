export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-2">
      <p className="font-body text-body font-medium text-ink">{title}</p>
      {description && (
        <p className="font-body text-caption text-ink-muted max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}