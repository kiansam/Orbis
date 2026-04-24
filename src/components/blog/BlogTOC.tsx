'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface BlogTOCProps {
  items: TocItem[]
}

export function BlogTOC({ items }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav className="sticky top-28 space-y-1">
      <p className="text-foreground text-xs font-semibold uppercase tracking-wider mb-3">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`block text-sm py-1 transition-colors border-l-2 pl-3 ${
            item.level === 3 ? 'ml-3' : ''
          } ${
            activeId === item.id
              ? 'border-accent text-accent'
              : 'border-transparent text-foreground-muted hover:text-foreground hover:border-border-strong'
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
