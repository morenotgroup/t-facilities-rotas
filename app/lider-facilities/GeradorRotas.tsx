// app/lider-facilities/GeradorRotas.tsx
'use client'

// @ts-nocheck
import { useState, useEffect } from 'react'

type Colaborador = {
  id: string
  nome: string
  email: string
}

type Props = {
  colaboradores: Colaborador[]
}

export function GeradorRotasBruno({ colaboradores }: Props) {
  const [email, setEmail] = useState<string>(
    colaboradores[0]?.email || '',
  )
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [detalhe, setDetalhe] = useState<{
    colaboradorNome: string
    itensCount: number
  } | null>(null)

  useEffect(() => {
    const hoje = new Date()
    const iso = hoje.toISOString().slice(0, 10) // AAAA-MM-DD
    setData(iso)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setMensagem(null)
    setDetalhe(null)

    if (!email) {
      setErro('Selecione um colaborador.')
      return
    }

    if (!data) {
      setErro('Selecione uma data.')
      return
    }

    try {
      setLoading(true)
      const url = `/api/gerar-rota?email=${encodeURIComponent(
        email,
      )}&data=${data}`

      const res = await fetch(url)
      const json = await res.json()

      if (!res.ok) {
        setErro(json.error || 'Erro ao gerar rota.')
        return
      }

      const msg =
        json.message || 'Rota criada ou atualizada com sucesso.'

      setMensagem(msg)

      if (json.rota && json.rota.itens) {
        const colabNome = json.colaborador?.nome || email
        setDetalhe({
          colaboradorNome: colabNome,
          itensCount: json.rota.itens.length,
        })
      }
    } catch (err: any) {
      setErro('Erro inesperado ao comunicar com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const colaboradorSelecionado = colaboradores.find(
    (c) => c.email === email,
  )

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 text-[11px] md:grid-cols-2"
      >
        <div className="space-y-1">
          <label className="block text-slate-200">
            Colaborador de Facilities
          </label>
          <select
            className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-300/80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            {colaboradores.map((c) => (
              <option key={c.id} value={c.email}>
                {c.nome} ({c.email})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-200">
            Data da rota (dia da limpeza)
          </label>
          <input
            type="date"
            className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-300/80"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Gerando rota...' : 'Criar / atualizar rota'}
          </button>
        </div>
      </form>

      {erro && (
        <p className="mt-2 text-[11px] text-red-300">{erro}</p>
      )}

      {mensagem && (
        <div className="mt-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
          <p className="font-semibold">{mensagem}</p>
          {detalhe && (
            <p className="mt-1 text-[11px] text-emerald-50">
              Rota de <span className="font-semibold">{detalhe.colaboradorNome}</span>{' '}
              com <span className="font-mono">{detalhe.itensCount}</span>{' '}
              ambientes planejados para {data.split('-').reverse().join('/')}.
            </p>
          )}
          {colaboradorSelecionado && (
            <p className="mt-1 text-[10px] text-emerald-200/90">
              Dica: peça para {colaboradorSelecionado.nome} acessar o app pelo
              link{' '}
              <span className="font-mono">
                /minha-rota
              </span>{' '}
              usando o e-mail{' '}
              <span className="font-mono">
                {colaboradorSelecionado.email}
              </span>
              .
            </p>
          )}
        </div>
      )}
    </div>
  )
}
