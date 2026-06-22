import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../shared/Button'

export default function ChatInputBar({ onSend, disabled }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-surface px-4 py-3 flex items-end gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about jobs, e.g. 'remote backend roles in Pune'"
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none px-3 py-2 rounded-md border border-border bg-bg
                   font-body text-body text-ink placeholder:text-ink-muted
                   focus:outline-none focus:ring-2 focus:ring-accent
                   max-h-32"
      />
      <Button type="submit" disabled={!value.trim() || disabled}>
        <Send size={16} />
        Send
      </Button>
    </form>
  )
}