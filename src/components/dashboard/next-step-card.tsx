import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { cn } from '../../lib/cn'
import { sortFindingsByRisk } from '../../lib/score'
import { SEVERITY_CONTENT } from '../../lib/severity'
import type { Finding } from '../../types/company'
import { buttonClasses } from '../ui/button-styles'

interface NextStepCardProps {
  findings: readonly Finding[]
  onOpenDocuments: () => void
  className?: string
}

export function NextStepCard({ findings, onOpenDocuments, className }: NextStepCardProps) {
  const priority = sortFindingsByRisk(findings)[0]
  const { nextStep } = DIAGNOSTICS_CONTENT

  if (!priority) {
    return (
      <section className={cn('card-surface p-6 sm:p-8', className)}>
        <h2 className="text-label text-muted-foreground">{nextStep.title}</h2>
        <p className="mt-3 text-base font-semibold text-foreground">{nextStep.emptyTitle}</p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {nextStep.emptyDescription}
        </p>
      </section>
    )
  }

  const severity = SEVERITY_CONTENT[priority.risk]

  return (
    <section
      className={cn('card-surface flex flex-col p-6 sm:p-8', className)}
      aria-labelledby="proximo-passo-titulo"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="proximo-passo-titulo" className="text-label text-muted-foreground">
          {nextStep.title}
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', severity.dotClass)} />
          {severity.label}
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-lg font-semibold text-balance text-foreground">
        {priority.name}
      </p>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {priority.recommendation}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
        <button type="button" onClick={onOpenDocuments} className={buttonClasses('brand', 'xl')}>
          {nextStep.action}
        </button>
        <a
          href="#pendencias"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          {nextStep.viewAll}
        </a>
      </div>
    </section>
  )
}
