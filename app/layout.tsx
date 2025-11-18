// app/layout.tsx
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
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-md flex-col border-x bg-white shadow-sm">
          <header className="flex items-center gap-2 border-b px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-amber-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-amber-600">
                T Facilities
              </p>
              <p className="text-sm font-semibold">Rotas de Limpeza</p>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
