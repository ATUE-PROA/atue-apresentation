import type { CompanyId, CompanyProfile } from '../../types/company'
import { ArrowRight } from '../ui/icons'
import { SectionHeading } from '../ui/section-heading'

interface SelectionScreenProps {
  companies: readonly CompanyProfile[]
  onSelect: (id: CompanyId) => void
}

export function SelectionScreen({ companies, onSelect }: SelectionScreenProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <SectionHeading
        eyebrow="Painel de conformidade"
        title="Escolha uma empresa"
        description="Selecione uma empresa para abrir o painel com score, pendências e recomendações."
      />

      <ul className="mt-8 border-t border-border">
        {companies.map((company, index) => (
          <li key={company.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => onSelect(company.id)}
              className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 px-2 py-5 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
            >
              <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
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
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary dark:text-blue-400">
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
