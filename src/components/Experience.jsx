import { ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const milestones = [
  { year: '2025', role: 'Founder', place: 'Colon D', highlight: true },
  { year: '2025', role: 'Super AI Engineer', place: 'Rank 1' },
  { year: '2024', role: 'Software Engineer Intern', place: 'MFEC' },
  { year: '2024', role: 'Hackathon Champion', place: 'National Level' },
  { year: '2023', role: 'Started University', place: 'Computer Engineering' },
]

export default function Experience() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} id="experience" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-muted)] mb-3 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          Experience
        </p>
        <h2
          className={`text-3xl md:text-4xl font-extrabold text-[var(--color-heading)] tracking-tight mb-12 ${
            isInView ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'
          }`}
        >
          Where I've Been
        </h2>

        {/* List */}
        <div>
          {milestones.map((item, i) => {
            const delayClass = `animation-delay-${(i + 2) * 100}`
            return (
              <div
                key={`${item.year}-${item.role}`}
                className={`group flex items-center justify-between py-5 border-b border-[var(--color-divider)] hover:pl-2 transition-all duration-200 ${
                  isInView ? `animate-fade-in-up ${delayClass}` : 'opacity-0'
                }`}
              >
                {/* Left — Role + Place */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span
                    className={`text-base font-semibold ${
                      item.highlight
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-heading)]'
                    }`}
                  >
                    {item.role}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">
                    — {item.place}
                  </span>
                </div>

                {/* Right — Year + Arrow */}
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-sm font-medium text-[var(--color-muted)] tabular-nums">
                    {item.year}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-[var(--color-divider)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                    strokeWidth={2}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
