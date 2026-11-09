import type { CompanyProfile } from '../../types/company'
import { CompanyCard } from './company-card'

interface CompanySelectionProps {
  companies: readonly CompanyProfile[]
  onSelect: (company: CompanyProfile) => void
}

export function CompanySelection({ companies, onSelect }: CompanySelectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
          Demoday · ATUE
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
          Escolha uma empresa para simular a análise de conformidade
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Selecione um dos três cenários fictícios. A ATUE executa uma varredura simulada, calcula
          o score e apresenta os achados com recomendações de adequação.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {companies.map((company) => (
          <li key={company.id}>
            <CompanyCard company={company} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Demonstração: nenhuma URL é solicitada e nenhum site real é acessado. Todos os dados são
        fictícios.
      </p>
    </section>
  )
}
