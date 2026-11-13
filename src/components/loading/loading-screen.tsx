import { useEffect, useRef, useState } from 'react'

import type { CompanyProfile } from '../../types/company'

interface LoadingScreenProps {
  company: CompanyProfile
  onComplete: () => void
}

const STEPS = [
  'Preparando o ambiente...',
  'Organizando indicadores e pendências...',
  'Montando a visão geral...',
]

const DURATION_MS = 2600

export function LoadingScreen({ company, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const startedAt = Date.now()
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const next = Math.min(100, Math.round((elapsed / DURATION_MS) * 100))
      setProgress(next)
    }, 60)

    const completion = window.setTimeout(() => {
      setProgress(100)
      onCompleteRef.current()
    }, DURATION_MS)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(completion)
    }
  }, [])

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
          width={839}
          height={302}
          className="mx-auto h-9 w-auto dark:hidden"
        />
        <img
          src="/brand/atue-logo-dark.svg"
          alt=""
          aria-hidden="true"
          width={839}
          height={302}
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
