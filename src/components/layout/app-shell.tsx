import type { ReactNode } from 'react'

import { ShieldCheck } from '../ui/icons'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-zinc-100">ATUE</p>
              <p className="text-xs text-zinc-400">Conformidade e privacidade</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-blue-400" />
            Demonstração
          </span>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>ATUE — demonstração estática para o Demoday. Nenhum dado real é analisado.</p>
          <p>Dados fictícios · Sem backend · Sem requisições externas</p>
        </div>
      </footer>
    </div>
  )
}
