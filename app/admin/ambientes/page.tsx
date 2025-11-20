'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import { ambientesFake, Ambiente, gerarSlug } from './data'

export default function AdminAmbientesPage() {
  const user = mockCurrentUser
  const isAdmin =
    user.role === 'LIDER_FACILITIES' || user.role === 'SUPER_ADMIN'

  const [ambientes, setAmbientes] = useState<Ambiente[]>(ambientesFake)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)

  // estados do form de novo ambiente
  const [nome, setNome] = useState('')
  const [andar, setAndar] = useState('')
  const [bloco, setBloco] = useState('')
  const [tipo, setTipo] = useState('')
  const [slugManual, setSlugManual] = useState('')
  const [freq, setFreq] = useState('1x_dia')

  const handleAddAmbiente = () => {
    if (!nome.trim()) {
      alert('Informe o nome do ambiente.')
      return
    }

    const slug =
      slugManual.trim() !== '' ? slugManual.trim() : gerarSlug(nome.trim())

    const novo: Ambiente = {
      id: `amb-${Date.now()}`,
      nome: nome.trim(),
      andar: andar.trim() || undefined,
      bloco: bloco.trim() || undefined,
      tipo: tipo.trim() || undefined,
      slug,
      frequenciaPadrao: freq,
      fotoUrl: '',
      ativo: true,
    }

    setAmbientes((prev) => [...prev, novo])
    setNome('')
    setAndar('')
    setBloco('')
    setTipo('')
    setSlugManual('')
    setFreq('1x_dia')

    alert(
      'Ambiente criado (demo). Na versão com banco isso será salvo de forma permanente.',
    )
  }

  const handleToggleAtivo = (id: string) => {
    setAmbientes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ativo: !a.ativo : !a.ativo } : a)),
    )
  }

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Administração – Ambientes da casa
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Essa área centraliza todos os espaços da sede do T Group. Esses ambientes serão
        usados nas rotas de limpeza e nos futuros QR Codes de cada sala.
      </p>

      {/* Lista de ambientes */}
      <section className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/6 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[11px] font-semibold text-slate-50">
          Ambientes cadastrados
        </p>

        {ambientes.length === 0 && (
          <p className="mt-1 text-[11px] text-slate-200/80">
            Nenhum ambiente cadastrado ainda.
          </p>
        )}

        <div className="mt-2 flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
          {ambientes.map((amb) => (
            <div
              key={amb.id}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-2 text-[11px]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{amb.nome}</p>
                  <p className="text-[10px] text-slate-300">
                    {amb.andar || 'Andar não informado'} •{' '}
                    {amb.bloco || 'Bloco não informado'} •{' '}
                    {amb.tipo || 'Tipo não informado'}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-300">
                    Slug:{' '}
                    <span className="font-mono text-[10px] text-slate-100">
                      {amb.slug}
                    </span>
                  </p>
                  {amb.frequenciaPadrao && (
                    <p className="text-[10px] text-slate-300">
                      Frequência padrão:{' '}
                      <span className="font-semibold">
                        {amb.frequenciaPadrao.replace('_', ' ')}
                      </span>
                    </p>
                  )}
                  <p className="mt-1 text-[10px]">
                    Status:{' '}
                    <span
                      className={
                        amb.ativo
                          ? 'font-semibold text-emerald-200'
                          : 'font-semibold text-slate-400'
                      }
                    >
                      {amb.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-[10px]">
                  <span className="rounded-full bg-white/10 px-2 py-[2px] text-slate-100/80">
                    ID: {amb.id}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleToggleAtivo(amb.id)}
                      className="rounded-full border border-white/20 bg-white/10 px-2 py-[2px] text-[10px] hover:bg-white/20"
                    >
                      {amb.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form de novo ambiente – apenas admin/líder vê */}
      {isAdmin && (
        <section className="mb-2 rounded-2xl border border-white/15 bg-white/8 p-3 text-xs text-slate-100 backdrop-blur">
          <p className="text-[11px] font-semibold text-slate-50">
            Cadastrar novo ambiente
          </p>
          <p className="mt-1 text-[11px] text-slate-200/80">
            Use sempre nomes claros e, se possível, padronize andar, bloco e tipo pra
            facilitar a leitura em relatórios.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <label className="text-[10px] font-medium text-slate-200">
              Nome do ambiente
            </label>
            <input
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Sala GC, Recepção, Banheiro Social Térreo..."
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Andar (opcional)
            </label>
            <input
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={andar}
              onChange={(e) => setAndar(e.target.value)}
              placeholder="Ex.: Térreo, 1º andar"
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Bloco / referência (opcional)
            </label>
            <input
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={bloco}
              onChange={(e) => setBloco(e.target.value)}
              placeholder="Ex.: Sede, Fundos, Casa 2..."
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Tipo de ambiente (opcional)
            </label>
            <input
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Ex.: Escritório, Banheiro, Cozinha, Área externa..."
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Slug (opcional)
              <span className="ml-1 text-[10px] text-slate-400">
                Se deixar em branco, geramos automaticamente a partir do nome.
              </span>
            </label>
            <input
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] font-mono text-slate-50"
              value={slugManual}
              onChange={(e) => setSlugManual(e.target.value)}
              placeholder="Ex.: sala-gc, recepcao-sede..."
            />

            <label className="mt-2 text-[10px] font-medium text-slate-200">
              Frequência padrão de limpeza
            </label>
            <select
              className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-2 py-1 text-[11px] text-slate-50"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
            >
              <option value="1x_dia">1x por dia</option>
              <option value="2x_dia">2x por dia</option>
              <option value="3x_dia">3x por dia</option>
              <option value="1x_semana">1x por semana</option>
            </select>

            <button
              type="button"
              onClick={handleAddAmbiente}
              className="mt-3 w-full rounded-xl bg-amber-400 px-3 py-2 text-[11px] font-semibold text-slate-900 shadow hover:bg-amber-300"
            >
              Cadastrar ambiente (demo)
            </button>
          </div>
        </section>
      )}
    </div>
  )
}