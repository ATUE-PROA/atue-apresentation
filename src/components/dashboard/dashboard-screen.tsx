import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import type { Finding } from '../../types/company'
import { Info } from '../ui/icons'
import { SectionCard } from '../ui/section-card'
import { DashboardHeader } from './dashboard-header'
import { DiagnosticRequestForm } from './diagnostic-request-form'
import { FindingsList } from './findings-list'
import { PriorityActions } from './priority-actions'
import { ScoreGauge } from './score-gauge'

interface DashboardScreenProps {
  findings: readonly Finding[]
  score: number
  siteUrl: string
  lastAnalysisAt: string
  onUrlUpdated: (url: string) => void
  onOpenDocuments: () => void
}

export function DashboardScreen({
  findings: currentFindings,
  score: currentScore,
  siteUrl,
  lastAnalysisAt,
  onUrlUpdated,
  onOpenDocuments,
}: DashboardScreenProps) {
  const { score, findings, footerNote } = DIAGNOSTICS_CONTENT

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <DashboardHeader
        score={currentScore}
        siteUrl={siteUrl}
        lastAnalysisAt={lastAnalysisAt}
      />

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <SectionCard title={score.title} description={score.description}>
            <div className="flex flex-col items-center">
              <ScoreGauge score={currentScore} />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{score.scaleNote}</p>

            <div className="mt-4 flex gap-2 rounded-lg bg-muted/50 p-3 text-sm leading-relaxed text-foreground">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <p>{score.disclaimer}</p>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <h3 className="text-sm font-medium text-foreground">{score.dimensionsTitle}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {score.dimensions.map((dimension) => (
                  <li key={dimension}>{dimension}</li>
                ))}
              </ul>
            </div>
          </SectionCard>

          <PriorityActions findings={currentFindings} onOpenDocuments={onOpenDocuments} />
        </div>

        <div>
          <SectionCard title={findings.title} description={findings.description}>
            <FindingsList findings={currentFindings} onOpenDocuments={onOpenDocuments} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{footerNote}</p>
          </SectionCard>
        </div>
      </div>

      <div className="mt-8">
        <DiagnosticRequestForm onUpdated={onUrlUpdated} />
      </div>
    </div>
  )
}
