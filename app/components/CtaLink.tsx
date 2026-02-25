import { Link } from 'react-router-dom'

interface CtaLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export default function CtaLink({ href, className, children }: CtaLinkProps) {
  if (href.startsWith('#') || href.startsWith('http')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}
