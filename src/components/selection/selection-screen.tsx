import type { CompanyId, CompanyProfile } from '../../types/company'
import { ArrowRight } from '../ui/icons'
import { SectionHeading } from '../ui/section-heading'

interface SelectionScreenProps {
  companies: readonly CompanyProfile[]
  onSelect: (id: CompanyId) => void
}

export function SelectionScreen({ companies, onSelect }: SelectionScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-12">
      <SectionHeading
        title="Escolha uma empresa"
        description="Selecione uma empresa para abrir o painel com score, pendências e recomendações."
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {companies.map((company, index) => (
          <li key={company.id}>
            <button
              type="button"
              onClick={() => onSelect(company.id)}
              className="card-surface group grid w-full cursor-pointer grid-cols-[2rem_1fr_auto] items-center gap-4 p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="text-xs text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-medium text-foreground">
                  {company.name}
                </span>
                <span className="mt-0.5 block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {company.segment}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground group-hover:underline">
                <span className="sm:hidden">Abrir</span>
                <span className="hidden sm:inline">Ver dashboard</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Dados ilustrativos. Nenhuma URL é solicitada e nenhum site é acessado.
      </p>
    </div>
  )
}
