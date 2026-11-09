import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'

interface BadgeProps {
  className?: string
  children: ReactNode
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}
