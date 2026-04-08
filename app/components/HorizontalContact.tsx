import { useState, useEffect, type ReactNode } from 'react'
import Toast from './Toast'

interface HorizontalContactItem {
  icon: ReactNode
  label: string
  value: string
  href?: string
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
        {items.map((item, index) =>
          item.href ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
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
            </a>
          ) : (
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
          )
        )}
      </div>

      <Toast
        message="Copié !"
        visible={toastVisible}
        duration={TOAST_DURATION}
        animationKey={toastKey}
        onClose={() => setToastVisible(false)}
      />
    </>
  )
}
