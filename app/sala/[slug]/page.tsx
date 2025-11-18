// app/sala/[slug]/page.tsx
// @ts-nocheck
import { prisma } from '@/lib/prisma'

type Props = {
  params: { slug: string }
}

export default async function SalaStatusPage({ params }: Props) {
  const slug = params.slug

  // 1. Buscar o ambiente pelo slug do QR
  const ambiente = await prisma.ambiente.findUnique({
    where: { slugQr: slug },
  })

  if (!ambiente) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 text-slate-50">
        <div className="max-w-md rounded-3xl border border-red-500/40 bg-red-500/10 p-4 text-center shadow-[0_18px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          <h1 className="text-lg font-semibold">Sala não encontrada</h1>
          <p className="mt-2 text-[12px] text-slate-200">
            Não encontramos nenhuma sala vinculada ao QR Code{' '}
            <span className="font-mono text-slate-100">/sala/{slug}</span>.
          </p>
          <p className="mt-2 text-[11px] text-slate-300">
            Peça para a equipe de Facilities conferir se o ambiente está cadastrado
            corretamente no painel de ambientes.
          </p>
        </div>
      </main>
    )
  }

  // 2. Buscar check-ins e feedbacks desse ambiente
  const [checkins, feedbacks] = await Promise.all([
    prisma.checkinLimpeza.findMany({
      where: { ambienteId: ambiente.id },
    }),
    prisma.feedbackSala.findMany({
      where: { ambienteId: ambiente.id },
      take: 10,
    }),
  ])

  const ultimoCheckin = checkins[checkins.length - 1] ?? null

  const statusSala =
    (feedbacks[0]?.statusSala as string | undefined) ??
    (ultimoCheckin?.status as string | undefined) ??
    'SEM_INFO'

  const textoStatus =
    statusSala === 'OK'
      ? 'Ambiente reportado como OK recentemente.'
      : statusSala === 'PROBLEMA'
        ? 'Há registros recentes de problema nesta sala.'
        : 'Ainda não há registros suficientes para definir o status desta sala.'

  const corStatus =
    statusSala === 'OK'
      ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/60'
      : statusSala === 'PROBLEMA'
        ? 'bg-red-500/20 text-red-100 border-red-400/60'
        : 'bg-slate-500/20 text-slate-100 border-slate-400/60'

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-6 text-slate-50">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">
          Status da sala
        </p>
        <h1 className="text-xl font-semibold">{ambiente.nome}</h1>
        <p className="mt-1 text-[11px] text-slate-300">
          {ambiente.andar ?? 'Sem andar cadastrado'} •{' '}
          {ambiente.bloco ?? 'Sem bloco cadastrado'} •{' '}
          {ambiente.tipo ?? 'Tipo não informado'}
        </p>
      </header>

      <section className="mb-4 rounded-3xl border border-white/15 bg-white/10 p-4 text-xs shadow-[0_18px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
        <div
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${corStatus}`}
        >
          {statusSala === 'OK'
            ? 'Tudo ok'
            : statusSala === 'PROBLEMA'
              ? 'Com problema'
              : 'Em avaliação'}
        </div>
        <p className="mt-2 text-[12px] text-slate-100">
          {textoStatus}
        </p>
      </section>

      {/* Último check-in */}
      <section className="mb-4 rounded-3xl border border-white/15 bg-black/40 p-4 text-xs shadow-[0_18px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Última limpeza registrada
        </p>
        {ultimoCheckin ? (
          <>
            <p className="mt-1 text-[12px] text-slate-100">
              Status marcado como{' '}
              <span className="font-semibold">{ultimoCheckin.status}</span>.
            </p>
            {ultimoCheckin.observacoes && (
              <p className="mt-1 text-[11px] text-slate-300">
                Observações: {ultimoCheckin.observacoes}
              </p>
            )}
          </>
        ) : (
          <p className="mt-1 text-[11px] text-slate-300">
            Ainda não há nenhum check-in de limpeza registrado para esta sala.
          </p>
        )}
      </section>

      {/* Feedbacks recentes */}
      <section className="rounded-3xl border border-white/15 bg-black/40 p-4 text-xs shadow-[0_18px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Feedbacks recentes
        </p>

        {feedbacks.length === 0 ? (
          <p className="mt-2 text-[11px] text-slate-300">
            Nenhum feedback foi enviado para esta sala até o momento.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {feedbacks.map((fb) => {
              const dataFeedback = (fb.criadoEm || fb.createdAt) as
                | Date
                | string
                | undefined

              let textoData = ''
              if (dataFeedback) {
                const d = new Date(dataFeedback)
                textoData = d.toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }

              return (
                <li
                  key={fb.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-slate-100">
                      {fb.statusSala === 'OK' ? 'Tudo ok' : 'Problema'}
                    </span>
                    {textoData && (
                      <span className="text-[10px] text-slate-400">
                        {textoData}
                      </span>
                    )}
                  </div>
                  {fb.comentario && (
                    <p className="mt-1 text-[11px] text-slate-200">
                      {fb.comentario}
                    </p>
                  )}
                  {fb.emailContato && (
                    <p className="mt-1 text-[10px] text-slate-400">
                      Contato: {fb.emailContato}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
