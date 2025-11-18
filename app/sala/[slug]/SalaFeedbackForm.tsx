// app/sala/[slug]/SalaFeedbackForm.tsx
'use client'

import { useState } from 'react'

type Props = {
  ambienteId: string
}

export function SalaFeedbackForm({ ambienteId }: Props) {
  const [avaliacao, setAvaliacao] = useState<'OK' | 'PROBLEMA' | null>(null)
  const [comentario, setComentario] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!avaliacao) {
      setError('Selecione se está tudo ok ou se há um problema.')
      return
    }

    try {
      setSending(true)
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ambienteId,
          avaliacao,
          comentario,
          userEmail: userEmail || null,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao enviar feedback.')
      }

      setMessage('Feedback enviado com sucesso. Obrigado pela ajuda 😊')
      setComentario('')
      setAvaliacao(null)
      setUserEmail('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-3 rounded-2xl border border-white/15 bg-black/35 p-3 text-xs text-slate-50 shadow-inner shadow-black/70"
    >
      <p className="text-[11px] font-semibold text-slate-100">
        Como está a limpeza desta sala agora?
      </p>

      {/* Botões de avaliação */}
      <div className="flex gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => setAvaliacao('OK')}
          className={`flex-1 rounded-full border px-3 py-1.5 transition ${
            avaliacao === 'OK'
              ? 'border-emerald-400/80 bg-emerald-500/30 text-emerald-50'
              : 'border-white/20 bg-black/40 text-slate-200 hover:border-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          ✅ Tudo ok
        </button>
        <button
          type="button"
          onClick={() => setAvaliacao('PROBLEMA')}
          className={`flex-1 rounded-full border px-3 py-1.5 transition ${
            avaliacao === 'PROBLEMA'
              ? 'border-amber-400/80 bg-amber-500/25 text-amber-50'
              : 'border-white/20 bg-black/40 text-slate-200 hover:border-amber-300/80 hover:text-amber-100'
          }`}
        >
          ⚠️ Tem problema
        </button>
      </div>

      {/* Comentário */}
      <div className="space-y-1">
        <p className="text-[11px] text-slate-200">
          Conte brevemente o que você viu (opcional, mas ajuda muito):
        </p>
        <textarea
          className="min-h-[72px] w-full rounded-2xl border border-white/20 bg-black/30 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
          placeholder="Ex: lixeira cheia, banheiro sem papel, chão escorregadio, etc."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      {/* E-mail opcional */}
      <div className="space-y-1">
        <p className="text-[11px] text-slate-300">
          Seu e-mail (opcional, caso a equipe precise retornar):
        </p>
        <input
          className="w-full rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
          placeholder="seu.email@tgroup.com.br"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>

      {/* Mensagens */}
      {error && (
        <p className="text-[11px] text-red-300">
          {error}
        </p>
      )}
      {message && (
        <p className="text-[11px] text-emerald-300">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? 'Enviando...' : 'Enviar feedback'}
      </button>
    </form>
  )
}
