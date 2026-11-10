import { useEffect, useRef } from 'react'

import type { AnalysisLog, LogLevel } from '../../types/company'

const LEVEL_STYLES: Record<LogLevel, { prefix: string; className: string }> = {
  success: { prefix: '[+]', className: 'text-green-400' },
  warning: { prefix: '[!]', className: 'text-yellow-400' },
  info: { prefix: '[i]', className: 'text-blue-400' },
}

function formatTimestamp(index: number): string {
  const baseSeconds = 14 * 3600 + 32 * 60
  const totalSeconds = baseSeconds + index
  const hours = Math.floor(totalSeconds / 3600) % 24
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

interface TerminalProps {
  companyName: string
  logs: readonly AnalysisLog[]
  visibleCount: number
}

export function Terminal({ companyName, logs, visibleCount }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = scrollRef.current

    if (node) {
      node.scrollTop = node.scrollHeight
    }
  }, [visibleCount])

  const visibleLogs = logs.slice(0, visibleCount)

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-red-500/80" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-yellow-500/80" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-green-500/80" />
        <p className="ml-2 font-mono text-xs text-zinc-500">atue-scan · {companyName}</p>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label={`Registro da análise simulada de ${companyName}`}
        className="max-h-72 min-h-56 overflow-y-auto px-4 py-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {visibleLogs.length === 0 ? (
          <p className="text-zinc-500">Iniciando varredura simulada...</p>
        ) : null}

        {visibleLogs.map((log, index) => {
          const style = LEVEL_STYLES[log.level]

          return (
            <p key={`${log.message}-${index}`} className="flex gap-2">
              <span className="shrink-0 text-zinc-600">[{formatTimestamp(index)}]</span>
              <span className={`shrink-0 font-semibold ${style.className}`}>{style.prefix}</span>
              <span className="text-zinc-300 break-words">{log.message}</span>
            </p>
          )
        })}

        {visibleCount < logs.length ? (
          <span aria-hidden="true" className="mt-1 inline-block animate-pulse text-zinc-400 motion-reduce:animate-none">
            ▍
          </span>
        ) : null}
      </div>
    </div>
  )
}
