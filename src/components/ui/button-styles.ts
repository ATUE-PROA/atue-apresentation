import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800',
  ghost: 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className)
}
