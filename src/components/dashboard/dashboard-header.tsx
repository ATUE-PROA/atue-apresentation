import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { buttonClasses } from '../ui/button-styles'
import { FlaskConical, RefreshCcw } from '../ui/icons'

interface DashboardHeaderProps {
  summary: string
  aiGenerated: boolean
}

export function DashboardHeader({ summary, aiGenerated }: DashboardHeaderProps) {
  const { page, summary: summaryCopy } = DIAGNOSTICS_CONTENT

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <FlaskConical aria-hidden="true" className="size-3.5" />
          {page.demoBadge}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{page.title}</h1>
        <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:line-clamp-none">
          <span className="font-medium text-foreground">{summaryCopy.title}.</span> {summary}{' '}
          <span className="text-xs">
            · {aiGenerated ? summaryCopy.aiLabel : summaryCopy.localLabel}
          </span>
        </p>
      </div>

      <a href="#novo-diagnostico" className={buttonClasses('brand', 'xl', 'w-full sm:w-auto')}>
        <RefreshCcw aria-hidden="true" className="size-4" />
        {page.ctaUpdate}
      </a>
    </header>
  )
}
