import { groupFindingsByRisk, RISK_META } from '../../lib/score'
import type { Finding } from '../../types/company'
import { Badge } from '../ui/badge'

interface FindingsListProps {
  findings: readonly Finding[]
}

export function FindingsList({ findings }: FindingsListProps) {
  const groups = groupFindingsByRisk(findings)

  return (
    <div className="space-y-8">
      {groups.map((group) => {
        const meta = RISK_META[group.risk]
        const headingId = `risk-${group.risk}`

        return (
          <section key={group.risk} aria-labelledby={headingId}>
            <div className="flex flex-wrap items-center gap-2">
              <span aria-hidden="true" className={`size-2 rounded-full ${meta.dotClass}`} />
              <h3 id={headingId} className="text-base font-semibold text-zinc-100">
                {meta.label}
              </h3>
              <span className="text-xs font-medium text-zinc-500">({group.findings.length})</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{meta.description}</p>

            <ul className="mt-4 space-y-3">
              {group.findings.map((finding) => (
                <li
                  key={finding.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={meta.badgeClass}>{meta.label}</Badge>
                    <span className="text-xs text-zinc-500">{finding.category}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-zinc-100">{finding.name}</h4>

                  <dl className="mt-3 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Descrição técnica
                      </dt>
                      <dd className="mt-1 leading-relaxed text-zinc-300">
                        {finding.technicalDescription}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Impacto no negócio
                      </dt>
                      <dd className="mt-1 leading-relaxed text-zinc-300">
                        {finding.businessImpact}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Recomendação
                      </dt>
                      <dd className="mt-1 leading-relaxed text-zinc-300">
                        {finding.recommendation}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
