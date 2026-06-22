import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <h1 className="font-display text-display text-ink">Page not found</h1>
      <Link to="/" className="font-body text-body text-accent hover:underline">
        Back to agent
      </Link>
    </div>
  )
}