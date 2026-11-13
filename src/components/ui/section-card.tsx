import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-xl bg-card p-6 ring-1 ring-border ${className ?? ''}`}
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  )
}
