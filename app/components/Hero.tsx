import { type ReactNode } from 'react'
import CtaLink from './CtaLink'

interface HeroProps {
  title: string
  text: ReactNode
  primaryCta: { label: string; link: string }
  secondaryCta?: { label: string; link: string }
  img?: { src: string; alt: string }
}

export default function Hero({ title, text, primaryCta, secondaryCta, img }: HeroProps) {
  return (
    <section className="w-full flex items-stretch overflow-hidden bg-tertiary">
      {/* Text block */}
      <div className="flex-1 px-6 py-12 md:py-24 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-black leading-tight mb-6">{title}</h1>
          <p className="text-lg text-gray-600 mb-10">{text}</p>
          <div className="flex flex-wrap gap-4">
            <CtaLink
              href={primaryCta.link}
              className="inline-block bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {primaryCta.label}
            </CtaLink>
            {secondaryCta && (
              <CtaLink
                href={secondaryCta.link}
                className="inline-block border border-black text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
              >
                {secondaryCta.label}
              </CtaLink>
            )}
          </div>
        </div>
      </div>

      {/* Image block — desktop only */}
      {img?.src && (
        <div className="hidden md:block relative w-1/3 shrink-0">
          {img?.src ? (
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
          {/* Left fade: image merges into white background */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white to-transparent" />
        </div>
      )}
    </section>
  )
}
