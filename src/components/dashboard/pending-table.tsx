import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { cn } from '../../lib/cn'
import { sortFindingsByRisk } from '../../lib/score'
import { SEVERITY_CONTENT } from '../../lib/severity'
import type { Finding } from '../../types/company'

interface PendingTableProps {
  findings: readonly Finding[]
  onOpenDocuments: () => void
  className?: string
}

export function PendingTable({ findings, onOpenDocuments, className }: PendingTableProps) {
  const sorted = sortFindingsByRisk(findings)
  const { pending } = DIAGNOSTICS_CONTENT

  return (
    <section
      id="pendencias"
      className={cn('card-surface scroll-mt-24 p-6 sm:p-8', className)}
      aria-labelledby="pendencias-titulo"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 id="pendencias-titulo" className="text-lg font-semibold text-foreground">
            {pending.title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{pending.description}</p>
        </div>
        <button
          type="button"
          onClick={onOpenDocuments}
          className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          {pending.viewAll}
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{pending.empty}</p>
      ) : (
        <table className="mt-4 w-full border-collapse text-left">
          <caption className="sr-only">{pending.title}</caption>
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th scope="col" className="w-24 py-2 pr-4 font-medium">
                {pending.columns.severity}
              </th>
              <th scope="col" className="w-[32%] py-2 pr-4 font-medium">
                {pending.columns.item}
              </th>
              <th scope="col" className="hidden py-2 font-medium sm:table-cell">
                {pending.columns.recommendation}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((finding) => {
              const severity = SEVERITY_CONTENT[finding.risk]

              return (
                <tr key={finding.id} className="border-b border-border align-top last:border-b-0">
                  <td className="py-3 pr-4 text-xs whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className={cn('size-1.5 rounded-full', severity.dotClass)}
                      />
                      {severity.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm font-medium text-foreground">{finding.name}</td>
                  <td className="hidden py-3 text-sm leading-relaxed text-muted-foreground sm:table-cell">
                    {finding.recommendation}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}
