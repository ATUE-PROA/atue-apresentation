import { useEffect, useRef, useState } from 'react'

import { localSummary, requestExecutiveSummary } from '../../services/analysis'
import type { ExecutiveSummary } from '../../services/analysis'
import type { CompanyProfile } from '../../types/company'

interface LoadingScreenProps {
  company: CompanyProfile
  onComplete: (result: ExecutiveSummary) => void
}

const STEPS = [
  'Preparando o ambiente...',
  'Organizando indicadores e pendências...',
  'Gerando resumo executivo...',
]

// the AI call never blocks the demo: at least 1,2 s of loading, at most 8 s
const MIN_DURATION_MS = 1200
const MAX_DURATION_MS = 8000

export function LoadingScreen({ company, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(6)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const startedAt = Date.now()
    let cancelled = false
    let finished = false

    const finish = (result: ExecutiveSummary) => {
      if (cancelled || finished) return
      finished = true

      const remaining = Math.max(0, MIN_DURATION_MS - (Date.now() - startedAt))
      window.setTimeout(() => {
        if (cancelled) return
        setProgress(100)
        onCompleteRef.current(result)
      }, remaining)
    }

    // asymptotic crawl: the bar never completes before the analysis does
    const tick = window.setInterval(() => {
      setProgress((current) => Math.min(95, current + Math.max(1, Math.round((95 - current) / 12))))
    }, 120)

    const ceiling = window.setTimeout(() => finish(localSummary(company)), MAX_DURATION_MS)

    void requestExecutiveSummary(company).then((result) => {
      window.clearTimeout(ceiling)
      finish(result)
    })

    return () => {
      cancelled = true
      window.clearInterval(tick)
      window.clearTimeout(ceiling)
    }
  }, [company])

  const stepIndex = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length))

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-sm text-center"
      >
        <img
          src="/brand/atue-logo-light.svg"
          alt="ATUE"
          width={3801}
          height={1418}
          className="mx-auto h-9 w-auto dark:hidden"
        />
        <img
          src="/brand/atue-logo-dark.svg"
          alt=""
          aria-hidden="true"
          width={3801}
          height={1418}
          className="mx-auto hidden h-9 w-auto dark:block"
        />

        <p className="mt-8 text-xs font-medium tracking-[0.14em] text-primary uppercase dark:text-blue-400">
          Diagnóstico
        </p>
        <h1 className="mt-2 text-section text-foreground">Carregando dashboard</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {company.name} · {company.segment}
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>{STEPS[stepIndex]}</span>
            <span className="font-mono tabular-nums">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Carregando o dashboard"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Organizando dados ilustrativos. Nenhum site é acessado.
        </p>
      </div>
    </div>
  )
}
