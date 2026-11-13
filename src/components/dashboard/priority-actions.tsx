import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { sortFindingsByRisk } from '../../lib/score'
import { SEVERITY_CONTENT } from '../../lib/severity'
import type { Finding, RiskLevel } from '../../types/company'
import { ArrowRight } from '../ui/icons'
import { Badge } from '../ui/badge'
import { SectionCard } from '../ui/section-card'

interface PriorityActionsProps {
  findings: readonly Finding[]
  onOpenDocuments: () => void
}

const PRIORITY_LIMIT = 3

const NEXT_STEPS: Record<RiskLevel, string> = {
  alto: DIAGNOSTICS_CONTENT.priorities.nextSteps.alta,
  medio: DIAGNOSTICS_CONTENT.priorities.nextSteps.media,
  baixo: DIAGNOSTICS_CONTENT.priorities.nextSteps.baixa,
}

export function PriorityActions({ findings, onOpenDocuments }: PriorityActionsProps) {
  const priorities = sortFindingsByRisk(findings).slice(0, PRIORITY_LIMIT)
  const { title, description, nextStepLabel, action, emptyTitle, emptyDescription } =
    DIAGNOSTICS_CONTENT.priorities

  return (
    <SectionCard title={title} description={description}>
      {priorities.length === 0 ? (
        <div>
          <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{emptyDescription}</p>
        </div>
      ) : (
        <ol className="space-y-4">
          {priorities.map((finding, index) => {
            const severity = SEVERITY_CONTENT[finding.risk]

            return (
              <li
                key={finding.id}
                className="border-t border-border pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xs font-medium text-blue-600 dark:text-blue-300"
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={severity.badgeClass}>{severity.label}</Badge>
                      <h3 className="text-base font-medium text-foreground">{finding.name}</h3>
                    </div>

                    <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {finding.recommendation}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      <span className="font-medium">{nextStepLabel}:</span>{' '}
                      {NEXT_STEPS[finding.risk]}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <button
        type="button"
        onClick={onOpenDocuments}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-blue-400 dark:hover:text-blue-300"
      >
        {action}
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </SectionCard>
  )
}
