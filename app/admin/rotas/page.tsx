'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import { rotasModeloFake, RotaModelo, DiaSemana } from './data'

const labelDiaSemana: Record<DiaSemana, string> = {
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
}

export default function AdminRotasPage() {
  const user = mockCurrentUser
  const isAdmin =
    user.role === 'LIDER_FACILITIES' || user.role === 'SUPER_ADMIN'

  const rotasPorDia = useMemo(() => {
    const mapa = new Map<DiaSemana, RotaModelo[]>()
    rotasModeloFake.forEach((rota) => {
      const arr = mapa.get(rota.diaSemana) ?? []
      arr.push(rota)
      mapa.set(rota.diaSemana, arr)
    })
    return mapa
  }, [])

  // cálculo de carga por colaborador (quantos ambientes em toda a semana)
  const cargaPorColaborador = useMemo(() => {
    const mapa = new Map<
      string,
      { nome: string; email: string; totalAmbientes: number }
    >()

    rotasModeloFake.forEach((rota) => {
      const key = rota.colaboradorEmail
      const atual = mapa.get(key) ?? {
        nome: rota.colaboradorNome,
        email: rota.colaboradorEmail,
        totalAmbientes: 0,
      }
      atual.totalAmbientes += rota.ambientes.length
      mapa.set(key, atual)
    })

    return Array.from(mapa.values()).sort(
      (a, b) => b.totalAmbientes - a.totalAmbientes,
    )
  }, [])

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Administração – Rotas de limpeza
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        As rotas modelo definem quais ambientes cada pessoa de Facilities cuida em cada
        dia da semana. Isso alimenta a rota diária que aparece no app de limpeza.
      </p>

      {/* Resumo de carga por colaborador */}
      <section className="rounded-2xl border border-white/10 bg-white/8 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[11px] font-semibold text-slate-50">
          Carga de ambientes por colaborador (semana)
        </p>
        <p className="mt-1 text-[11px] text-slate-200/80">
          Isso ajuda a identificar se alguém está sobrecarregado em comparação aos demais.
        </p>

        <div className="mt-2 flex flex-col gap-1">
          {cargaPorColaborador.map((carga) => (
            <div
              key={carga.email}
              className="flex items-center justify-between rounded-xl border border-white/12 bg-slate-950/40 px-2 py-1 text-[11px]"
            >
              <div>
                <p className="font-semibold text-slate-50">{carga.nome}</p>
                <p className="text-[10px] text-slate-300">{carga.email}</p>
              </div>
              <div className="text-right text-[10px]">
                <p className="font-semibold text-amber-200">
                  {carga.totalAmbientes} ambientes
                </p>
                <p className="text-slate-300">na semana</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rotas por dia */}
      <section className="mb-2 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/6 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[11px] font-semibold text-slate-50">
          Rotas por dia da semana
        </p>
        <p className="text-[11px] text-slate-200/80">
          Cada bloco representa as rotas planejadas para um dia. Em breve, essa tela vai
          permitir editar e criar novas rotas diretamente.
        </p>

        <div className="mt-2 flex flex-col gap-3">
          {([1, 2, 3, 4, 5] as DiaSemana[]).map((dia) => {
            const rotasDia = rotasPorDia.get(dia) ?? []
            return (
              <div
                key={dia}
                className="rounded-2xl border border-white/12 bg-slate-950/40 p-2"
              >
                <p className="text-[11px] font-semibold text-slate-50">
                  {labelDiaSemana[dia]}
                </p>

                {rotasDia.length === 0 ? (
                  <p className="mt-1 text-[11px] text-slate-300">
                    Nenhuma rota cadastrada para este dia.
                  </p>
                ) : (
                  <div className="mt-2 flex flex-col gap-2">
                    {rotasDia.map((rota) => (
                      <div
                        key={rota.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-2 text-[11px]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-white">
                              {rota.colaboradorNome}
                            </p>
                            <p className="text-[10px] text-slate-300">
                              {rota.colaboradorEmail} • Turno {rota.turno}
                            </p>
                          </div>
                          <div className="text-right text-[10px] text-slate-200">
                            <p className="font-semibold text-amber-200">
                              {rota.ambientes.length} ambientes
                            </p>
                            <p>na rota</p>
                          </div>
                        </div>

                        <div className="mt-1 space-y-1">
                          {rota.ambientes
                            .slice()
                            .sort((a, b) => a.ordem - b.ordem)
                            .map((amb) => (
                              <div
                                key={amb.idAmbiente}
                                className="flex items-start gap-2 text-[10px]"
                              >
                                <span className="mt-[2px] text-amber-200/90">•</span>
                                <div className="flex-1">
                                  <span className="font-semibold">{amb.nomeAmbiente}</span>
                                  <span className="text-slate-200"> – ordem {amb.ordem}</span>
                                  <span
                                    className={
                                      amb.prioridade === 'Alta'
                                        ? 'ml-1 rounded-full bg-red-500/20 px-2 py-[1px] text-[10px] text-red-100'
                                        : amb.prioridade === 'Média'
                                          ? 'ml-1 rounded-full bg-amber-500/20 px-2 py-[1px] text-[10px] text-amber-100'
                                          : 'ml-1 rounded-full bg-slate-500/20 px-2 py-[1px] text-[10px] text-slate-100'
                                    }
                                  >
                                    {amb.prioridade}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {isAdmin && (
          <p className="mt-1 text-[10px] text-amber-200/80">
            Na versão com banco, essa tela terá formulário para criar novas rotas, mover
            ambientes entre colaboradores e ajustar prioridades.
          </p>
        )}
      </section>
    </div>
  )
}