const variants = {
  primary: 'bg-accent text-surface hover:bg-accent/90',
  secondary: 'bg-accent-soft text-accent hover:bg-accent-soft/70',
  ghost: 'bg-transparent text-ink-muted hover:bg-bg hover:text-ink',
  danger: 'bg-danger text-surface hover:bg-danger/90',
}

export default function Button({
  variant = 'primary',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md
                  font-body text-body font-medium transition-colors
                  disabled:opacity-40 disabled:cursor-not-allowed
                  ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}