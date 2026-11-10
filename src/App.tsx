import { useEffect, useState } from 'react'

import { AnalysisScreen } from './components/analysis/analysis-screen'
import { CompanySelection } from './components/companies/company-selection'
import { AppShell } from './components/layout/app-shell'
import { ResultsDashboard } from './components/results/results-dashboard'
import { COMPANIES, getCompanyById } from './mocks/companies'
import type { CompanyId, CompanyProfile } from './types/company'

type Stage = 'selection' | 'analysis' | 'results'

export default function App() {
  const [stage, setStage] = useState<Stage>('selection')
  const [selectedId, setSelectedId] = useState<CompanyId | null>(null)
  const selectedCompany = selectedId ? getCompanyById(selectedId) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [stage])

  const handleSelect = (company: CompanyProfile) => {
    setSelectedId(company.id)
    setStage('analysis')
  }

  const handleAnalysisComplete = () => {
    setStage('results')
  }

  const handleRestart = () => {
    setSelectedId(null)
    setStage('selection')
  }

  return (
    <AppShell>
      {stage === 'selection' ? (
        <CompanySelection companies={COMPANIES} onSelect={handleSelect} />
      ) : null}

      {stage === 'analysis' && selectedCompany ? (
        <AnalysisScreen
          key={selectedCompany.id}
          company={selectedCompany}
          onComplete={handleAnalysisComplete}
        />
      ) : null}

      {stage === 'results' && selectedCompany ? (
        <ResultsDashboard company={selectedCompany} onRestart={handleRestart} />
      ) : null}
    </AppShell>
  )
}
