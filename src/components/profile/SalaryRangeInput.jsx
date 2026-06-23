export default function SalaryRangeInput({ min, max, onMinChange, onMaxChange }) {
  return (
    <div>
      <label className="font-body text-caption font-medium text-ink-muted block mb-1.5">
        Expected salary range
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={min ?? ''}
          onChange={(e) => onMinChange(e.target.value === '' ? undefined : Number(e.target.value))}
          placeholder="Min"
          className="w-full px-3 py-2 rounded-md border border-border bg-surface
                     font-mono text-body text-ink placeholder:text-ink-muted
                     focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <span className="font-body text-body text-ink-muted">–</span>
        <input
          type="number"
          value={max ?? ''}
          onChange={(e) => onMaxChange(e.target.value === '' ? undefined : Number(e.target.value))}
          placeholder="Max"
          className="w-full px-3 py-2 rounded-md border border-border bg-surface
                     font-mono text-body text-ink placeholder:text-ink-muted
                     focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  )
}