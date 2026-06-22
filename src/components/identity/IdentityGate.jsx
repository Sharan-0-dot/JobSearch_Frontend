import { useState } from 'react'
import { useUser } from '../../context/UserContext'

export default function IdentityGate({ children }) {
  const { userId, setUser } = useUser()
  const [input, setInput] = useState('')

  if (userId) {
    return children
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setUser(trimmed)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-display text-ink mb-2">
          Job Search Agent
        </h1>
        <p className="font-body text-body text-ink-muted mb-6">
          Enter a username to continue. No password needed.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. sharan-001"
            autoFocus
            className="w-full px-3 py-2 rounded-md border border-border bg-surface
                       font-body text-body text-ink placeholder:text-ink-muted
                       focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full px-3 py-2 rounded-md bg-accent text-surface
                       font-body text-body font-medium
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-accent/90 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}