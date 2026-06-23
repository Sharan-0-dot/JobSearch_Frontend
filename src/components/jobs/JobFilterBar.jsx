import { useState } from 'react'
import { Search } from 'lucide-react'
import Button from '../shared/Button'

const filterTypes = [
  { key: 'keyword', label: 'Keyword' },
  { key: 'location', label: 'Location' },
  { key: 'company', label: 'Company' },
  { key: 'type', label: 'Job type' },
]

export default function JobFilterBar({ onFilter, onClear }) {
  const [activeFilter, setActiveFilter] = useState('keyword')
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onFilter(activeFilter, trimmed)
  }

  const handleClear = () => {
    setValue('')
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-4">
      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
        className="px-2.5 py-2 rounded-md border border-border bg-surface font-body text-caption text-ink-muted
                   focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {filterTypes.map((f) => (
          <option key={f.key} value={f.key}>{f.label}</option>
        ))}
      </select>
      <div className="relative flex-1 min-w-45">
        <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter jobs…"
          className="w-full pl-8 pr-3 py-2 rounded-md border border-border bg-surface
                     font-body text-body text-ink placeholder:text-ink-muted
                     focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <Button type="submit" variant="secondary">Filter</Button>
      {value && (
        <Button type="button" variant="ghost" onClick={handleClear}>Clear</Button>
      )}
    </form>
  )
}