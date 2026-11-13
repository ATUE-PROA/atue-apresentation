import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { formatDateTime } from '../../lib/format'
import { getScoreLevel } from '../../lib/score'
import { buttonClasses } from '../ui/button-styles'
import { Globe, RefreshCcw } from '../ui/icons'

interface DashboardHeaderProps {
  score: number
  siteUrl: string
  lastAnalysisAt: string
}

export function DashboardHeader({ score, siteUrl, lastAnalysisAt }: DashboardHeaderProps) {
  const level = getScoreLevel(score)
  const { page } = DIAGNOSTICS_CONTENT

  return (
    <header className="border-b border-border pb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="mt-3 text-display text-foreground">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {page.description}
          </p>
        </div>

        <a
          href="#novo-diagnostico"
          className={buttonClasses('brand', 'xl', 'w-full sm:w-auto')}
        >
          <RefreshCcw aria-hidden="true" className="size-4" />
          {page.ctaUpdate}
        </a>
      </div>

      <dl className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <div className="flex items-center gap-2">
          <dt className="text-muted-foreground">{page.statusLabel}:</dt>
          <dd className="flex items-center gap-1.5 font-medium">
            <span aria-hidden="true" className={`size-2.5 rounded-full ${level.dotClass}`} />
            <span className={level.textClass}>{level.label}</span>
          </dd>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <dt className="shrink-0 text-muted-foreground">{page.urlLabel}:</dt>
          <dd className="flex min-w-0 items-center gap-1.5 font-medium text-foreground">
            <Globe aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span className="break-all">{siteUrl}</span>
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <dt className="text-muted-foreground">{page.updatedLabel}</dt>
          <dd className="font-medium text-foreground">{formatDateTime(lastAnalysisAt)}</dd>
        </div>
      </dl>
    </header>
  )
}
