import type { ComponentType, SVGProps } from 'react'

import type { FindingSummary } from '../../lib/score'
import { cn } from '../../lib/cn'
import { AlertTriangle, Clock, FileText, Info } from '../ui/icons'

interface Indicator {
  label: string
  description: string
  value: number
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  iconClass: string
}

interface IndicatorGridProps {
  summary: FindingSummary
  className?: string
}

export function IndicatorGrid({ summary, className }: IndicatorGridProps) {
  const indicators: Indicator[] = [
    {
      label: 'Total de achados',
      description: 'Itens identificados na análise simulada.',
      value: summary.total,
      Icon: FileText,
      iconClass: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Riscos altos',
      description: 'Exigem correção prioritária.',
      value: summary.high,
      Icon: AlertTriangle,
      iconClass: 'bg-red-500/10 text-red-400',
    },
    {
      label: 'Riscos médios',
      description: 'Devem entrar no plano de adequação.',
      value: summary.medium,
      Icon: Clock,
      iconClass: 'bg-yellow-500/10 text-yellow-400',
    },
    {
      label: 'Riscos baixos',
      description: 'Melhorias recomendadas sem urgência.',
      value: summary.low,
      Icon: Info,
      iconClass: 'bg-blue-500/10 text-blue-400',
    },
  ]

  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {indicators.map((indicator) => {
        const Icon = indicator.Icon

        return (
          <li key={indicator.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-lg',
                indicator.iconClass,
              )}
            >
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-2xl font-semibold tabular-nums text-zinc-100">
              {indicator.value}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">{indicator.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{indicator.description}</p>
          </li>
        )
      })}
    </ul>
  )
}
