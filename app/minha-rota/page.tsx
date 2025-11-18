'use client'

import { useMemo, useState } from 'react'
import { ambientes, rotas } from '../data'

export default function MinhaRotaPage() {
  const [email, setEmail] = useState('gc@agenciataj.com')
  const [statusByItem, setStatusByItem] = useState<Record<string, string>>({})
  const [obsByItem, setObsByItem] = useState<Record<string, string>>({})

  const rota = useMemo(
    () => rotas.find((r) => r.colaboradorEmail === email),
    [email],
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="rounded-lg border bg-amber-50 p-3 text-xs text-amber-900">
        <p className="font-semibold">Acesso do colaborador</p>
        <p className="mt-1">
          Informe o e-mail do colaborador de Facilities para ver a rota de hoje.
        </p>
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded border px-2 py-1 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@tgroup.com.br"
          />
        </div>
      </section>

      {!rota && (
        <p className="text-sm text-slate-500">
          Nenhuma rota encontrada para o e-mail informado.
        </p>
      )}

      {rota && (
        <section className="flex flex-col gap-3">
          <div className="rounded-lg border bg-slate-50 p-3 text-xs">
            <p className="font-semibold text-slate-800">{rota.colaboradorNome}</p>
            <p className="text-slate-500">{rota.colaboradorEmail}</p>
            <p className="mt-1 text-slate-500">
              Rota de hoje • Turno:{' '}
              <span className="font-semibold">{rota.turno}</span>
            </p>
            {rota.obsGeral && (
              <p className="mt-1 italic text-slate-500">Obs: {rota.obsGeral}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {rota.itens
              .slice()
              .sort((a, b) => a.ordem - b.ordem)
              .map((item) => {
                const ambiente = ambientes.find((a) => a.id === item.ambienteId)
                if (!ambiente) return null
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{ambiente.nome}</p>
                        <p className="text-xs text-slate-500">
                          Ordem {item.ordem} • Prioridade:{' '}
                          <span
                            className={
                              item.prioridade === 'Alta'
                                ? 'font-semibold text-red-600'
                                : item.prioridade === 'Média'
                                  ? 'font-semibold text-amber-600'
                                  : 'font-semibold text-slate-500'
                            }
                          >
                            {item.prioridade}
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {ambiente.andar} • {ambiente.bloco}
                        </p>
                      </div>
                    </div>

                    {item.checklist && (
                      <p className="mt-2 text-xs text-slate-600">
                        <span className="font-semibold">Checklist base: </span>
                        {item.checklist}
                      </p>
                    )}

                    <div className="mt-2 flex flex-col gap-2">
                      <label className="text-[11px] font-medium text-slate-600">
                        Status da sala
                      </label>
                      <select
                        className="w-full rounded border px-2 py-1 text-xs"
                        value={statusByItem[item.id] || 'LIMPO'}
                        onChange={(e) =>
                          setStatusByItem((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="LIMPO">LIMPO</option>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
                      </select>

                      <label className="text-[11px] font-medium text-slate-600">
                        Observações (apenas visual, ainda não salva)
                      </label>
                      <textarea
                        className="min-h-[60px] w-full rounded border px-2 py-1 text-xs"
                        placeholder="Ex: lixeira quebrada, falta de material..."
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
                        className="mt-1 w-full rounded bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                        onClick={() =>
                          alert(
                            `Aqui, na Fase 2, vamos salvar esse registro para ${ambiente.nome}.`,
                          )
                        }
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
