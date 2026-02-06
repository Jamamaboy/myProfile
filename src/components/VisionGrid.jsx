import * as icons from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { parseInterests } from '../utils/parseContent'
import rawInterests from '../content/interests.md?raw'

const cards = parseInterests(rawInterests)

export default function VisionGrid() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} id="vision" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-5xl mx-auto">
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-muted)] mb-3 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          Interests & Hobbies
        </p>
        <h2
          className={`text-3xl md:text-4xl font-extrabold text-[var(--color-heading)] tracking-tight mb-12 ${
            isInView ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'
          }`}
        >
          What I Care About
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = icons[card.iconName] || icons.Star
            const delayClass = `animation-delay-${(i + 1) * 100}`
            return (
              <div
                key={card.title}
                className={`group relative p-7 rounded-2xl border border-[var(--color-divider)] bg-[var(--color-card)] ${card.colors.borderHover} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default ${
                  isInView ? `animate-fade-in-up ${delayClass}` : 'opacity-0'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${card.colors.bgLight} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${card.colors.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[var(--color-heading)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
