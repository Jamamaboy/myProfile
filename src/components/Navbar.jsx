import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Interests', href: '#vision' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-divider)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#about"
          className="text-lg font-extrabold text-[var(--color-heading)] tracking-tight"
        >
          putthipong<span className="text-[var(--color-accent)]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--color-heading)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-divider)] px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
