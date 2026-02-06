export function parseAbout(raw) {
  const lines = raw.trim().split('\n')
  const nameLine = lines.find((l) => l.startsWith('name:'))
  const titleLine = lines.find((l) => l.startsWith('title:'))
  const photoLine = lines.find((l) => l.startsWith('photo:'))
  const tagsLine = lines.find((l) => l.startsWith('tags:'))
  const bio = lines
    .filter((l) => !l.startsWith('name:') && !l.startsWith('title:') && !l.startsWith('photo:') && !l.startsWith('tags:'))
    .join(' ')
    .trim()
  const tags = tagsLine
    ? tagsLine.replace('tags:', '').split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return {
    name: nameLine ? nameLine.replace('name:', '').trim() : 'Name',
    title: titleLine ? titleLine.replace('title:', '').trim() : 'Title',
    photo: photoLine ? photoLine.replace('photo:', '').trim() : '/profile.jpg',
    tags,
    bio,
  }
}

// Converts inline markdown to HTML:
//   `text`  → <mark>text</mark>
//   **text** → <strong>text</strong>
//   *text*  → <em>text</em>
export function renderInlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '<mark>$1</mark>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

const iconMap = {
  lightbulb: 'Lightbulb',
  users: 'Users',
  'book-open': 'BookOpen',
  brain: 'Brain',
  cpu: 'Cpu',
  heart: 'Heart',
  music: 'Music',
  camera: 'Camera',
  code: 'Code',
  rocket: 'Rocket',
  star: 'Star',
  zap: 'Zap',
  globe: 'Globe',
  palette: 'Palette',
  gamepad: 'Gamepad2',
  trophy: 'Trophy',
}

const colorMap = {
  amber: { bgLight: 'bg-amber-50', iconColor: 'text-amber-600', borderHover: 'group-hover:border-amber-200' },
  rose: { bgLight: 'bg-rose-50', iconColor: 'text-rose-500', borderHover: 'group-hover:border-rose-200' },
  sky: { bgLight: 'bg-sky-50', iconColor: 'text-sky-600', borderHover: 'group-hover:border-sky-200' },
  emerald: { bgLight: 'bg-emerald-50', iconColor: 'text-emerald-600', borderHover: 'group-hover:border-emerald-200' },
  violet: { bgLight: 'bg-violet-50', iconColor: 'text-violet-600', borderHover: 'group-hover:border-violet-200' },
  indigo: { bgLight: 'bg-indigo-50', iconColor: 'text-indigo-600', borderHover: 'group-hover:border-indigo-200' },
  orange: { bgLight: 'bg-orange-50', iconColor: 'text-orange-600', borderHover: 'group-hover:border-orange-200' },
  teal: { bgLight: 'bg-teal-50', iconColor: 'text-teal-600', borderHover: 'group-hover:border-teal-200' },
}

export function parseInterests(raw) {
  const blocks = raw.split(/^# /m).filter(Boolean)
  return blocks.map((block) => {
    const lines = block.trim().split('\n')
    const title = lines[0].trim()
    const iconLine = lines.find((l) => l.startsWith('icon:'))
    const colorLine = lines.find((l) => l.startsWith('color:'))
    const iconKey = iconLine ? iconLine.replace('icon:', '').trim() : 'star'
    const colorKey = colorLine ? colorLine.replace('color:', '').trim() : 'amber'
    const desc = lines
      .filter((l) => !l.startsWith('icon:') && !l.startsWith('color:') && l !== lines[0])
      .join(' ')
      .trim()

    return {
      title,
      iconName: iconMap[iconKey] || 'Star',
      colors: colorMap[colorKey] || colorMap.amber,
      desc,
    }
  })
}

// Experience format (blog-style):
//   ## year | role | place | highlight
//   Description text...
//   ![](/path/to/image.jpg)
export function parseExperience(raw) {
  const blocks = raw.split(/^## /m).filter(Boolean)
  return blocks.map((block) => {
    const lines = block.trim().split('\n')
    const headerLine = lines[0]
    const parts = headerLine.split('|').map((s) => s.trim())

    const contentLines = lines.slice(1)
    const images = contentLines
      .filter((l) => /^!\[.*\]\(.*\)$/.test(l.trim()))
      .map((l) => l.trim().match(/\((.*?)\)/)?.[1])
      .filter(Boolean)
    const description = contentLines
      .filter((l) => l.trim() && !/^!\[.*\]\(.*\)$/.test(l.trim()))
      .join(' ')
      .trim()

    return {
      year: parts[0] || '',
      role: parts[1] || '',
      place: parts[2] || '',
      highlight: (parts[3] || '').trim() === 'highlight',
      description,
      images,
    }
  })
}
