export default function Card({ children, className = '', onClick, hoverable = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border rounded-lg p-4
                  ${hoverable ? 'cursor-pointer transition-colors hover:border-accent' : ''}
                  ${className}`}
    >
      {children}
    </div>
  )
}