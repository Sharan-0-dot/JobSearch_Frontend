export default function ErrorState({ error, onRetry }) {
  const message = error?.message || 'Something went wrong. Try again.'

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-2">
      <p className="font-body text-body font-medium text-danger">{error?.error || 'Error'}</p>
      <p className="font-body text-caption text-ink-muted max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 font-body text-caption text-accent hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  )
}