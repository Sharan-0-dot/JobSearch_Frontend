import { useUser } from '../../context/UserContext'

export default function TopBar({ title }) {
  const { userId, clearUser } = useUser()

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-border bg-bg">
      <h1 className="font-body text-body font-medium text-ink">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="font-mono text-caption text-ink-muted">{userId}</span>
        <button
          onClick={clearUser}
          className="font-body text-caption text-ink-muted hover:text-ink underline-offset-2 hover:underline"
        >
          Switch user
        </button>
      </div>
    </header>
  )
}