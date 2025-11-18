import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'T Facilities - Rotas de Limpeza',
  description: 'Gestão de rotas de limpeza e status das salas do T Group.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-md flex-col px-3 py-4">
          {/* “Moldura” glass principal */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Topbar */}
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 shadow-lg shadow-amber-500/40">
                  <span className="text-xs font-black tracking-tight text-slate-950">
                    T
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300">
                    T Facilities
                  </p>
                  <p className="text-sm font-semibold text-slate-50">
                    Rotas de Limpeza
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                Versão demo
              </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-gradient-to-b from-white/5 via-white/2 to-white/5">
              {children}
            </main>

            <footer className="border-t border-white/10 px-4 py-2 text-center text-[10px] text-slate-300/80">
              <span className="font-semibold text-amber-200">
                Plataforma piloto • Facilities
              </span>{' '}
              <span className="text-slate-300">
                Desenvolvida por Gente &amp; Cultura — T Group
              </span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
