import { useState } from 'react'

import { getTheme, toggleTheme } from '../../lib/theme'
import { Moon, Sun } from '../ui/icons'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => getTheme() === 'dark')

  return (
    <button
      type="button"
      onClick={() => setIsDark(toggleTheme() === 'dark')}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  )
}
