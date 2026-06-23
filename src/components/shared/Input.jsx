export default function Input({ label, ...rest }) {
  return (
    <div>
      {label && (
        <label className="font-body text-caption font-medium text-ink-muted block mb-1.5">{label}</label>
      )}
      <input
        {...rest}
        className="w-full px-3 py-2 rounded-md border border-border bg-surface
                   font-body text-body text-ink placeholder:text-ink-muted
                   focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  )
}