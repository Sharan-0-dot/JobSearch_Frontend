import { useState } from 'react'
import { X } from 'lucide-react'

export default function SkillsInput({ label, values, onChange, placeholder }) {
  const [draft, setDraft] = useState('')

  const addValue = () => {
    const trimmed = draft.trim()
    if (!trimmed || values.includes(trimmed)) {
      setDraft('')
      return
    }
    onChange([...values, trimmed])
    setDraft('')
  }

  const removeValue = (value) => {
    onChange(values.filter((v) => v !== value))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addValue()
    }
  }

  return (
    <div>
      <label className="font-body text-caption font-medium text-ink-muted block mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5 p-2 rounded-md border border-border bg-surface focus-within:ring-2 focus-within:ring-accent">
        {values.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-soft text-accent font-mono text-caption"
          >
            {value}
            <button type="button" onClick={() => removeValue(value)} className="hover:text-ink">
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addValue}
          placeholder={values.length === 0 ? placeholder : ''}
          className="flex-1 min-w-30 bg-transparent font-body text-body text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </div>
    </div>
  )
}