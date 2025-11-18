'use client'

import { useState } from 'react'

type AmbienteDTO = {
  id: string
  nome: string
  andar: string | null
  bloco: string | null
  tipo: string | null
  slugQr: string
  frequenciaPadrao: string | null
  ativo: boolean
}

type Props = {
  initialAmbientes: AmbienteDTO[]
}

export function AmbientesAdmin({ initialAmbientes }: Props) {
  const [ambientes, setAmbientes] = useState<AmbienteDTO[]>(initialAmbientes)
  const [creating, setCreating] = useState(false)
  const [createForm, setCreateForm] = useState({
    nome: '',
    andar: '',
    bloco: '',
    tipo: '',
    slugQr: '',
    frequenciaPadrao: '',
    ativo: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<AmbienteDTO>>({})
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setCreating(true)
    try {
      const res = await fetch('/api/ambientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao criar ambiente.')
      }
      const novo = (await res.json()) as AmbienteDTO
      setAmbientes((prev) => [...prev, novo])
      setCreateForm({
        nome: '',
        andar: '',
        bloco: '',
        tipo: '',
        slugQr: '',
        frequenciaPadrao: '',
        ativo: true,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const startEdit = (ambiente: AmbienteDTO) => {
    setEditingId(ambiente.id)
    setEditForm(ambiente)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleEditSave = async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`/api/ambientes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao atualizar ambiente.')
      }
      const atualizado = (await res.json()) as AmbienteDTO
      setAmbientes((prev) =>
        prev.map((a) => (a.id === id ? atualizado : a)),
      )
      setEditingId(null)
      setEditForm({})
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este ambiente?')) return
    setError(null)
    try {
      const res = await fetch(`/api/ambientes/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Erro ao remover ambiente.')
      }
      setAmbientes((prev) => prev.filter((a) => a.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-4">
      {/* Form de criação */}
      <section className="rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-slate-50 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Cadastro de ambientes
        </p>
        <p className="mt-1 text-[11px] text-slate-200">
          Use este painel para criar e ajustar os ambientes que terão QR Code e rota
          de limpeza.
        </p>

        <form
          onSubmit={handleCreate}
          className="mt-3 grid gap-2 text-[11px] md:grid-cols-2"
        >
          <div className="space-y-1">
            <label className="block text-slate-200">Nome*</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.nome}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, nome: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Slug QR* (URL)</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.slugQr}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, slugQr: e.target.value }))
              }
              placeholder="ex: sala-gc, recepcao, backyard-209"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Andar</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.andar}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, andar: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Bloco</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.bloco}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, bloco: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Tipo</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.tipo}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, tipo: e.target.value }))
              }
              placeholder="ex: Escritório, Área externa, Banheiro..."
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-200">Frequência padrão</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
              value={createForm.frequenciaPadrao}
              onChange={(e) =>
                setCreateForm((prev) => ({
                  ...prev,
                  frequenciaPadrao: e.target.value,
                }))
              }
              placeholder="ex: Diária, 2x por semana..."
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              id="ativo"
              type="checkbox"
              checked={createForm.ativo}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, ativo: e.target.checked }))
              }
            />
            <label
              htmlFor="ativo"
              className="text-[11px] text-slate-200"
            >
              Ambiente ativo
            </label>
          </div>

          <div className="mt-4 flex items-end justify-end md:col-span-2">
            <button
              type="submit"
              disabled={creating}
              className="rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? 'Criando...' : 'Criar ambiente'}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-2 text-[11px] text-red-300">
            {error}
          </p>
        )}
      </section>

      {/* Lista de ambientes */}
      <section className="rounded-2xl border border-white/15 bg-black/40 p-4 text-xs text-slate-50 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Ambientes cadastrados
        </p>
        <div className="mt-3 space-y-2">
          {ambientes.length === 0 && (
            <p className="text-[11px] text-slate-300">
              Nenhum ambiente cadastrado ainda.
            </p>
          )}

          {ambientes.map((a) => {
            const isEditing = editingId === a.id

            if (isEditing) {
              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-amber-400/50 bg-black/60 p-3 text-[11px]"
                >
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-slate-200">Nome</label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.nome ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            nome: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-200">Slug QR</label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.slugQr ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            slugQr: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-200">Andar</label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.andar ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            andar: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-200">Bloco</label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.bloco ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            bloco: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-200">Tipo</label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.tipo ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            tipo: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-200">
                        Frequência padrão
                      </label>
                      <input
                        className="w-full rounded-xl border border-white/20 bg-black/35 px-3 py-2 text-[11px] text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-300/80"
                        value={editForm.frequenciaPadrao ?? ''}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            frequenciaPadrao: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <input
                        id={`ativo-${a.id}`}
                        type="checkbox"
                        checked={editForm.ativo ?? a.ativo}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            ativo: e.target.checked,
                          }))
                        }
                      />
                      <label
                        htmlFor={`ativo-${a.id}`}
                        className="text-[11px] text-slate-200"
                      >
                        Ambiente ativo
                      </label>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSave(a.id)}
                      className="rounded-xl bg-emerald-500/80 px-3 py-1.5 text-[11px] font-semibold text-slate-950 hover:brightness-110"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-xl bg-slate-600/80 px-3 py-1.5 text-[11px] font-semibold text-slate-50 hover:brightness-110"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={a.id}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-white/15 bg-black/55 p-3 text-[11px] md:flex-row md:items-center"
              >
                <div>
                  <p className="text-[12px] font-semibold text-slate-50">
                    {a.nome}
                  </p>
                  <p className="text-[10px] text-slate-300">
                    Slug: <span className="font-mono">{a.slugQr}</span>
                  </p>
                  <p className="text-[10px] text-slate-300">
                    {a.andar ?? 'Sem andar'} • {a.bloco ?? 'Sem bloco'} •{' '}
                    {a.tipo ?? 'Sem tipo'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Frequência: {a.frequenciaPadrao ?? 'não definida'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      a.ativo
                        ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/60'
                        : 'bg-slate-500/20 text-slate-100 border border-slate-400/60'
                    }`}
                  >
                    {a.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <button
                    type="button"
                    onClick={() => startEdit(a)}
                    className="rounded-full border border-amber-300/70 bg-black/40 px-3 py-1 text-[10px] text-amber-100 hover:border-amber-200 hover:text-amber-50"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="rounded-full border border-red-400/70 bg-black/40 px-3 py-1 text-[10px] text-red-200 hover:border-red-200 hover:text-red-50"
                  >
                    Remover
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
