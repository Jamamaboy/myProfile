import { Github, Linkedin, Mail, Globe, Phone } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const socials = [
  { icon: Github, href: 'https://github.com/Jamamaboy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/putthipong-soongsuwan-b78013314/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:putthipong.sowork@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:0988983876', label: 'Phone' },
  { icon: Globe, href: 'https://colon-d.vercel.app/', label: 'Colon D' },
]

export default function Footer() {
  const [ref, isInView] = useInView()

  return (
    <footer
      ref={ref}
      id="contact"
      className="px-6 md:px-12 lg:px-24 py-16 border-t border-[var(--color-divider)]"
    >
      <div
        className={`max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Left — Copyright */}
        <div className="text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-heading)]">Putthipong Soongsuwan</span>
          <span className="mx-2">&middot;</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        {/* Right — Social Icons */}
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-[var(--color-divider)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            )
          })}
        </div>
      </div>
      <p className="max-w-5xl mx-auto mt-6 text-[10px] font-mono text-[var(--color-divider)] select-none text-center tracking-widest">
        ↑ ↑ ↓ ↓ ← → ← → b a
      </p>
    </footer>
  )
}
