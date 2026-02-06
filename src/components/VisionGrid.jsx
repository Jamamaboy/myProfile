import { Lightbulb, Users, BookOpen } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const cards = [
  {
    icon: Lightbulb,
    title: 'Building Things',
    desc: 'From hackathon prototypes to real products — I love the process of turning a rough idea into something people can actually use.',
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderHover: 'group-hover:border-amber-200',
  },
  {
    icon: Users,
    title: 'Community & People',
    desc: 'Tech is better when we do it together. I organize events, join communities, and always look for people to learn from and build with.',
    bgLight: 'bg-rose-50',
    iconColor: 'text-rose-500',
    borderHover: 'group-hover:border-rose-200',
  },
  {
    icon: BookOpen,
    title: 'Always Learning',
    desc: 'Whether it\'s a new framework, a business book, or a random YouTube deep-dive — I\'m curious by nature and I never stop exploring.',
    bgLight: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderHover: 'group-hover:border-sky-200',
  },
]

export default function VisionGrid() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} id="vision" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon
            const delayClass = `animation-delay-${(i + 2) * 100}`
            return (
              <div
                key={card.title}
                className={`group relative p-7 rounded-2xl border border-[var(--color-divider)] bg-[var(--color-card)] ${card.borderHover} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default ${
                  isInView ? `animate-fade-in-up ${delayClass}` : 'opacity-0'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${card.bgLight} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={2} />
                </div>

                {/* Text */}
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
