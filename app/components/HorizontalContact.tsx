import { useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface HorizontalContactItem {
  icon: ReactNode
  label: string
  value: string
}

interface HorizontalContactProps {
  items: HorizontalContactItem[]
}

export default function HorizontalContact({ items }: HorizontalContactProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleCopy(item.value, index)}
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
          <div className="ml-1 text-gray-400">
            {copiedIndex === index
              ? <Check size={14} strokeWidth={1.5} className="text-green-600" />
              : <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors">Copier</span>
            }
          </div>
        </button>
      ))}
    </div>
  )
}
