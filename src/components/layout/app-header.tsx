import type { AppScreen } from '../../types/ui'
import { Files, LayoutDashboard } from '../ui/icons'
import { ThemeToggle } from './theme-toggle'

interface AppHeaderProps {
  screen: AppScreen
  showNavigation: boolean
  onNavigate: (screen: AppScreen) => void
  onBack?: () => void
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Painel', Icon: LayoutDashboard },
  { id: 'documents', label: 'Documentos', Icon: Files },
] as const

export function AppHeader({ screen, showNavigation, onNavigate, onBack }: AppHeaderProps) {
  const logo = (
    <>
      <img
        src="/brand/atue-logo-light.svg"
        alt=""
        width={839}
        height={302}
        className="h-8 w-auto dark:hidden"
      />
      <img
        src="/brand/atue-logo-dark.svg"
        alt=""
        width={839}
        height={302}
        className="hidden h-8 w-auto dark:block"
      />
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="ATUE — trocar empresa"
            className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            {logo}
          </button>
        ) : (
          <span className="inline-flex shrink-0 items-center" aria-hidden="true">
            {logo}
          </span>
        )}

        <div className="flex items-center gap-1">
          {showNavigation ? (
            <nav aria-label="Navegação da conta" className="flex items-center gap-1">
              {NAV_ITEMS.map(({ id, label, Icon }) => {
                const isActive = screen === id

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onNavigate(id)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={label}
                    className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    <span className="hidden min-[380px]:inline">{label}</span>
                  </button>
                )
              })}
            </nav>
          ) : null}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
