// app/minha-rota/page.tsx
'use client'

import { useState } from 'react'

type Ambiente = {
  id: string
  nome: string
  localizacao?: string | null
  slug: string
}

type RotaItem = {
  id: string
  ordem: number
  prioridade?: string | null
  ambiente: Ambiente | null
}

type RotaDia = {
  id: string
  data: string
  obsGeral?: string | null
  colaborador: {
    id: string
    nome: string
    email: string
  }
  itens: RotaItem[]
}

export default function MinhaRotaPage() {
  const [email, setEmail] = useState('gc@agenciataj.com')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [rota, setRota] = useState<RotaDia | null>(null)

  async function carregarRota() {
    setCarregando(true)
    setErro(null)
    setMensagem(null)
    setRota(null)

    try {
      const res = await fetch(`/api/minha-rota?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const data = await res.json().catch(() => null)

      if (!data) {
        setErro('Não foi possível interpretar a resposta do servidor.')
        return
      }

      if (!data.ok) {
        setErro(data.error || 'Erro ao carregar rota.')
        return
      }

      // ok: true
      if (!data.rota) {
        setMensagem(
          data.message ||
            'Ainda não há rota registrada para hoje para este colaborador.',
        )
        setRota(null)
        return
      }

      setRota({
        ...data.rota,
        data: data.rota.data,
      })
    } catch (e) {
      console.error(e)
      setErro('Erro de comunicação com o servidor.')
    } finally {
      setCarregando(false)
    }
  }

  function formatarDataBr(iso: string) {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch {
      return iso
    }
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 px-4 py-8 text-slate-50">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
        {/* Cabeçalho */}
        <header className="mb-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-amber-200">
            T Facilities
          </p>
          <h1 className="mt-1 text-xl font-semibold leading-tight">
            Rotas de Limpeza
          </h1>
          <p className="mt-1 text-[12px] text-slate-300">
            Use seu e-mail corporativo de Facilities para ver a rota de limpeza
            planejada para hoje.
          </p>
        </header>

        {/* Card de acesso */}
        <section className="mb-4 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-fuchsia-500/15 p-4 text-[12px] shadow-inner shadow-black/60">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-amber-100">
            ACESSO DO COLABORADOR
          </p>

          <label className="mb-1 block text-[11px] text-amber-50/90">
            E-mail corporativo
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-2xl bg-black/40 px-3 py-2 text-[12px] text-slate-50 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={carregarRota}
              disabled={carregando || !email}
              className="rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-4 py-2 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? 'Carregando...' : 'Atualizar'}
            </button>
          </div>

          <p className="text-[11px] text-amber-50/80">
            No dia a dia, Giulia, Mateus e Adriana usarão o próprio e-mail para
            ver apenas a sua rota.
          </p>

          {erro && (
            <p className="mt-2 text-[11px] font-medium text-red-200">
              {erro}
            </p>
          )}

          {mensagem && !erro && (
            <p className="mt-2 text-[11px] text-amber-100/90">{mensagem}</p>
          )}
        </section>

        {/* Rota carregada */}
        {rota && (
          <section className="mt-3 space-y-3 text-[12px]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
                Resumo da rota
              </p>
              <p className="mt-1 text-[13px] font-semibold text-slate-50">
                {rota.colaborador.nome}
              </p>
              <p className="text-[11px] text-slate-300">
                Data:{' '}
                <span className="font-mono">
                  {formatarDataBr(rota.data)}
                </span>
              </p>
              {rota.obsGeral && (
                <p className="mt-2 text-[11px] text-slate-200">
                  Observações gerais: {rota.obsGeral}
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
                Salas da rota
              </p>

              {rota.itens.length === 0 ? (
                <p className="mt-2 text-[11px] text-slate-300">
                  Não há ambientes cadastrados nesta rota.
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {rota.itens.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-3 py-2"
                    >
                      <div>
                        <p className="text-[12px] font-semibold text-slate-50">
                          {item.ambiente?.nome ?? 'Ambiente sem nome'}
                        </p>
                        <p className="text-[10px] text-slate-300">
                          Ordem{' '}
                          <span className="font-mono">{item.ordem}</span>
                          {item.ambiente?.localizacao
                            ? ` • ${item.ambiente.localizacao}`
                            : null}
                        </p>
                      </div>
                      {item.prioridade && (
                        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-semibold text-amber-100">
                          {item.prioridade}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
