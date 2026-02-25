import { type ReactNode } from 'react'

interface HorizontalContactItem {
  icon: ReactNode
  label: string
  value: string
}

interface HorizontalContactProps {
  items: HorizontalContactItem[]
}

export default function HorizontalContact({ items }: HorizontalContactProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="text-gray-400">{item.icon}</div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">{item.label}</span>
            <span className="text-sm font-bold text-black">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
