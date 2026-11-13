import type { AppScreen } from '../../types/ui'

interface AppFooterProps {
  screen: AppScreen
  showNavigation: boolean
  onNavigate: (screen: AppScreen) => void
  onBack?: () => void
}

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function AppFooter({ screen, showNavigation, onNavigate, onBack }: AppFooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-xs leading-relaxed text-muted-foreground">
              ATUE · Nenhum dado é persistido.
            </p>
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-medium text-primary transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Trocar empresa
              </button>
            ) : null}
          </div>

          {showNavigation ? (
            <nav aria-label="Navegação do rodapé da área logada">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('dashboard')}
                    aria-current={screen === 'dashboard' ? 'page' : undefined}
                    className={linkClasses}
                  >
                    Painel
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('documents')}
                    aria-current={screen === 'documents' ? 'page' : undefined}
                    className={linkClasses}
                  >
                    Documentos
                  </button>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
