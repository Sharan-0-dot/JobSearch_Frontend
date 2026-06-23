import { useToast } from '../../hooks/useToast'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

const variantStyles = {
  success: { bg: 'bg-surface border-accent/30', icon: CheckCircle2, iconColor: 'text-accent' },
  error: { bg: 'bg-surface border-danger/30', icon: AlertCircle, iconColor: 'text-danger' },
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {toasts.map((toast) => {
        const style = variantStyles[toast.variant] || variantStyles.success
        const Icon = style.icon
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md border shadow-sm
                        font-body text-body text-ink animate-toast-in ${style.bg}`}
          >
            <Icon size={16} className={style.iconColor} />
            <span>{toast.message}</span>
            <button onClick={() => dismissToast(toast.id)} className="text-ink-muted hover:text-ink ml-1">
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}