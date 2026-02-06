import { useInView } from '../hooks/useInView'

export default function Hero() {
  const [ref, isInView] = useInView()

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
              src="/profile.jpg"
              alt="Putthipong Soongsuwan"
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
              Hello, I'm Putthipong
            </h1>

            <p
              className={`mt-4 text-base md:text-lg font-medium text-[var(--color-accent)] ${
                isInView ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'
              }`}
            >
              Founder & Engineer
            </p>

            <p
              className={`mt-6 text-base md:text-[17px] text-[var(--color-body)] leading-[1.75] max-w-lg ${
                isInView ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'
              }`}
            >
              I like building things that matter — whether it's a startup, a side project
              at 2 AM, or a team around an idea. Most days you'll find me writing code,
              joining hackathons, or figuring out how to make something work better.
              I believe great products come from people who genuinely care.
            </p>

            {/* CTA Buttons */}
            <div
              className={`mt-8 flex flex-wrap gap-4 ${
                isInView ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'
              }`}
            >
              <a
                href="#experience"
                className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
              >
                See My Journey
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-[var(--color-divider)] text-[var(--color-heading)] text-sm font-semibold rounded-xl hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                Say Hello
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
