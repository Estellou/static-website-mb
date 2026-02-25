import { type ReactNode } from 'react'
import CtaLink from './CtaLink'

interface ContentMediaProps {
  title: string
  text: string
  img?: { src: string; alt: string }
  imgPosition: 'left' | 'right'
  cta?: { label: string; link: string }
  children?: ReactNode
}

export default function ContentMedia({ title, text, img, imgPosition, cta, children }: ContentMediaProps) {
  const textBlock = (
    <div className="flex flex-col gap-6 md:justify-center md:flex-1">
      <h3 className="text-3xl font-bold text-black">{title}</h3>
      {/* Mobile only: image between title and text — bg/src applied directly to avoid h-full inside aspect-ratio */}
      {img && (
        img.src
          ? <img src={img.src} alt={img.alt} className="md:hidden w-full aspect-[4/3] object-cover" />
          : <div className="md:hidden w-full aspect-[4/3] bg-gray-100" />
      )}
      <p className="text-base text-gray-600 leading-relaxed">{text}</p>
      {children}
      {cta && (
        <CtaLink
          href={cta.link}
          className="self-start inline-block bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          {cta.label}
        </CtaLink>
      )}
    </div>
  )

  // Desktop only: image as side column
  const imageBlock = img ? (
    <div className="hidden md:block md:flex-1">
      {img.src
        ? <img src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-cover" />
        : <div className="w-full aspect-[4/3] bg-gray-100" />
      }
    </div>
  ) : null

  return (
    <section className="w-full px-6 py-5 md:py-20 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:items-center">
        {imgPosition === 'left' ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  )
}
