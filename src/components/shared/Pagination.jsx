import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, onPageChange }) {
  if (!page) return null
  const { number, totalPages } = page

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={() => onPageChange(number - 1)}
        disabled={number <= 0}
        className="p-1.5 rounded-md border border-border text-ink-muted disabled:opacity-30 hover:border-accent hover:text-ink transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="font-mono text-caption text-ink-muted">
        Page {number + 1} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(number + 1)}
        disabled={number >= totalPages - 1}
        className="p-1.5 rounded-md border border-border text-ink-muted disabled:opacity-30 hover:border-accent hover:text-ink transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}