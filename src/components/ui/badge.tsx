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
        'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        className,
      )}
    >
      {children}
    </span>
  )
}
