import { useEffect, useState } from 'react'

import { DashboardScreen } from './components/dashboard/dashboard-screen'
import { DocumentsScreen } from './components/documents/documents-screen'
import { AppFooter } from './components/layout/app-footer'
import { AppHeader } from './components/layout/app-header'
import { AppShell } from './components/layout/app-shell'
import { LoadingScreen } from './components/loading/loading-screen'
import { SelectionScreen } from './components/selection/selection-screen'
import { createSimulatedAnalysis } from './lib/simulation'
import { COMPANIES, getCompanyById } from './mocks/companies'
import type { CompanyId, Finding } from './types/company'
import type { AppScreen } from './types/ui'

type Stage = 'selection' | 'loading' | 'app'

const DEFAULT_COMPANY = COMPANIES[0]

interface Report {
  url: string
  lastAnalysisAt: string
  score: number
  findings: readonly Finding[]
}

const DEFAULT_REPORT: Report = {
  url: DEFAULT_COMPANY.website,
  lastAnalysisAt: DEFAULT_COMPANY.lastAnalysisAt,
  score: DEFAULT_COMPANY.score,
  findings: DEFAULT_COMPANY.findings,
}

export default function App() {
  const [stage, setStage] = useState<Stage>('selection')
  const [screen, setScreen] = useState<AppScreen>('dashboard')
  const [companyId, setCompanyId] = useState<CompanyId>(DEFAULT_COMPANY.id)
  const [report, setReport] = useState<Report>(DEFAULT_REPORT)

  const company = getCompanyById(companyId) ?? DEFAULT_COMPANY
  const isApp = stage === 'app'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [stage, screen, companyId])

  useEffect(() => {
    const page = screen === 'documents' ? 'Central de Documentos' : 'Visão geral'
    document.title = `ATUE — ${page}`
  }, [screen])

  const handleSelect = (id: CompanyId) => {
    const selected = getCompanyById(id) ?? DEFAULT_COMPANY

    setCompanyId(id)
    setReport({
      url: selected.website,
      lastAnalysisAt: selected.lastAnalysisAt,
      score: selected.score,
      findings: selected.findings,
    })
    setScreen('dashboard')
    setStage('loading')
  }

  const handleUrlUpdated = (url: string) => {
    const analysis = createSimulatedAnalysis(url)

    setReport({
      url,
      lastAnalysisAt: new Date().toISOString(),
      score: analysis.score,
      findings: analysis.findings,
    })
  }

  const handleDocumentAnalyzed = (seed: string) => {
    const analysis = createSimulatedAnalysis(`${company.id}:${seed}`)

    setReport((current) => ({
      ...current,
      score: analysis.score,
      findings: analysis.findings,
    }))
  }

  return (
    <AppShell>
      <AppHeader
        screen={screen}
        showNavigation={isApp}
        onNavigate={setScreen}
        onBack={isApp ? () => setStage('selection') : undefined}
      />

      <main id="conteudo" className="flex flex-1 flex-col">
        {stage === 'selection' ? (
          <SelectionScreen companies={COMPANIES} onSelect={handleSelect} />
        ) : null}

        {stage === 'loading' ? (
          <LoadingScreen company={company} onComplete={() => setStage('app')} />
        ) : null}

        {isApp ? (
          screen === 'dashboard' ? (
            <DashboardScreen
              findings={report.findings}
              score={report.score}
              siteUrl={report.url}
              lastAnalysisAt={report.lastAnalysisAt}
              onUrlUpdated={handleUrlUpdated}
              onOpenDocuments={() => setScreen('documents')}
            />
          ) : (
            <DocumentsScreen onAnalyzed={handleDocumentAnalyzed} />
          )
        ) : null}
      </main>

      <AppFooter
        screen={screen}
        showNavigation={isApp}
        onNavigate={setScreen}
        onBack={isApp ? () => setStage('selection') : undefined}
      />
    </AppShell>
  )
}
