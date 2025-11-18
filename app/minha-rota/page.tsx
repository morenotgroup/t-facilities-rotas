'use client'

import { useEffect, useState } from 'react'

type ApiItemRota = {
  id: string
  ordem: number
  prioridade: string
  checklist: string | null
  ambiente: {
    id: string
    nome: string
    andar: string | null
    bloco: string | null
    tipo: string | null
  }
}

type ApiResponse = {
  colaborador: {
    id: string
    nome: string
    email: string
  }
  rota: {
    id: string
    data: string
    turno: string
    obsGeral: string | null
    itens: ApiItemRota[]
  }
}

export default function MinhaRotaPage() {
  const [email, setEmail] = useState('gc@agenciataj.com')
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [statusByItem, setStatusByItem] = useState<Record<string, string>>({})
  const [obsByItem, setObsByItem] = useState<Record<string, string>>({})
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [photoPreviewByItem, setPhotoPreviewByItem] = useState<
    Record<string, string | null>
  >({})

  // === 1. Carregar rota da API ===
  const carregarRota = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/minha-rota?email=${encodeURIComponent(email)}`)
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao carregar rota')
      }
      const json = (await res.json()) as ApiResponse
      setData(json)
      // limpa estados...
  } catch (e: any) {
    setError(e.message)
    setData(null)
  } finally {
    setLoading(false)
  }
}

  // Carrega automaticamente na primeira abertura
  useEffect(() => {
    carregarRota()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // === 2. Funções auxiliares de UI ===

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handlePhotoChange = (itemId: string, file?: File | null) => {
    if (!file) {
      setPhotoPreviewByItem((prev) => ({ ...prev, [itemId]: null }))
      return
    }
    const url = URL.createObjectURL(file)
    setPhotoPreviewByItem((prev) => ({ ...prev, [itemId]: url }))
  }

  // === 3. Registrar limpeza (chama API /api/checkins) ===
  //
  // O fluxo é:
  // - a colaboradora escolhe STATUS (Limpo / Pendente / Em andamento)
  // - escreve alguma observação se precisar
  // - clica em "Registrar limpeza"
  // - isso faz um POST na API com email + ambiente + rota + status + obs
  //
  const registrarLimpeza = async (
    itemId: string,
    ambienteId: string,
    ambienteNome: string,
  ) => {
    if (!data) return

    const status = statusByItem[itemId] || 'LIMPO'
    const observacoes = obsByItem[itemId] || ''

    try {
      const res = await fetch('/api/checkins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          ambienteId,
          rotaId: data.rota.id,
          status,
          observacoes,
          fotoUrl: null, // na próxima fase vamos subir a foto real pro storage
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao registrar limpeza')
      }

      alert(`Limpeza registrada para ${ambienteNome}`)

      // limpa observação só desse item
      setObsByItem((prev) => ({ ...prev, [itemId]: '' }))
    } catch (e: any) {
      alert(e.message)
    }
  }

  const rota = data?.rota

  return (
    <div className="flex flex-col gap-4 p-4 pb-6">
      {/* Bloco de acesso / e-mail */}
      <section className="rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-slate-50 shadow-lg shadow-purple-900/40 backdrop-blur-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
          Acesso do colaborador
        </p>
        <p className="mt-1 text-[11px] text-slate-200/90">
          Use o e-mail corporativo da equipe de Facilities para carregar a rota de
          limpeza do dia.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[11px] text-slate-100 shadow-inner shadow-black/40">
            <input
              className="w-full bg-transparent text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@tgroup.com.br"
            />
          </div>
          <button
            type="button"
            onClick={carregarRota}
            className="rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-3 py-2 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110"
          >
            Atualizar
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-300/80">
          No dia a dia, cada colaborador de Facilities usará seu próprio e-mail para
          ver apenas a sua rota.
        </p>

        {loading && (
          <p className="mt-2 text-[10px] text-amber-200">
            Carregando rota de hoje...
          </p>
        )}
        {error && (
          <p className="mt-2 text-[10px] text-red-300">
            {error}
          </p>
        )}
      </section>

      {/* Se não tiver rota */}
      {!rota && !loading && !error && (
        <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-100 shadow-lg shadow-red-900/40 backdrop-blur-xl">
          <p className="font-semibold">Nenhuma rota encontrada</p>
          <p className="mt-1 text-[11px]">
            Verifique se o e-mail está correto ou se já existe uma rota cadastrada
            para hoje no sistema.
          </p>
        </section>
      )}

      {/* Se tiver rota carregada */}
      {rota && data && (
        <>
          {/* Card com resumo da rota / colaborador */}
          <section className="rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-slate-50 shadow-lg shadow-purple-900/40 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
                  Rota de hoje
                </p>
                <p className="text-sm font-semibold">{data.colaborador.nome}</p>
                <p className="text-[11px] text-slate-300">
                  {data.colaborador.email}
                </p>
              </div>
              <div className="rounded-xl bg-black/40 px-3 py-1 text-[10px] font-medium text-amber-100 shadow-inner shadow-black/60">
                Turno:{' '}
                <span className="font-semibold">
                  {rota.turno}
                </span>
              </div>
            </div>
            {rota.obsGeral && (
              <p className="mt-2 text-[11px] text-slate-200">
                <span className="font-semibold text-amber-200">Obs: </span>
                {rota.obsGeral}
              </p>
            )}
          </section>

          {/* Lista de ambientes da rota */}
          <section className="flex flex-col gap-3">
            {rota.itens.map((item) => {
              const ambiente = item.ambiente
              const expanded = expandedItems[item.id]
              const statusAtual = statusByItem[item.id] || 'LIMPO'
              const fotoPreview = photoPreviewByItem[item.id] || null

              return (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-white/10 bg-white/8 p-3 text-xs text-slate-50 shadow-lg shadow-black/50 backdrop-blur-2xl transition hover:border-amber-300/40 hover:bg-white/12"
                >
                  {/* Cabeçalho do card */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{ambiente.nome}</p>
                      <p className="text-[11px] text-slate-300">
                        Ordem {item.ordem} • {ambiente.andar ?? '-'} •{' '}
                        {ambiente.bloco ?? '-'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          item.prioridade === 'Alta'
                            ? 'bg-red-500/20 text-red-200 border border-red-400/40'
                            : item.prioridade === 'Média'
                              ? 'bg-amber-500/15 text-amber-100 border border-amber-400/40'
                              : 'bg-slate-500/20 text-slate-100 border border-slate-400/40'
                        }`}
                      >
                        {item.prioridade}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] text-slate-200 transition group-hover:border-amber-300/60 group-hover:text-amber-100"
                      >
                        <span>{expanded ? 'Recolher' : 'Detalhar'}</span>
                        <span className={`transition ${expanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo recolhível */}
                  {expanded && (
                    <div className="mt-3 space-y-3">
                      {item.checklist && (
                        <p className="rounded-xl bg-black/35 px-3 py-2 text-[11px] text-slate-100">
                          <span className="font-semibold text-amber-200">
                            Checklist base:{' '}
                          </span>
                          {item.checklist}
                        </p>
                      )}

                      {/* Status */}
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-100">
                          Status da sala
                        </p>
                        <div className="flex gap-1 text-[10px]">
                          {['LIMPO', 'PENDENTE', 'EM_ANDAMENTO'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setStatusByItem((prev) => ({
                                  ...prev,
                                  [item.id]: opt,
                                }))
                              }
                              className={`flex-1 rounded-full border px-2 py-1 transition ${
                                statusAtual === opt
                                  ? opt === 'LIMPO'
                                    ? 'border-emerald-400/70 bg-emerald-500/25 text-emerald-100'
                                    : opt === 'PENDENTE'
                                      ? 'border-amber-400/70 bg-amber-500/25 text-amber-100'
                                      : 'border-sky-400/70 bg-sky-500/25 text-sky-100'
                                  : 'border-white/15 bg-black/30 text-slate-300 hover:border-amber-300/50 hover:text-amber-100'
                              }`}
                            >
                              {opt === 'LIMPO'
                                ? 'Limpo'
                                : opt === 'PENDENTE'
                                  ? 'Pendente'
                                  : 'Em andamento'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Observações */}
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-100">
                          Observações
                        </p>
                        <textarea
                          className="min-h-[68px] w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                          placeholder="Ex: lixeira quebrada, falta de material, algo fora do padrão..."
                          value={obsByItem[item.id] || ''}
                          onChange={(e) =>
                            setObsByItem((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* Upload de foto (apenas preview local por enquanto) */}
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-100">
                          Foto da limpeza ou ocorrência (demo)
                        </p>
                        <div className="flex items-center gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-medium text-slate-100 shadow-inner shadow-black/50 hover:border-amber-300/60 hover:text-amber-100">
                            <span>Escolher arquivo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoChange(
                                  item.id,
                                  e.target.files?.[0] ?? null,
                                )
                              }
                            />
                          </label>
                          {fotoPreview && (
                            <span className="text-[10px] text-emerald-200">
                              Foto selecionada ✅
                            </span>
                          )}
                        </div>
                        {fotoPreview && (
                          <div className="mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black/40">
                            {/* preview simples */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fotoPreview}
                              alt={`Pré-visualização da foto da sala ${ambiente.nome}`}
                              className="max-h-40 w-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Botão de registrar limpeza */}
                      <button
                        type="button"
                        onClick={() =>
                          registrarLimpeza(item.id, ambiente.id, ambiente.nome)
                        }
                        className="mt-1 w-full rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110"
                      >
                        Registrar limpeza
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </section>
        </>
      )}
    </div>
  )
}
