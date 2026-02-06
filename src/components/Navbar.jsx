import { useState, useEffect } from 'react'
import { Menu, X, Mail, Phone, Linkedin, Copy, Check, Sun, Moon } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(null)
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setContactOpen(true)}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors duration-200"
            >
              Contact
            </button>
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl border border-[var(--color-divider)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-heading)] hover:border-[var(--color-accent)] transition-colors duration-200"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl border border-[var(--color-divider)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors duration-200"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center text-[var(--color-heading)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-divider)] px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setContactOpen(true) }}
              className="block text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* Contact Popup */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => setContactOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-[var(--color-card)] rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-divider)]/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-[var(--color-heading)] mb-1">
              Get in Touch
            </h3>
            <p className="text-sm text-[var(--color-muted)] mb-6">
              Feel free to reach out anytime
            </p>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg)] group">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-red-500" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-muted)]">Email</p>
                  <p className="text-sm font-medium text-[var(--color-heading)] truncate">
                    putthipong.sowork@gmail.com
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('putthipong.sowork@gmail.com', 'email')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)] transition-colors"
                >
                  {copied === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg)] group">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-green-500" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-muted)]">Phone</p>
                  <p className="text-sm font-medium text-[var(--color-heading)]">
                    098-898-3876
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('0988983876', 'phone')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)] transition-colors"
                >
                  {copied === 'phone' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/putthipong-soongsuwan-b78013314/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg)] hover:bg-[#0A66C2]/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-muted)]">LinkedIn</p>
                  <p className="text-sm font-medium text-[var(--color-heading)]">
                    Putthipong Soongsuwan
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
