import { ambientes, ultimoStatusPorAmbiente } from '@/app/data'

type Props = {
  params: { slug: string }
}

export default function SalaStatusPage({ params }: Props) {
  const { slug } = params

  const ambiente = ambientes.find((a) => a.slug === slug)

  if (!ambiente) {
    return (
      <div className="p-4">
        <section className="rounded-2xl border border-red-500/40 bg-red-500/15 p-4 text-sm text-red-50 shadow-lg shadow-red-900/50 backdrop-blur-xl">
          <p className="font-semibold">Sala não encontrada</p>
          <p className="mt-1 text-xs text-red-100/90">
            O QR Code pode estar desatualizado. Avise a equipe de Facilities ou
            Gente &amp; Cultura.
          </p>
        </section>
      </div>
    )
  }

  const statusInfo = ultimoStatusPorAmbiente[ambiente.id]

  const statusBadge =
    statusInfo?.status === 'LIMPO'
      ? 'bg-emerald-500/15 text-emerald-100 border border-emerald-400/50'
      : statusInfo?.status === 'PENDENTE'
        ? 'bg-amber-500/15 text-amber-100 border border-amber-400/50'
        : 'bg-slate-500/20 text-slate-100 border border-slate-400/40'

  return (
    <div className="flex flex-col gap-4 p-4 pb-6">
      <section className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-50 shadow-lg shadow-purple-900/50 backdrop-blur-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Status da sala
        </p>
        <div className="mt-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold">{ambiente.nome}</p>
            <p className="text-[11px] text-slate-200">
              {ambiente.andar} • {ambiente.bloco} • {ambiente.tipo}
            </p>
          </div>
          <div
            className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ${statusBadge}`}
          >
            {statusInfo?.status ?? 'SEM REGISTROS'}
          </div>
        </div>

        {statusInfo ? (
          <div className="mt-3 rounded-2xl border border-white/15 bg-black/35 p-3 text-xs text-slate-50 shadow-inner shadow-black/60">
            <p>
              Última limpeza:{' '}
              <span className="font-semibold">
                {new Date(statusInfo.dataHoraISO).toLocaleString('pt-BR')}
              </span>
            </p>
            <p className="mt-1">
              Responsável:{' '}
              <span className="font-semibold">{statusInfo.responsavel}</span>
            </p>
            {statusInfo.observacoes && (
              <p className="mt-1 text-slate-100">
                Obs:{' '}
                <span className="text-slate-200">{statusInfo.observacoes}</span>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-3 text-xs text-slate-200">
            Ainda não há registro de limpeza para esta sala.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/6 p-4 text-xs text-slate-50 shadow-lg shadow-black/50 backdrop-blur-2xl">
        <p className="font-semibold text-sm">Como você encontrou esta sala?</p>
        <p className="mt-1 text-[11px] text-slate-200">
          Em breve, este espaço será usado para enviar feedback direto para a equipe
          de Facilities (ocorrências, elogios e problemas).
        </p>
        <p className="mt-2 text-[11px] text-slate-300">
          Por enquanto, se algo estiver fora do padrão, chame Gente &amp; Cultura ou
          envie uma mensagem no grupo oficial da empresa.
        </p>
      </section>
    </div>
  )
}
