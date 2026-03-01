import type { ReactNode } from 'react'

interface Service {
  icon: ReactNode
  text: string
  description: string
}

interface ServicesProps {
  title: string
  services: Service[]
}

export default function Services({ title, services }: ServicesProps) {
  return (
    <section className="w-full px-6 py-20 md:px-16 lg:px-24 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-16">{title}</h2>
      <div className="grid grid-cols-2 md:flex md:flex-row gap-10 justify-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center flex-1 gap-4">
            <div className="text-white">{service.icon}</div>
            <p className="text-base font-semibold">{service.text}</p>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
