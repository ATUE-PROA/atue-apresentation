import { getScoreLevel } from '../../lib/score'
import type { CompanyProfile } from '../../types/company'
import { ArrowRight, Building2 } from '../ui/icons'

interface CompanyCardProps {
  company: CompanyProfile
  onSelect: (company: CompanyProfile) => void
}

export function CompanyCard({ company, onSelect }: CompanyCardProps) {
  const level = getScoreLevel(company.score)

  return (
    <button
      type="button"
      onClick={() => onSelect(company)}
      aria-label={`Analisar ${company.name} — ${company.segment}`}
      className="group flex h-full w-full flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-colors hover:border-blue-500/50 hover:bg-zinc-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Building2 className="size-5" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs font-medium text-zinc-300">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${level.dotClass}`} />
          {level.label}
        </span>
      </span>

      <span className="mt-5 text-base font-semibold tracking-tight text-zinc-100">
        {company.name}
      </span>
      <span className="mt-0.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
        {company.segment}
      </span>
      <span className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {company.description}
      </span>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
        Analisar empresa
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </span>
    </button>
  )
}
