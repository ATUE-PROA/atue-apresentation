import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { cn } from '../../lib/cn'
import { summarizeFindings } from '../../lib/score'
import { SEVERITY_CONTENT } from '../../lib/severity'
import type { Finding, RiskLevel } from '../../types/company'

const RISK_ORDER: readonly RiskLevel[] = ['alto', 'medio', 'baixo'] as const

interface SeveritySummaryProps {
  findings: readonly Finding[]
  className?: string
}

export function SeveritySummary({ findings, className }: SeveritySummaryProps) {
  const summary = summarizeFindings(findings)
  const counts: Record<RiskLevel, number> = {
    alto: summary.high,
    medio: summary.medium,
    baixo: summary.low,
  }
  const { pending, footerNote } = DIAGNOSTICS_CONTENT

  return (
    <section
      className={cn('card-surface flex flex-col p-6 sm:p-8', className)}
      aria-labelledby="resumo-titulo"
    >
      <h2 id="resumo-titulo" className="text-label text-muted-foreground">
        {pending.severityTitle}
      </h2>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl leading-none font-bold tracking-tight text-foreground tabular-nums">
          {findings.length}
        </span>
        <span className="text-sm text-muted-foreground">pendências</span>
      </p>

      <dl className="mt-5 space-y-3">
        {RISK_ORDER.map((risk) => (
          <div
            key={risk}
            className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className={cn('size-2 rounded-full', SEVERITY_CONTENT[risk].dotClass)}
              />
              {SEVERITY_CONTENT[risk].label}
            </dt>
            <dd className="text-xl font-semibold text-foreground tabular-nums">{counts[risk]}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {footerNote}
      </p>
    </section>
  )
}
