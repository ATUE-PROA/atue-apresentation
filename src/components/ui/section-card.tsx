import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <section
      className={cn('card-surface flex flex-col p-6 sm:p-8', className)}
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </section>
  )
}
