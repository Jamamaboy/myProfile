import { useState } from 'react'
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { parseExperience } from '../utils/parseContent'
import rawExperience from '../content/experience.md?raw'

const milestones = parseExperience(rawExperience)

export default function Experience() {
  const [ref, isInView] = useInView()
  const [activePost, setActivePost] = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const hasContent = (item) => item.description || item.images.length > 0

  return (
    <>
      <section ref={ref} id="experience" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
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

          <div>
            {milestones.map((item, i) => {
              const delayClass = `animation-delay-${(i + 1) * 100}`
              const clickable = hasContent(item)
              return (
                <div
                  key={`${item.year}-${item.role}`}
                  onClick={() => clickable && setActivePost(item)}
                  className={`group flex items-center justify-between py-5 border-b border-[var(--color-divider)] transition-all duration-200 ${
                    clickable ? 'cursor-pointer hover:pl-2' : ''
                  } ${isInView ? `animate-fade-in-up ${delayClass}` : 'opacity-0'}`}
                >
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
                    {item.images.length > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--color-muted)] ml-1">
                        <ImageIcon className="w-3 h-3" />
                        {item.images.length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-sm font-medium text-[var(--color-muted)] tabular-nums">
                      {item.year}
                    </span>
                    {clickable && (
                      <ArrowUpRight
                        className="w-4 h-4 text-[var(--color-divider)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Post Popup */}
      {activePost && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-8 px-4"
          onClick={() => { setActivePost(null); setLightboxIdx(null) }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div
            className="relative bg-[var(--color-card)] rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in-up my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-0">
              <button
                onClick={() => { setActivePost(null); setLightboxIdx(null) }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-divider)]/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-xs font-medium text-[var(--color-muted)]">{activePost.year}</span>
              <h3
                className={`text-xl font-bold mt-1 ${
                  activePost.highlight ? 'text-[var(--color-accent)]' : 'text-[var(--color-heading)]'
                }`}
              >
                {activePost.role}
              </h3>
              <p className="text-sm text-[var(--color-muted)] mt-0.5">{activePost.place}</p>
            </div>

            {/* Description */}
            {activePost.description && (
              <div className="px-6 pt-4">
                <p className="text-sm text-[var(--color-body)] leading-relaxed">
                  {activePost.description}
                </p>
              </div>
            )}

            {/* Images Grid */}
            {activePost.images.length > 0 && (
              <div className="p-6">
                <div className={`grid gap-3 ${
                  activePost.images.length === 1
                    ? 'grid-cols-1'
                    : 'grid-cols-2'
                }`}>
                  {activePost.images.map((src, idx) => (
                    <button
                      key={src}
                      onClick={() => setLightboxIdx(idx)}
                      className="relative rounded-xl overflow-hidden border border-[var(--color-divider)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-200 aspect-[4/3]"
                    >
                      <img
                        src={src}
                        alt={`${activePost.role} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state if no images and no description */}
            {!activePost.description && activePost.images.length === 0 && (
              <div className="p-6 text-center text-sm text-[var(--color-muted)]">
                No details yet
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {activePost && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {activePost.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIdx((idx) => (idx - 1 + activePost.images.length) % activePost.images.length)
                }}
                className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIdx((idx) => (idx + 1) % activePost.images.length)
                }}
                className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <img
            src={activePost.images[lightboxIdx]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {activePost.images.length > 1 && (
            <div className="absolute bottom-6 flex gap-1.5">
              {activePost.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === lightboxIdx ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
