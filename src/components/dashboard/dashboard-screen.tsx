import type { Finding } from '../../types/company'
import { DashboardHeader } from './dashboard-header'
import { DiagnosticRequestForm } from './diagnostic-request-form'
import { NextStepCard } from './next-step-card'
import { PendingTable } from './pending-table'
import { ScoreIndex } from './score-index'
import { SeveritySummary } from './severity-summary'

interface DashboardScreenProps {
  findings: readonly Finding[]
  score: number
  siteUrl: string
  lastAnalysisAt: string
  summary: string
  aiGenerated: boolean
  onUrlUpdated: (url: string) => void
  onOpenDocuments: () => void
}

export function DashboardScreen({
  findings: currentFindings,
  score: currentScore,
  siteUrl,
  lastAnalysisAt,
  summary,
  aiGenerated,
  onUrlUpdated,
  onOpenDocuments,
}: DashboardScreenProps) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      <DashboardHeader summary={summary} aiGenerated={aiGenerated} />

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        <ScoreIndex
          className="lg:col-span-7"
          score={currentScore}
          siteUrl={siteUrl}
          lastAnalysisAt={lastAnalysisAt}
        />
        <SeveritySummary className="lg:col-span-5" findings={currentFindings} />
        <NextStepCard
          className="lg:col-span-12"
          findings={currentFindings}
          onOpenDocuments={onOpenDocuments}
        />
        <PendingTable
          className="lg:col-span-12"
          findings={currentFindings}
          onOpenDocuments={onOpenDocuments}
        />
      </div>

      <DiagnosticRequestForm onUpdated={onUrlUpdated} />
    </div>
  )
}
