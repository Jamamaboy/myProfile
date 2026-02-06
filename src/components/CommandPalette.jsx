import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Search, User, Briefcase, Moon, Sun, Mail, Phone,
  Github, Linkedin, Globe, ArrowUp, Code, Command,
} from 'lucide-react'

const commands = [
  { id: 'about', label: 'Go to About', icon: User, action: () => { document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }, group: 'Navigation' },
  { id: 'experience', label: 'Go to Experience', icon: Briefcase, action: () => { document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) }, group: 'Navigation' },
  { id: 'top', label: 'Scroll to Top', icon: ArrowUp, action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, group: 'Navigation' },
  { id: 'theme', label: 'Toggle Dark Mode', icon: Moon, action: () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, group: 'Actions' },
  { id: 'email', label: 'Copy Email', icon: Mail, action: () => { navigator.clipboard.writeText('putthipong.sowork@gmail.com') }, group: 'Actions' },
  { id: 'phone', label: 'Copy Phone', icon: Phone, action: () => { navigator.clipboard.writeText('0988983876') }, group: 'Actions' },
  { id: 'github', label: 'Open GitHub', icon: Github, action: () => { window.open('https://github.com/Jamamaboy', '_blank') }, group: 'Links' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, action: () => { window.open('https://www.linkedin.com/in/putthipong-soongsuwan-b78013314/', '_blank') }, group: 'Links' },
  { id: 'colond', label: 'Open Colon D', icon: Globe, action: () => { window.open('https://colon-d.vercel.app/', '_blank') }, group: 'Links' },
  { id: 'source', label: 'View Source Code', icon: Code, action: () => { window.open('https://github.com/Jamamaboy', '_blank') }, group: 'Links' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {})

  const flatFiltered = Object.values(grouped).flat()

  const run = useCallback((cmd) => {
    cmd.action()
    setOpen(false)
    setQuery('')
    setSelected(0)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setQuery('')
        setSelected(0)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((prev) => (prev + 1) % flatFiltered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((prev) => (prev - 1 + flatFiltered.length) % flatFiltered.length)
    } else if (e.key === 'Enter' && flatFiltered[selected]) {
      e.preventDefault()
      run(flatFiltered[selected])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const item = listRef.current.querySelector(`[data-index="${selected}"]`)
    item?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  if (!open) return null

  let flatIdx = -1

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[20vh] px-4"
      onClick={() => { setOpen(false); setQuery('') }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-[var(--color-card)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[var(--color-divider)] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-divider)]">
          <Search className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm text-[var(--color-heading)] placeholder-[var(--color-muted)] outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-[var(--color-muted)] bg-[var(--color-bg)] border border-[var(--color-divider)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-72 overflow-y-auto py-2">
          {flatFiltered.length === 0 && (
            <p className="text-sm text-[var(--color-muted)] text-center py-8">
              No commands found
            </p>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold tracking-widest uppercase text-[var(--color-muted)]">
                {group}
              </p>
              {items.map((cmd) => {
                flatIdx++
                const idx = flatIdx
                const Icon = cmd.icon
                return (
                  <button
                    key={cmd.id}
                    data-index={idx}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      idx === selected
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                        : 'text-[var(--color-body)] hover:bg-[var(--color-bg)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span className="flex-1 text-left">{cmd.label}</span>
                    {cmd.id === 'theme' && (
                      <span className="text-[10px] font-mono text-[var(--color-muted)]">
                        {document.documentElement.classList.contains('dark') ? '→ Light' : '→ Dark'}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-divider)] text-[10px] text-[var(--color-muted)]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-divider)] font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-divider)] font-mono">↵</kbd>
              select
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>K to toggle</span>
          </div>
        </div>
      </div>
    </div>
  )
}
