// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'T.Facilities Hub',
  description: 'Plataforma mobile de Facilities do T Group.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.className} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-50`}
      >
        {/* Container mobile centralizado, com vibe de app iOS */}
        <div className="mx-auto flex min-h-screen max-w-md flex-col px-3 py-4">
          {/* “Moldura” em liquid glass */}
          <div className="flex flex-1 flex-col rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl">
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400/90 text-xs font-bold text-slate-900 shadow-md">
                TF
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
                  T.Facilities Hub
                </span>
                <span className="text-sm font-semibold text-white">
                  Cuidando da casa do T Group
                </span>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}