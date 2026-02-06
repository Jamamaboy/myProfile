import { useState, useEffect, useRef } from 'react'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function KonamiEaster() {
  const [show, setShow] = useState(false)
  const [particles, setParticles] = useState([])
  const pos = useRef(0)

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[pos.current]) {
        pos.current++
        if (pos.current === KONAMI.length) {
          pos.current = 0
          trigger()
        }
      } else {
        pos.current = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const trigger = () => {
    // Add chaos class to body
    document.body.classList.add('konami-chaos')

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      char: ['<', '/', '>', '{', '}', '(', ')', ';', '=', '+', '*', '#', '0', '1'][Math.floor(Math.random() * 14)],
    }))
    setParticles(newParticles)
    setShow(true)

    setTimeout(() => {
      document.body.classList.remove('konami-chaos')
      setShow(false)
    }, 5000)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[500] pointer-events-none flex items-center justify-center">
      {/* Code particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute font-mono font-bold text-[var(--color-accent)] konami-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size * 2}px`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Center message */}
      <div className="relative bg-[var(--color-card)] border border-[var(--color-accent)] rounded-2xl px-8 py-6 shadow-2xl konami-popup text-center">
        <p className="text-xs font-mono text-[var(--color-accent)] mb-2 tracking-widest">
          // KONAMI CODE ACTIVATED
        </p>
        <p className="text-2xl font-extrabold text-[var(--color-heading)]">
          +30 Lives Granted
        </p>
        <p className="text-sm text-[var(--color-muted)] mt-2 font-mono">
          You're a true developer.
        </p>
      </div>
    </div>
  )
}
