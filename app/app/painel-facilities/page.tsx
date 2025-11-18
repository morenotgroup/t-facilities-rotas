// app/painel-facilities/page.tsx
import { prisma } from '@/lib/prisma'

export default async function PainelFacilitiesPage() {
  const problemas = await prisma.feedbackSala.findMany({
    where: { avaliacao: 'PROBLEMA' },
    orderBy: { dataHora: 'desc' },
    take: 30,
    include: {
      ambiente: true,
    },
  })

  const ultimosCheckins = await prisma.checkinLimpeza.findMany({
    orderBy: { dataHora: 'desc' },
    take: 20,
    include: {
      ambiente: true,
      colab: true,
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 pb-10 text-slate-50">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
            Painel Facilities
          </p>
          <h1 className="text-xl font-semibold">Status geral da casa</h1>
          <p className="text-[11px] text-slate-300">
            Visão rápida dos últimos problemas apontados e dos últimos check-ins de
            limpeza.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Coluna de problemas */}
        <section className="rounded-2xl border border-red-500/30 bg-red-500/8 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-red-100">
              Problemas recentes de limpeza
            </h2>
            <span className="rounded-full bg-red-500/25 px-3 py-1 text-[10px] font-semibold text-red-50">
              {problemas.length} registros
            </span>
          </div>

          {problemas.length === 0 ? (
            <p className="mt-3 text-[11px] text-red-100/80">
              Nenhum problema registrado recentemente. Continue assim 💜
            </p>
          ) : (
            <div className="mt-3 space-y-3 text-xs">
              {problemas.map((f) => (
                <article
                  key={f.id}
                  className="rounded-2xl border border-red-500/35 bg-black/45 p-3 shadow-inner shadow-black/70"
                >
                  <p className="text-[11px] font-semibold text-red-100">
                    {f.ambiente.nome}
                  </p>
                  <p className="text-[10px] text-red-200/90">
                    {new Date(f.dataHora).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {f.comentario && (
                    <p className="mt-1 text-[11px] text-red-50">
                      {f.comentario}
                    </p>
                  )}
                  {f.userEmail && (
                    <p className="mt-1 text-[10px] text-red-200/80">
                      Reportado por: <span className="font-medium">{f.userEmail}</span>
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Coluna de últimos check-ins */}
        <section className="rounded-2xl border border-white/15 bg-white/8 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Últimos check-ins de limpeza
            </h2>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-slate-50">
              {ultimosCheckins.length} registros
            </span>
          </div>

          {ultimosCheckins.length === 0 ? (
            <p className="mt-3 text-[11px] text-slate-200/80">
              Ainda não há check-ins registrados.
            </p>
          ) : (
            <div className="mt-3 space-y-3 text-xs">
              {ultimosCheckins.map((c) => {
                const status =
                  c.status === 'LIMPO'
                    ? 'LIMPO'
                    : c.status === 'PENDENTE'
                      ? 'PENDENTE'
                      : c.status === 'EM_ANDAMENTO'
                        ? 'EM ANDAMENTO'
                        : c.status

                const statusClasses =
                  c.status === 'LIMPO'
                    ? 'bg-emerald-500/18 text-emerald-100 border-emerald-400/70'
                    : c.status === 'PENDENTE'
                      ? 'bg-amber-500/18 text-amber-100 border-amber-400/70'
                      : 'bg-sky-500/18 text-sky-100 border-sky-400/70'

                return (
                  <article
                    key={c.id}
                    className="rounded-2xl border border-white/15 bg-black/40 p-3 shadow-inner shadow-black/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-50">
                          {c.ambiente.nome}
                        </p>
                        <p className="text-[10px] text-slate-300/90">
                          {new Date(c.dataHora).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          • {c.colab.nome}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${statusClasses}`}
                      >
                        {status}
                      </span>
                    </div>
                    {c.observacoes && (
                      <p className="mt-1 text-[11px] text-slate-100">
                        {c.observacoes}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
