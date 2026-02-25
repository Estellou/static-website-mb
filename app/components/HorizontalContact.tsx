import { useState, useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface HorizontalContactItem {
  icon: ReactNode
  label: string
  value: string
}

interface HorizontalContactProps {
  items: HorizontalContactItem[]
}

const TOAST_DURATION = 5000

export default function HorizontalContact({ items }: HorizontalContactProps) {
  const [toastVisible, setToastVisible] = useState(false)
  const [toastKey, setToastKey] = useState(0)

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setToastKey((k) => k + 1)
      setToastVisible(true)
    })
  }

  useEffect(() => {
    if (!toastVisible) return
    const timer = setTimeout(() => setToastVisible(false), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toastKey])

  return (
    <>
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleCopy(item.value)}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="text-gray-400 group-hover:text-black transition-colors">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{item.label}</span>
              <span className="text-sm font-bold text-black group-hover:underline">
                {item.value}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-4 right-4 z-50 w-64 bg-gray-700 text-white shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">Copié !</span>
            <button
              onClick={() => setToastVisible(false)}
              className="text-gray-300 hover:text-white transition-colors ml-4"
              aria-label="Fermer"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-0.5 bg-gray-600">
            <div
              key={toastKey}
              className="h-full bg-white"
              style={{ animation: `toast-progress ${TOAST_DURATION}ms linear forwards` }}
            />
          </div>
        </div>
      )}
    </>
  )
}
