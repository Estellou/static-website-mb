import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Notre histoire', href: '#story' },
  { label: 'Nous contacter', href: '#contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3 md:px-16 lg:px-24">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Menuiserie Belmonte logo" className="h-10 w-auto" />
          <span className="text-sm font-semibold text-black tracking-wide uppercase">
            Menuiserie Belmonte
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Démarrer un projet
          </Link>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col border-t border-gray-100 px-6 py-6 gap-5 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="inline-block bg-black text-white px-6 py-3 text-sm font-medium text-center hover:bg-gray-800 transition-colors mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Démarrer un projet
          </Link>
        </nav>
      )}
    </header>
  )
}
