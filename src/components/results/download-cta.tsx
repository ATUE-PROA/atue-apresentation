import { buttonClasses } from '../ui/button-styles'
import { Download } from '../ui/icons'

export function DownloadCta() {
  return (
    <section
      aria-labelledby="download-heading"
      className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/15 via-zinc-900 to-zinc-900 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="download-heading"
            className="text-xl font-semibold tracking-tight text-zinc-100"
          >
            Leve o relatório para a conversa
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Baixe o relatório de conformidade da demonstração em PDF. O arquivo é estático, não
            contém dados reais e não representa uma auditoria oficial.
          </p>
        </div>

        <a
          href="/atue-compliance-report.pdf"
          download
          className={buttonClasses('primary', 'lg', 'shrink-0')}
        >
          <Download className="size-4" />
          Baixar relatório em PDF
        </a>
      </div>
    </section>
  )
}
