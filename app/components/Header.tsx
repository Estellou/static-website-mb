import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const translations = fr.header

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3 md:px-16 lg:px-24">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <img
            src={logo}
            alt={interpolate(translations.logoAlt, { companyName: CONTACT.companyName })}
            className="h-[75px] w-auto"
          />
          <div className="flex flex-col justify-center h-[75px]">
            <span className="text-xs font-bold text-black tracking-wide uppercase leading-tight">Menuiserie</span>
            <span className="text-xs font-bold text-black tracking-wide uppercase leading-tight">Belmonte</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-gray-500 hover:text-black transition-colors">
            {translations.nav.features}
          </a>
          <a href="#story" className="text-sm text-gray-500 hover:text-black transition-colors">
            {translations.nav.story}
          </a>
          <a
            href="#contact"
            className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {translations.cta}
          </a>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col border-t border-gray-100 px-6 py-6 gap-5 bg-white">
          <a
            href="#services"
            className="text-sm text-gray-500 hover:text-black transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {translations.nav.features}
          </a>
          <a
            href="#story"
            className="text-sm text-gray-500 hover:text-black transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {translations.nav.story}
          </a>
          <a
            href="#contact"
            className="inline-block bg-black text-white px-6 py-3 text-sm font-medium text-center hover:bg-gray-800 transition-colors mt-2"
            onClick={() => setMenuOpen(false)}
          >
            {translations.cta}
          </a>
        </nav>
      )}
    </header>
  )
}
