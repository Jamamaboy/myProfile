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
    .replace(/\//g, '<br />')
    .replace(/`([^`]+)`/g, '<mark>$1</mark>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
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
