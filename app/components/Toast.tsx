import { Check, X } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
  duration: number
  animationKey: number
  onClose: () => void
}

export default function Toast({ message, visible, duration, animationKey, onClose }: ToastProps) {
  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 w-64 bg-gray-100 text-black shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Check size={14} strokeWidth={1.5} className="text-black shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-black transition-colors ml-4 shrink-0"
          aria-label="Fermer"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 bg-gray-200">
        <div
          key={animationKey}
          className="h-full bg-gray-400"
          style={{ animation: `toast-progress ${duration}ms linear forwards` }}
        />
      </div>
    </div>
  )
}
