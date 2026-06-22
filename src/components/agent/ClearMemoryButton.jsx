import { Trash2 } from 'lucide-react'
import Button from '../shared/Button'

export default function ClearMemoryButton({ onClear, disabled }) {
  return (
    <Button variant="ghost" onClick={onClear} disabled={disabled} className="px-2 py-1">
      <Trash2 size={14} />
      <span className="font-body text-caption">Clear memory</span>
    </Button>
  )
}