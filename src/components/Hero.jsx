import { useState, useEffect } from 'react'
import { Github, Linkedin, Globe, Command } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { parseAbout, renderInlineMarkdown } from '../utils/parseContent'
import rawAbout from '../content/about.md?raw'

const socials = [
  { icon: Github, href: 'https://github.com/Jamamaboy', label: 'GitHub', color: 'text-[#333] hover:bg-[#333]/10' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/putthipong-soongsuwan-b78013314/', label: 'LinkedIn', color: 'text-[#0A66C2] hover:bg-[#0A66C2]/10' },
  { icon: Globe, href: 'https://colon-d.vercel.app/', label: 'Colon D', color: 'text-[#8B5CF6] hover:bg-[#8B5CF6]/10' },
]

const about = parseAbout(rawAbout)

function useTypingEffect(text, speed = 60) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return [displayed, done]
}

export default function Hero() {
  const [ref, isInView] = useInView()
  const [typedName, typingDone] = useTypingEffect(about.name, 70)

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Label */}
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-muted)] mb-14 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          About me
        </p>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          {/* Left — Photo */}
          <div
            className={`${
              isInView ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'
            }`}
          >
            <img
              src={about.photo}
              alt={about.name}
              className="aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 rounded-2xl object-cover border border-[var(--color-divider)]"
            />
          </div>

          {/* Right — Text */}
          <div className="flex flex-col justify-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[var(--color-heading)] leading-[1.15] tracking-tight ${
                isInView ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'
              }`}
            >
              Hello, I'm <span className={typingDone ? '' : 'typing-cursor'}>{typedName}</span>
            </h1>

            <p
              className={`mt-4 text-base md:text-lg font-medium text-[var(--color-accent)] ${
                isInView ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'
              }`}
            >
              {about.title}
            </p>

            <p
              className={`mt-6 text-base md:text-[17px] text-[var(--color-body)] leading-[1.75] max-w-lg [&_mark]:bg-[var(--color-accent-light)] [&_mark]:text-[var(--color-accent)] [&_mark]:px-1 [&_mark]:rounded [&_mark]:font-semibold [&_strong]:font-bold [&_strong]:text-[var(--color-heading)] [&_em]:italic ${
                isInView ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'
              }`}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(about.bio) }}
            />

            {/* Contact + Tags */}
            <div
              className={`mt-6 flex flex-col sm:flex-row sm:items-start gap-4 ${
                isInView ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col gap-1 text-sm text-[var(--color-body)] shrink-0">
                <p>putthipong.sowork@gmail.com</p>
                <p>098-898-3876</p>
              </div>
              {about.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {about.tags.map((tag, i) => {
                    const colors = [
                      'bg-amber-50 text-amber-700 border-amber-200',
                      'bg-sky-50 text-sky-700 border-sky-200',
                      'bg-rose-50 text-rose-600 border-rose-200',
                      'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'bg-violet-50 text-violet-700 border-violet-200',
                      'bg-orange-50 text-orange-700 border-orange-200',
                      'bg-teal-50 text-teal-700 border-teal-200',
                      'bg-indigo-50 text-indigo-700 border-indigo-200',
                    ]
                    return (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${colors[i % colors.length]}`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-6 flex flex-wrap gap-4 ${
                isInView ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'
              }`}
            >
              <a
                href="#experience"
                className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
              >
                See My Journey
              </a>
            </div>

            {/* Social Icons + Cmd+K hint */}
            <div
              className={`mt-5 flex items-center gap-3 ${
                isInView ? 'animate-fade-in-up animation-delay-700' : 'opacity-0'
              }`}
            >
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-xl border border-[var(--color-divider)] flex items-center justify-center ${social.color} transition-all duration-200`}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </a>
                )
              })}
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--color-divider)] text-[var(--color-muted)] hover:text-[var(--color-heading)] hover:border-[var(--color-accent)] transition-colors duration-200 text-xs font-mono"
              >
                <Command className="w-3 h-3" />
                <span>K</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
