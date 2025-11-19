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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-6 text-slate-50">
      {/* Cabeçalho fixo */}
      <header className="mx-auto mb-6 max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-amber-200">
          T Facilities • Central da liderança
        </p>
        <h1 className="mt-1 text-2xl font-semibold">
          {lider ? `Olá, ${lider.nome}` : 'Central do líder de Facilities'}
        </h1>
        <p className="mt-2 max-w-2xl text-[12px] text-slate-300">
          Esta é a tela única para o líder de Facilities operar o dia a dia:
          criar rotas para o time de limpeza, acompanhar o que foi planejado
          para hoje, monitorar problemas reportados nas salas e acessar os
          atalhos de gestão da plataforma.
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Recomende que o Bruno salve este endereço nos favoritos do navegador e
          acesse sempre por aqui.
        </p>
      </header>

      <section className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {/* Coluna esquerda */}
        <div className="space-y-4">
          {/* Card criação de rotas */}
          <section className="rounded-3xl border border-emerald-400/40 bg-white/10 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  Rotas do time
                </p>
                <h2 className="text-sm font-semibold">
                  Criar ou atualizar rota para o time
                </h2>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-50">
                Uso diário
              </span>
            </div>

            <p className="mb-3 text-[11px] text-slate-200">
              Use este bloco para montar a rota do dia para Giulia, Mateus e
              Adriana. Em poucos cliques, a plataforma cria a lista de ambientes
              que cada um precisa limpar, na ordem padrão.
            </p>

            {/* Placeholder simples por enquanto – depois a gente pluga o GeradorRotasBruno aqui */}
            {carregando ? (
              <p className="text-[11px] text-slate-300">
                Carregando colaboradores de Facilities...
              </p>
            ) : colaboradoresOperacionais.length === 0 ? (
              <p className="text-[11px] text-slate-300">
                Ainda não há colaboradores de Facilities ativos cadastrados além
                da liderança. Depois, podemos ativar aqui o criador de rotas em
                poucos cliques.
              </p>
            ) : (
              <div className="rounded-2xl border border-emerald-500/40 bg-black/40 p-3">
                <p className="mb-2 text-[11px] text-emerald-100">
                  Colaboradores operacionais detectados:
                </p>
                <ul className="space-y-1">
                  {colaboradoresOperacionais.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between text-[11px] text-slate-100"
                    >
                      <span>{c.nome}</span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-100">
                        Limpeza
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[10px] text-slate-400">
                  Na próxima versão, este bloco vira um formulário visual para o
                  Bruno montar a rota do dia arrastando as salas e os nomes.
                </p>
              </div>
            )}
          </section>

          {/* Card rotas de hoje */}
          <section className="rounded-3xl border border-white/15 bg-black/40 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Hoje
                </p>
                <h2 className="text-sm font-semibold">Rotas criadas para hoje</h2>
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
                Ainda não há rotas registradas para hoje. Assim que o Bruno
                criar uma rota, cada colaborador de Facilities verá apenas a sua
                lista na tela <span className="font-semibold">“Minha rota”</span>.
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
                          Data: {dataLabel} • Itens na rota:{' '}
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
          <section className="rounded-3xl border border-red-400/40 bg-red-500/10 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-red-200">
                  Problemas nas salas
                </p>
                <h2 className="text-sm font-semibold">
                  Feedbacks recentes marcados como PROBLEMA
                </h2>
              </div>
              <span className="rounded-full bg-red-500/30 px-3 py-1 text-[10px] font-semibold text-red-50">
                {dados?.feedbacksProblema?.length || 0} registro(s)
              </span>
            </div>

            {carregando ? (
              <p className="mt-2 text-[11px] text-red-100/80">
                Carregando feedbacks recentes...
              </p>
            ) : !dados || dados.feedbacksProblema.length === 0 ? (
              <p className="mt-2 text-[11px] text-red-100/80">
                Nenhum problema foi reportado recentemente pelas salas.
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
                      className="rounded-2xl border border-red-400/40 bg-black/40 px-3 py-2"
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
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">
              Gestão da plataforma
            </p>
            <h2 className="mt-1 text-sm font-semibold">
              Atalhos para telas avançadas
            </h2>
            <p className="mt-2 text-[11px] text-slate-200">
              Estes atalhos são pensados para uso eventual da liderança. No dia
              a dia, o foco do Bruno pode ser apenas este painel e a tela
              <span className="font-semibold"> “Minha rota”</span>.
            </p>

            <div className="mt-3 space-y-2">
              <Link
                href="/painel-facilities"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition hover:brightness-110"
              >
                Abrir painel completo de problemas e check-ins
              </Link>
              <Link
                href="/admin/ambientes"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-[11px] font-semibold text-slate-100 shadow-lg shadow-black/60 transition hover:border-amber-300/60 hover:text-amber-50"
              >
                Gerenciar ambientes e QR Codes
              </Link>
            </div>

            <p className="mt-2 text-[10px] text-slate-400">
              Reforce com o Bruno que os cadastros de ambientes e ajustes finos
              podem ser feitos com apoio da área de Gente & Cultura, se ele não
              se sentir confortável.
            </p>
          </section>

          {/* Caixa de erro geral (se deu ruim na API) */}
          {erro && (
            <section className="rounded-3xl border border-red-500/60 bg-red-950/60 p-4 text-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-red-200">
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
