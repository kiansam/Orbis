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
    <nav style={{ position: 'sticky', top: '112px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
        On this page
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'block',
              fontSize: '13px',
              padding: '4px 12px',
              paddingLeft: item.level === 3 ? '24px' : '12px',
              borderLeft: `2px solid ${activeId === item.id ? 'var(--accent-hex)' : 'var(--border-subtle)'}`,
              color: activeId === item.id ? 'var(--accent-hex)' : 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color var(--t-fast), border-color var(--t-fast)',
              lineHeight: 1.5,
            }}
            onMouseEnter={e => {
              if (activeId !== item.id) {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'
              }
            }}
            onMouseLeave={e => {
              if (activeId !== item.id) {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'
              }
            }}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  )
}
