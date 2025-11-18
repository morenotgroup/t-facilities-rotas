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
        <p className="text-sm text-red-600">
          Sala não encontrada. Verifique se o QR Code está correto.
        </p>
      </div>
    )
  }

  const statusInfo = ultimoStatusPorAmbiente[ambiente.id]

  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="rounded-lg border bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">Status da sala</p>
        <p className="text-lg font-semibold text-slate-900">{ambiente.nome}</p>
        <p className="text-xs text-slate-500">
          {ambiente.andar} • {ambiente.bloco} • {ambiente.tipo}
        </p>

        {statusInfo ? (
          <div className="mt-3 rounded border border-slate-200 bg-white p-3 text-xs">
            <p>
              Última limpeza:{' '}
              <span className="font-semibold">
                {new Date(statusInfo.dataHoraISO).toLocaleString('pt-BR')}
              </span>
            </p>
            <p>
              Responsável:{' '}
              <span className="font-semibold">{statusInfo.responsavel}</span>
            </p>
            <p>
              Status:{' '}
              <span
                className={
                  statusInfo.status === 'LIMPO'
                    ? 'font-semibold text-emerald-600'
                    : statusInfo.status === 'PENDENTE'
                      ? 'font-semibold text-amber-600'
                      : 'font-semibold text-slate-700'
                }
              >
                {statusInfo.status}
              </span>
            </p>
            {statusInfo.observacoes && (
              <p className="mt-1 text-slate-600">Obs: {statusInfo.observacoes}</p>
            )}
          </div>
        ) : (
          <p className="mt-3 text-xs text-slate-500">
            Nenhum registro de limpeza encontrado ainda.
          </p>
        )}
      </section>

      <section className="rounded-lg border bg-white p-3 text-xs">
        <p className="font-semibold text-slate-800">Como está esta sala agora?</p>
        <p className="mt-1 text-slate-500">
          Na próxima versão vamos registrar esse feedback direto pra equipe de Facilities.
        </p>
      </section>
    </div>
  )
}
