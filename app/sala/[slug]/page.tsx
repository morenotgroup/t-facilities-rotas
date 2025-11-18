import { SalaFeedbackForm } from './SalaFeedbackForm'
// app/sala/[slug]/page.tsx
import { prisma } from '@/lib/prisma'

type SalaPageProps = {
  params: { slug: string }
}

export default async function SalaStatusPage({ params }: SalaPageProps) {
  const { slug } = params

  let ambiente = null
  let loadError: string | null = null

  try {
    ambiente = await prisma.ambiente.findFirst({
      where: { slugQr: slug },
      include: {
        checkins: {
          orderBy: { dataHora: 'desc' },
          take: 1,
          include: {
            colab: true,
          },
        },
      },
    })
  } catch (error) {
    console.error('Erro em /sala/[slug]', error)
    loadError = 'Erro interno ao carregar os dados desta sala.'
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 pb-8">
        <section className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/15 p-4 text-sm text-red-50 shadow-lg shadow-red-900/60 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-red-200">
            Erro interno
          </p>
          <p className="mt-1 text-sm font-semibold">
            Não foi possível carregar as informações desta sala.
          </p>
          <p className="mt-2 text-[11px] text-red-100/90">
            Avise a equipe de Facilities ou Gente &amp; Cultura para verificarem o
            sistema de rotas de limpeza.
          </p>
        </section>
      </div>
    )
  }

  if (!ambiente) {
    return (
      <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 pb-8">
        <section className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/15 p-4 text-sm text-red-50 shadow-lg shadow-red-900/60 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-red-200">
            QR não reconhecido
          </p>
          <p className="mt-1 text-sm font-semibold">
            Sala não encontrada
          </p>
          <p className="mt-2 text-[11px] text-red-100/90">
            Esse QR Code pode estar desatualizado ou a sala ainda não foi cadastrada
            no sistema de rotas de limpeza. Avise a equipe de Facilities ou Gente &amp;
            Cultura.
          </p>
        </section>
      </div>
    )
  }

  const ultimoCheckin = ambiente.checkins[0]

  let status = 'SEM REGISTROS'
  if (ultimoCheckin?.status === 'LIMPO') status = 'LIMPO'
  else if (ultimoCheckin?.status === 'PENDENTE') status = 'PENDENTE'
  else if (ultimoCheckin?.status === 'EM_ANDAMENTO') status = 'EM ANDAMENTO'

  const statusBadgeClasses =
    status === 'LIMPO'
      ? 'bg-emerald-500/15 text-emerald-100 border border-emerald-400/60'
      : status === 'PENDENTE'
        ? 'bg-amber-500/15 text-amber-100 border border-amber-400/60'
        : status === 'EM ANDAMENTO'
          ? 'bg-sky-500/15 text-sky-100 border border-sky-400/60'
          : 'bg-slate-500/20 text-slate-100 border border-slate-400/50'

  const dataHoraFormatada = ultimoCheckin
    ? new Date(ultimoCheckin.dataHora).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 pb-8">
      {/* Card principal com status da sala */}
      <section className="mt-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-50 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Status da sala
        </p>

        <div className="mt-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold">{ambiente.nome}</p>
            <p className="text-[11px] text-slate-200">
              {ambiente.andar ?? '—'} • {ambiente.bloco ?? '—'} •{' '}
              {ambiente.tipo ?? 'Ambiente T Group'}
            </p>
          </div>

          <div
            className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ${statusBadgeClasses}`}
          >
            {status}
          </div>
        </div>

        {ultimoCheckin ? (
          <div className="mt-4 rounded-2xl border border-white/15 bg-black/35 p-3 text-xs text-slate-50 shadow-inner shadow-black/70">
            <p>
              Última atualização:{' '}
              <span className="font-semibold">
                {dataHoraFormatada}
              </span>
            </p>
            <p className="mt-1">
              Responsável:{' '}
              <span className="font-semibold">
                {ultimoCheckin.colab.nome}
              </span>
            </p>
            {ultimoCheckin.observacoes && (
              <p className="mt-2 text-[11px] text-slate-100">
                <span className="font-semibold text-amber-200">Observações: </span>
                <span className="text-slate-200">
                  {ultimoCheckin.observacoes}
                </span>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-4 text-[11px] text-slate-200">
            Ainda não há registros de limpeza para esta sala. Assim que a equipe de
            Facilities registrar a primeira limpeza na rota, as informações vão
            aparecer aqui.
          </p>
        )}
      </section>

            {/* Card explicando o QR e feedback */}
      <section className="rounded-2xl border border-white/10 bg-white/6 p-4 text-xs text-slate-50 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        <p className="text-sm font-semibold">
          Como funciona este QR Code?
        </p>
        <p className="mt-2 text-[11px] text-slate-200">
          Este QR faz parte do sistema de rotas de limpeza do T Group. A equipe de
          Facilities registra cada limpeza no app interno, e aqui você consegue
          acompanhar o status da sala em tempo quase real.
        </p>
        <p className="mt-2 text-[11px] text-slate-200">
          Abaixo, você pode enviar um feedback rápido sobre a limpeza desta sala.
        </p>

        <SalaFeedbackForm ambienteId={ambiente.id} />
      </section>

    </div>
  )
}
