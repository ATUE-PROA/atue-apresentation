import { useState } from 'react'

import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { summarizeFindings } from '../../lib/score'
import { groupBySeverity, SEVERITY_CONTENT } from '../../lib/severity'
import type { Finding, RiskLevel } from '../../types/company'
import { AlertCircle, AlertTriangle, ChevronDown, Info } from '../ui/icons'
import { Badge } from '../ui/badge'

interface FindingsListProps {
  findings: readonly Finding[]
  onOpenDocuments: () => void
}

const SEVERITY_ICONS = {
  alto: AlertTriangle,
  medio: AlertCircle,
  baixo: Info,
} as const satisfies Record<RiskLevel, typeof Info>

export function FindingsList({ findings, onOpenDocuments }: FindingsListProps) {
  const [openIds, setOpenIds] = useState<string[]>([])
  const groups = groupBySeverity(findings)
  const summary = summarizeFindings(findings)

  if (groups.length === 0) {
    return <p className="text-sm text-muted-foreground">{DIAGNOSTICS_CONTENT.findings.empty}</p>
  }

  const toggle = (id: string) => {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div
          role="group"
          aria-label={DIAGNOSTICS_CONTENT.findings.summaryLabel}
          className="flex flex-wrap gap-x-4 gap-y-1 text-sm"
        >
        {groupBySeverity(findings).map((group) => (
          <span key={group.risk} className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${SEVERITY_CONTENT[group.risk].dotClass}`}
            />
            {SEVERITY_CONTENT[group.risk].label}:{' '}
            <span className="font-medium text-foreground">
              {group.risk === 'alto'
                ? summary.high
                : group.risk === 'medio'
                  ? summary.medium
                  : summary.low}
            </span>
          </span>
        ))}
        </div>

        <button
          type="button"
          onClick={onOpenDocuments}
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Ver central
        </button>
      </div>

      {groups.map((group) => {
        const severity = SEVERITY_CONTENT[group.risk]
        const DeliveryIcon = SEVERITY_ICONS[group.risk]
        const headingId = `finding-group-${group.risk}`

        return (
          <section key={group.risk} aria-labelledby={headingId}>
            <h3
              id={headingId}
              className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${severity.dotClass}`}
              />
              {severity.label}
              <span className="text-xs font-medium text-muted-foreground">
                ({group.findings.length})
              </span>
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {severity.description}
            </p>

            <ul className="mt-2 space-y-3">
              {group.findings.map((finding) => {
                const isOpen = openIds.includes(finding.id)
                const triggerId = `finding-trigger-${finding.id}`
                const panelId = `finding-panel-${finding.id}`

                return (
                  <li
                    key={finding.id}
                    className={`rounded-lg border border-border bg-background ${
                      isOpen ? 'bg-muted/30' : ''
                    }`}
                  >
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(finding.id)}
                      className="flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
                    >
                      <DeliveryIcon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <Badge className={severity.badgeClass}>{severity.label}</Badge>
                          <span className="text-xs text-muted-foreground">{finding.category}</span>
                        </span>
                        <span className="mt-1 block font-medium text-foreground">
                          {finding.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {finding.technicalDescription}
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen ? (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className="space-y-3 border-t border-border px-3 py-3"
                      >
                        <div>
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Explicação
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground">
                            {finding.businessImpact}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Recomendação
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground">
                            {finding.recommendation}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
