'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import {
  pedidosFake,
  PedidoCompra,
  CategoriaCompra,
  StatusPedido,
  ItemPedido,
} from './data'

const labelCategoria: Record<CategoriaCompra, string> = {
  LIMPEZA: 'Limpeza',
  COZINHA: 'Cozinha',
}

const labelStatus: Record<StatusPedido, string> = {
  ABERTO: 'Aberto',
  EM_COMPRA: 'Em compra',
  CONCLUIDO: 'Concluído',
}

const chipStatusColor: Record<StatusPedido, string> = {
  ABERTO: 'bg-amber-500/20 text-amber-100 border-amber-400/50',
  EM_COMPRA: 'bg-sky-500/20 text-sky-100 border-sky-400/50',
  CONCLUIDO: 'bg-emerald-500/20 text-emerald-100 border-emerald-400/50',
}

function formatDateTimeBr(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ComprasPage() {
  const user = mockCurrentUser

  const podeCriarPedido =
    user.role === 'LIMPEZA' ||
    user.role === 'COZINHA' ||
    user.role === 'LIDER_FACILITIES' ||
    user.role === 'SUPER_ADMIN'

  const podeAlterarStatus =
    user.role === 'LIDER_FACILITIES' || user.role === 'SUPER_ADMIN'

  const [pedidos, setPedidos] = useState<PedidoCompra[]>(() =>
    pedidosFake.slice().sort((a, b) => (a.criadoEmISO > b.criadoEmISO ? -1 : 1)),
  )

  // estados do formulário
  const [categoria, setCategoria] = useState<CategoriaCompra>('LIMPEZA')
  const [itensTexto, setItensTexto] = useState('')
  const [urgenciaGeral, setUrgenciaGeral] = useState<'Alta' | 'Média' | 'Baixa'>('Média')
  const [obsGeral, setObsGeral] = useState('')
  const [sending, setSending] = useState(false)

  const pedidosAbertos = useMemo(
    () => pedidos.filter((p) => p.status !== 'CONCLUIDO'),
    [pedidos],
  )
  const pedidosConcluidos = useMemo(
    () => pedidos.filter((p) => p.status === 'CONCLUIDO'),
    [pedidos],
  )

  const handleChangeStatus = (id: string, novoStatus: StatusPedido) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)),
    )
  }

  const handleCriarPedido = () => {
    if (!itensTexto.trim()) {
      alert('Descreva pelo menos um item que precisa ser comprado.')
      return
    }
    setSending(true)
    // transforma o texto em itens simples (uma linha por item)
    const linhas = itensTexto
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    const itens: ItemPedido[] = linhas.map((linha, idx) => {
      // Ex: "Detergente neutro - 5 unidades"
      const [nomeParte, qtdParte] = linha.split('-')
      return {
        id: `novo-item-${Date.now()}-${idx}`,
        nome: nomeParte.trim(),
        quantidade: qtdParte?.trim() || undefined,
        urgencia: urgenciaGeral,
      }
    })

    const novoPedido: PedidoCompra = {
      id: `novo-pedido-${Date.now()}`,
      categoria,
      criadoPor: user.name,
      criadoPorEmail: user.email,
      criadoEmISO: new Date().toISOString(),
      status: 'ABERTO',
      itens,
      obsGeral: obsGeral.trim() || undefined,
    }

    setPedidos((prev) => [novoPedido, ...prev])
    setItensTexto('')
    setObsGeral('')
    setCategoria('LIMPEZA')
    setUrgenciaGeral('Média')
    setSending(false)

    alert('Pedido de compra registrado (demo). Na versão com banco isso será salvo.')
  }

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Compras de Facilities</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/10 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
          Pedido de materiais
        </p>
        <p className="mt-1 text-[11px] text-amber-100/90">
          Use essa tela para registrar tudo o que precisa ser comprado para limpeza e
          cozinha. O líder de Facilities acompanha por aqui e atualiza o status dos
          pedidos.
        </p>
      </section>

      {/* Lista de pedidos abertos */}
      <section className="flex flex-col gap-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200/80">
          Pedidos em andamento
        </p>

        {pedidosAbertos.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/80">
            Não há pedidos de compra em aberto no momento.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {pedidosAbertos.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/12 bg-white/6 p-3 text-xs text-slate-100 backdrop-blur-md shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">
                    {labelCategoria[p.categoria]}
                  </p>
                  <p className="text-[11px] text-slate-200/90">
                    Pedido de {p.criadoPor} • {p.criadoPorEmail}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Criado em {formatDateTimeBr(p.criadoEmISO)}
                  </p>
                </div>
                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${chipStatusColor[p.status]}`}
                >
                  {labelStatus[p.status]}
                </div>
              </div>

              <div className="mt-2 space-y-1">
                {p.itens.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 text-[11px]">
                    <span className="mt-[2px] text-amber-200/90">•</span>
                    <div className="flex-1">
                      <span className="font-semibold">{item.nome}</span>
                      {item.quantidade && (
                        <span className="text-slate-100/90">
                          {' '}
                          – {item.quantidade}
                        </span>
                      )}
                      {item.urgencia && (
                        <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-[1px] text-[10px] text-amber-100">
                          Urgência: {item.urgencia}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {p.obsGeral && (
                <p className="mt-2 text-[11px] text-slate-100/85">
                  <span className="font-semibold">Observações: </span>
                  {p.obsGeral}
                </p>
              )}

              {podeAlterarStatus && (
                <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  <span className="text-slate-200/80">Atualizar status:</span>
                  <button
                    type="button"
                    onClick={() => handleChangeStatus(p.id, 'ABERTO')}
                    className="rounded-full border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-amber-100 hover:bg-amber-500/30"
                  >
                    Aberto
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeStatus(p.id, 'EM_COMPRA')}
                    className="rounded-full border border-sky-400/50 bg-sky-500/15 px-2 py-1 text-sky-100 hover:bg-sky-500/30"
                  >
                    Em compra
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeStatus(p.id, 'CONCLUIDO')}
                    className="rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-1 text-emerald-100 hover:bg-emerald-500/30"
                  >
                    Concluído
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pedidos concluídos (colapsado simples) */}
      {pedidosConcluidos.length > 0 && (
        <section className="mt-2 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200/80">
            Já concluídos
          </p>
          <div className="flex flex-col gap-2">
            {pedidosConcluidos.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-[11px] text-emerald-50 backdrop-blur"
              >
                <p className="font-semibold">
                  {labelCategoria[p.categoria]} – {p.criadoPor}
                </p>
                <p className="text-emerald-100/80">
                  Concluído em {formatDateTimeBr(p.criadoEmISO)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formulário de novo pedido */}
      {podeCriarPedido && (
        <section className="mt-2 rounded-2xl border border-white/15 bg-white/8 p-3 text-xs text-slate-100 backdrop-blur-md">
          <p className="text-[11px] font-semibold text-slate-50">
            Novo pedido de compra
          </p>
          <p className="mt-1 text-[11px] text-slate-200/80">
            Descreva os itens que você precisa. O líder de Facilities vai usar essas
            informações para organizar as compras.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <label className="text-[10px] font-medium text-slate-200">
              Área do pedido
            </label>
            <select
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as CategoriaCompra)}
            >
              <option value="LIMPEZA">Limpeza</option>
              <option value="COZINHA">Cozinha</option>
            </select>

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Itens necessários
              <span className="ml-1 text-[10px] text-slate-400">
                (1 item por linha. Ex.: &quot;Detergente neutro - 5 unidades&quot;)
              </span>
            </label>
            <textarea
              className="min-h-[90px] w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={itensTexto}
              onChange={(e) => setItensTexto(e.target.value)}
              placeholder="Detergente neutro - 5 unidades&#10;Pano de chão - 10 unidades"
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Urgência geral do pedido
            </label>
            <select
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={urgenciaGeral}
              onChange={(e) =>
                setUrgenciaGeral(e.target.value as 'Alta' | 'Média' | 'Baixa')
              }
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Observações adicionais (opcional)
            </label>
            <textarea
              className="min-h-[60px] w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={obsGeral}
              onChange={(e) => setObsGeral(e.target.value)}
              placeholder="Ex.: comprar até quarta, combinar com mercado do dia X..."
            />

            <button
              type="button"
              disabled={sending}
              onClick={handleCriarPedido}
              className="mt-3 w-full rounded-xl bg-amber-400 px-3 py-2 text-[11px] font-semibold text-slate-900 shadow hover:bg-amber-300 disabled:opacity-60"
            >
              {sending ? 'Enviando...' : 'Registrar pedido (demo)'}
            </button>
          </div>
        </section>
      )}
    </div>
  )
}