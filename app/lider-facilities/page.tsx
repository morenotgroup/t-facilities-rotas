// app/lider-facilities/page.tsx
'use client'
// @ts-nocheck

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Colab = {
  id: string
  nome: string
  email: string
  ativo: boolean
}

type RotaHoje = {
  id: string
  colabId: string
  data: string
  itens: { id: string }[]
}

type Feedback = {
  id: string
  comentario?: string | null
  emailContato?: string | null
  statusSala: string
  criadoEm?: string | Date | null
  createdAt?: string | Date | null
}

type DashboardData = {
  colaboradores: Colab[]
  rotasHoje: RotaHoje[]
  feedbacksProblema: Feedback[]
}

export default function LiderFacilitiesPage() {
  const [dados, setDados] = useState<DashboardData | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true)
        setErro(null)

        const resp = await fetch('/api/lider-dashboard', { cache: 'no-store' })
        const json = await resp.json()

        if (!json.ok) {
          setErro(
            json.error ||
              'Não foi possível carregar os dados do time de Facilities.',
          )
          setDados(null)
          return
        }

        setDados({
          colaboradores: json.colaboradores || [],
          rotasHoje: json.rotasHoje || [],
          feedbacksProblema: json.feedbacksProblema || [],
        })
      } catch (e) {
        console.error(e)
        setErro(
          'Não foi possível carregar os dados do time de Facilities. Tente novamente mais tarde.',
        )
        setDados(null)
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [])

  const lider =
    dados?.colaboradores?.find(
      (c) => c.email === 'facilities@agenciataj.com',
    ) || null

  const colaboradoresOperacionais =
    dados?.colaboradores?.filter(
      (c) =>
        c.email !== 'gc@agenciataj.com' && c.email !== 'facilities@agenciataj.com',
    ) || []

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050816] via-[#050816] to-[#020617] px-4 py-6 text-slate-50">
      {/* Cabeçalho */}
      <header className="mx-auto mb-6 max-w-4xl rounded-3xl border border-white/10 bg-black/50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200">
              T Facilities • Central da liderança
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              {lider ? `Olá, ${lider.nome}` : 'Central do líder de Facilities'}
            </h1>
            <p className="mt-1 text-[11px] text-slate-300">
              Aqui o líder organiza o dia, acompanha rotas e vê problemas das
              salas em um só painel.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-3 py-2 text-right text-[10px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40">
            <p>Rotas de Limpeza</p>
            <p className="text-[9px] opacity-80">Vista da liderança</p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {/* Coluna esquerda */}
        <div className="space-y-4">
          {/* Card criar rota */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  Rotas do time
                </p>
                <h2 className="text-sm font-semibold">Criar rota do dia</h2>
              </div>
              <span className="rounded-full bg-emerald-500/25 px-3 py-1 text-[10px] font-semibold text-emerald-50">
                Uso diário
              </span>
            </div>

            {carregando ? (
              <p className="text-[11px] text-slate-300">
                Carregando colaboradores de Facilities...
              </p>
            ) : colaboradoresOperacionais.length === 0 ? (
              <p className="text-[11px] text-slate-300">
                Cadastre primeiro o time de limpeza para montar rotas diárias.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="rounded-2xl border border-emerald-400/40 bg-black/50 p-3">
                  <p className="mb-2 text-[11px] text-emerald-100">
                    Pessoas na rota de limpeza:
                  </p>
                  <ul className="space-y-1">
                    {colaboradoresOperacionais.map((c) => (
                      <li
                        key={c.id}
                        className="flex items-center justify-between text-[11px] text-slate-100"
                      >
                        <span>{c.nome}</span>
                        <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] text-emerald-100">
                          Limpeza
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110"
                  disabled
                >
                  Criar rota automática (em breve)
                </button>
                <p className="text-[10px] text-slate-400">
                  Próximo passo: transformar este botão no gerador de rotas em
                  poucos cliques para o Bruno.
                </p>
              </div>
            )}
          </section>

          {/* Card rotas hoje */}
          <section className="rounded-3xl border border-white/10 bg-black/60 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">
                  Hoje
                </p>
                <h2 className="text-sm font-semibold">Rotas criadas</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-slate-100">
                {dados?.rotasHoje?.length || 0} rota(s)
              </span>
            </div>

            {carregando ? (
              <p className="mt-2 text-[11px] text-slate-300">
                Carregando rotas de hoje...
              </p>
            ) : !dados || dados.rotasHoje.length === 0 ? (
              <p className="mt-2 text-[11px] text-slate-300">
                Nenhuma rota criada ainda. Quando a rota do dia for montada, cada
                pessoa verá sua lista em{' '}
                <span className="font-semibold">“Minha rota”</span>.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {dados.rotasHoje.map((rota) => {
                  const colabNome =
                    dados.colaboradores.find((c) => c.id === rota.colabId)
                      ?.nome || 'Colaborador não identificado'

                  const dataLabel = rota.data
                    ? new Date(rota.data).toLocaleDateString('pt-BR')
                    : ''

                  return (
                    <li
                      key={rota.id}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2"
                    >
                      <div>
                        <p className="text-[12px] font-semibold text-slate-50">
                          {colabNome}
                        </p>
                        <p className="text-[10px] text-slate-300">
                          Data: {dataLabel} • Itens:{' '}
                          <span className="font-mono">
                            {rota.itens?.length || 0}
                          </span>
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Coluna direita */}
        <div className="space-y-4">
          {/* Problemas recentes */}
          <section className="rounded-3xl border border-red-500/50 bg-red-950/70 p-4 text-xs shadow-[0_22px_80px_rgba(0,0,0,0.95)] backdrop-blur-3xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-200">
                  Alertas das salas
                </p>
                <h2 className="text-sm font-semibold">Problemas recentes</h2>
              </div>
              <span className="rounded-full bg-red-500/30 px-3 py-1 text-[10px] font-semibold text-red-50">
                {dados?.feedbacksProblema?.length || 0} registro(s)
              </span>
            </div>

            {carregando ? (
              <p className="mt-2 text-[11px] text-red-100/80">
                Carregando feedbacks...
              </p>
            ) : !dados || dados.feedbacksProblema.length === 0 ? (
              <p className="mt-2 text-[11px] text-red-100/80">
                Nenhum problema marcado como <strong>PROBLEMA</strong> nas salas.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {dados.feedbacksProblema.map((fb) => {
                  const dataFeedback = fb.criadoEm || fb.createdAt
                  let textoData = ''

                  if (dataFeedback) {
                    const d = new Date(dataFeedback as any)
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
                      className="rounded-2xl border border-red-400/50 bg-black/50 px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold text-red-100">
                          Problema reportado
                        </span>
                        {textoData && (
                          <span className="text-[10px] text-red-200/80">
                            {textoData}
                          </span>
                        )}
                      </div>
                      {fb.comentario && (
                        <p className="mt-1 text-[11px] text-red-50">
                          {fb.comentario}
                        </p>
                      )}
                      {fb.emailContato && (
                        <p className="mt-1 text-[10px] text-red-200/80">
                          Contato: {fb.emailContato}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {/* Atalhos de gestão */}
          <section className="rounded-3xl border border-amber-400/50 bg-white/10 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200">
              Gestão avançada
            </p>
            <h2 className="mt-1 text-sm font-semibold">Atalhos principais</h2>
            <p className="mt-1 text-[11px] text-slate-200">
              Use estes atalhos só quando precisar ajustar cadastros ou ver
              detalhes mais profundos.
            </p>

            <div className="mt-3 space-y-2">
              <Link
                href="/painel-facilities"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition hover:brightness-110"
              >
                Painel de problemas e check-ins
              </Link>
              <Link
                href="/admin/ambientes"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-[11px] font-semibold text-slate-100 shadow-lg shadow-black/60 transition hover:border-amber-300/60 hover:text-amber-50"
              >
                Gerenciar ambientes e QR Codes
              </Link>
            </div>
          </section>

          {/* Caixa de erro geral */}
          {erro && (
            <section className="rounded-3xl border border-red-500/60 bg-red-950/70 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-red-200">
                Erro ao carregar dados
              </p>
              <p className="mt-1 text-[11px] text-red-50">{erro}</p>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
