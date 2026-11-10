import { useEffect, useRef, useState } from 'react'

import type { CompanyProfile } from '../../types/company'
import { Terminal } from './terminal'

const MIN_DURATION_MS = 3000
const MAX_DURATION_MS = 7000

interface AnalysisScreenProps {
  company: CompanyProfile
  onComplete: () => void
}

function getRandomDuration(): number {
  return MIN_DURATION_MS + Math.floor(Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS))
}

export function AnalysisScreen({ company, onComplete }: AnalysisScreenProps) {
  const logs = company.analysisLogs
  const [duration] = useState(getRandomDuration)
  const [prefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visibleCount, setVisibleCount] = useState(() =>
    prefersReducedMotion ? logs.length : 0,
  )
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const stepDuration = duration / logs.length
    const timers: number[] = []

    if (!prefersReducedMotion) {
      logs.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            setVisibleCount(index + 1)
          }, Math.round(stepDuration * (index + 1))),
        )
      })
    }

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + 100 / (duration / 100)))
    }, 100)

    const completionTimer = window.setTimeout(() => {
      setProgress(100)
      onCompleteRef.current()
    }, duration)

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer)
      }

      window.clearInterval(progressTimer)
      window.clearTimeout(completionTimer)
    }
  }, [duration, logs, prefersReducedMotion])

  const currentStep =
    visibleCount === 0 ? undefined : logs[Math.min(visibleCount - 1, logs.length - 1)]?.message

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
        Análise em andamento
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
        Analisando {company.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
        A varredura é simulada e leva entre 3 e 7 segundos. Nenhum site real é acessado e nenhuma
        IA real é executada.
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">
            {currentStep ?? 'Preparando a análise...'}
          </span>
          <span className="font-mono tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Progresso da análise simulada"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="h-2 overflow-hidden rounded-full bg-zinc-800"
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-[width] duration-200 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6">
        <Terminal companyName={company.name} logs={logs} visibleCount={visibleCount} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Os registros acima são gerados localmente a partir dos mocks da demonstração.
      </p>
    </section>
  )
}
