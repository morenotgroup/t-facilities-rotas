'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import {
  getAmbienteById,
  getRotaDoDiaPorEmail,
  getTodasRotasDoDia,
  StatusLimpeza,
  RotaDia,
  ItemRota,
} from './data'

function formatDateBr(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  })
    .replace('-feira', '')
    .replace(/\b./, (c) => c.toUpperCase())
}

function chipStatus(status: StatusLimpeza) {
  if (status === 'LIMPO') {
    return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
  }
  if (status === 'PENDENTE') {
    return 'bg-amber-500/20 text-amber-200 border-amber-400/40'
  }
  return 'bg-slate-500/20 text-slate-200 border-slate-400/40'
}

export default function LimpezaPage() {
  const user = mockCurrentUser

  // se for líder/super admin, ele pode selecionar colaborador
  const todasRotas = useMemo(() => getTodasRotasDoDia(), [])
  const emailsDisponiveis = Array.from(
    new Set(todasRotas.map((r) => r.colaboradorEmail)),
  )

  const [emailSelecionado, setEmailSelecionado] = useState<string>(
    user.role === 'LIMPEZA' ? user.email : emailsDisponiveis[0] ?? '',
  )

  const rotaAtual = useMemo<RotaDia | undefined>(
    () => getRotaDoDiaPorEmail(emailSelecionado),
    [emailSelecionado],
  )

  // estados locais de status/observações por item
  const [statusByItem, setStatusByItem] = useState<Record<string, StatusLimpeza>>({})
  const [obsByItem, setObsByItem] = useState<Record<string, string>>({})

  const isLider =
    user.role === 'LIDER_FACILITIES' || user.role === 'SUPER_ADMIN'
  const isColabLimpeza = user.role === 'LIMPEZA'

  const podeTrocarColaborador = isLider // só líder/super admin mudam email

  const handleRegistrarLimpeza = (item: ItemRota, rota: RotaDia) => {
    const status = statusByItem[item.id] || 'LIMPO'
    const obs = obsByItem[item.id] || ''

    // DEMO: aqui no futuro vai entrar chamada pra API / banco
    alert(
      [
        `Registro de limpeza (DEMO)`,
        `Colaborador: ${rota.colaboradorNome}`,
        `Ambiente: ${getAmbienteById(item.ambienteId)?.nome ?? '–'}`,
        `Status: ${status}`,
        obs ? `Obs: ${obs}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )

    // opcional: limpar o campo de observação
    setObsByItem((prev) => ({ ...prev, [item.id]: '' }))
  }

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Limpeza – Rota do dia
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      {/* Informação contextual */}
      <section className="rounded-2xl border border-white/10 bg-white/10 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
          Organização não é detalhe
        </p>
        <p className="mt-1 text-[11px] text-amber-100/90">
          Aqui você vê a sua rota de limpeza do dia, na ordem em que as salas devem ser
          feitas, e registra o estado de cada ambiente.
        </p>
      </section>

      {/* Se for líder, pode escolher o colaborador cuja rota quer enxergar */}
      {podeTrocarColaborador && emailsDisponiveis.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100 backdrop-blur">
          <p className="text-[11px] font-semibold text-slate-50">
            Visualizar rota de qual colaborador?
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-white/20 bg-slate-900/60 px-2 py-1 text-xs text-slate-50"
            value={emailSelecionado}
            onChange={(e) => setEmailSelecionado(e.target.value)}
          >
            {emailsDisponiveis.map((email) => {
              const rota = getRotaDoDiaPorEmail(email)
              return (
                <option key={email} value={email}>
                  {rota?.colaboradorNome ?? email} – {email}
                </option>
              )
            })}
          </select>
        </section>
      )}

      {/* Se for colaborador de limpeza, reforça que ele está vendo só a rota dele */}
      {isColabLimpeza && (
        <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-[11px] text-emerald-100">
          <p className="font-semibold">Esta é a sua rota de hoje.</p>
          <p className="mt-1">
            Vá seguindo a ordem dos ambientes. Ao terminar cada um, registre o status para
            que o time saiba o que já foi feito.
          </p>
        </section>
      )}

      {/* Caso não exista rota */}
      {!rotaAtual && (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-amber-100/90">
          Nenhuma rota encontrada para hoje com o e-mail{' '}
          <span className="font-semibold">{emailSelecionado}</span>. Quando as rotas
          estiverem cadastradas pelo líder de Facilities, elas aparecem aqui
          automaticamente.
        </p>
      )}

      {/* Rota encontrada */}
      {rotaAtual && (
        <section className="flex flex-1 flex-col gap-3 pb-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/80">
              Rota de hoje
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {rotaAtual.colaboradorNome}
            </p>
            <p className="text-[11px] text-slate-200/80">
              {rotaAtual.colaboradorEmail}
            </p>
            <p className="mt-2 text-[11px] text-slate-200/80">
              Dia:{' '}
              <span className="font-semibold">{formatDateBr(rotaAtual.dataISO)}</span> •
              Turno:{' '}
              <span className="font-semibold text-amber-200">
                {rotaAtual.turno}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {rotaAtual.itens
              .slice()
              .sort((a, b) => a.ordem - b.ordem)
              .map((item) => {
                const ambiente = getAmbienteById(item.ambienteId)
                if (!ambiente) return null

                const statusAtual: StatusLimpeza = statusByItem[item.id] || 'LIMPO'

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/12 bg-white/8 p-3 text-xs text-slate-100 backdrop-blur-md shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{ambiente.nome}</p>
                        <p className="text-[11px] text-slate-200/80">
                          Ordem {item.ordem} • Prioridade:{' '}
                          <span
                            className={
                              item.prioridade === 'Alta'
                                ? 'font-semibold text-red-300'
                                : item.prioridade === 'Média'
                                  ? 'font-semibold text-amber-200'
                                  : 'font-semibold text-slate-200'
                            }
                          >
                            {item.prioridade}
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {ambiente.andar} • {ambiente.bloco} • {ambiente.tipo}
                        </p>
                      </div>

                      <div
                        className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${chipStatus(statusAtual)}`}
                      >
                        {statusAtual === 'LIMPO' && 'Limpo'}
                        {statusAtual === 'PENDENTE' && 'Pendente'}
                        {statusAtual === 'EM_ANDAMENTO' && 'Em andamento'}
                      </div>
                    </div>

                    {item.checklist && (
                      <p className="mt-2 text-[11px] text-slate-100/90">
                        <span className="font-semibold">Checklist base: </span>
                        {item.checklist}
                      </p>
                    )}

                    <div className="mt-3 flex flex-col gap-2">
                      <label className="text-[10px] font-medium text-slate-200">
                        Status da sala
                      </label>
                      <select
                        className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
                        value={statusAtual}
                        onChange={(e) =>
                          setStatusByItem((prev) => ({
                            ...prev,
                            [item.id]: e.target.value as StatusLimpeza,
                          }))
                        }
                      >
                        <option value="LIMPO">LIMPO</option>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
                      </select>

                      <label className="text-[10px] font-medium text-slate-200">
                        Observações (opcional)
                      </label>
                      <textarea
                        className="min-h-[60px] w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
                        placeholder="Ex: lixeira quebrada, falta de material, algo fora do padrão..."
                        value={obsByItem[item.id] || ''}
                        onChange={(e) =>
                          setObsByItem((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                      />

                      <button
                        type="button"
                        onClick={() => handleRegistrarLimpeza(item, rotaAtual)}
                        className="mt-1 w-full rounded-xl bg-emerald-500 px-3 py-2 text-[11px] font-semibold text-slate-900 shadow hover:bg-emerald-400"
                      >
                        Registrar limpeza (demo)
                      </button>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      )}
    </div>
  )
}