import { cn } from '../../lib/cn'

export type ButtonVariant = 'brand' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'md' | 'xl'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  brand: 'bg-primary text-primary-foreground hover:bg-blue-500',
  secondary: 'border border-border bg-card text-foreground hover:bg-muted',
  outline: 'border border-border bg-background text-foreground hover:bg-muted',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-9 px-4',
  xl: 'h-11 px-6 text-base',
}

export function buttonClasses(
  variant: ButtonVariant = 'brand',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className)
}
