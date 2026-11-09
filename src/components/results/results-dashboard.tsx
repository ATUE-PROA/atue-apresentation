import { getScoreLevel, summarizeFindings } from '../../lib/score'
import type { CompanyProfile } from '../../types/company'
import { Button } from '../ui/button'
import { Globe, RotateCcw } from '../ui/icons'
import { DownloadCta } from './download-cta'
import { FindingsList } from './findings-list'
import { IndicatorGrid } from './indicator-grid'
import { Recommendations } from './recommendations'
import { ScoreDonut } from './score-donut'

interface ResultsDashboardProps {
  company: CompanyProfile
  onRestart: () => void
}

export function ResultsDashboard({ company, onRestart }: ResultsDashboardProps) {
  const level = getScoreLevel(company.score)
  const summary = summarizeFindings(company.findings)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
            Resultado da análise
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
            {company.name}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">{company.segment}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 break-all font-mono text-xs text-zinc-500">
              <Globe className="size-3.5" />
              {company.website}
            </span>
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400">{company.summary}</p>
        </div>

        <Button variant="secondary" onClick={onRestart} className="w-fit">
          <RotateCcw className="size-4" />
          Analisar outra empresa
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <section
          aria-labelledby="score-heading"
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h2 id="score-heading" className="text-base font-semibold text-zinc-100">
            Score de conformidade
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Quanto maior, melhor. Faixas: crítico, atenção e conforme.
          </p>
          <div className="mt-6">
            <ScoreDonut score={company.score} />
          </div>
        </section>

        <section aria-labelledby="indicators-heading">
          <h2 id="indicators-heading" className="text-base font-semibold text-zinc-100">
            Indicadores
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Resumo dos {summary.total} achados identificados na análise simulada.
          </p>
          <IndicatorGrid summary={summary} className="mt-4" />
        </section>
      </div>

      <section aria-labelledby="findings-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="findings-heading"
              className="text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl"
            >
              Achados técnicos
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Cada achado traz a descrição técnica, o impacto para o negócio e a recomendação de
              adequação.
            </p>
          </div>
          <p className="text-xs text-zinc-500">Classificação geral: {level.label}</p>
        </div>
        <div className="mt-6">
          <FindingsList findings={company.findings} />
        </div>
      </section>

      <section aria-labelledby="recommendations-heading">
        <h2
          id="recommendations-heading"
          className="text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl"
        >
          Recomendações de adequação
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
          Plano de ação derivado dos achados, priorizando os riscos mais altos.
        </p>
        <div className="mt-4">
          <Recommendations findings={company.findings} />
        </div>
      </section>

      <DownloadCta />

      <p className="text-xs leading-relaxed text-zinc-500">
        Demonstração: os resultados são fictícios, gerados a partir de mocks, e não representam uma
        auditoria real nem garantia de conformidade.
      </p>
    </div>
  )
}
