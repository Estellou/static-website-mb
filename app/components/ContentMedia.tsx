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

function ImageContent({ img }: { img: NonNullable<ContentMediaProps['img']> }) {
  return img.src ? (
    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full bg-gray-100" />
  )
}

export default function ContentMedia({ title, text, img, imgPosition, cta, children }: ContentMediaProps) {
  const textBlock = (
    <div className="flex flex-col justify-center gap-6 flex-1">
      <h3 className="text-3xl font-bold text-black">{title}</h3>
      {/* Mobile only: image between title and text */}
      {img && (
        <div className="md:hidden aspect-[4/3]">
          <ImageContent img={img} />
        </div>
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
    <div className="hidden md:block flex-1 aspect-[4/3]">
      <ImageContent img={img} />
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
