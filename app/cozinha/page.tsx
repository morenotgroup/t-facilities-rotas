'use client'

import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import {
  cardapioHojeFake,
  cardapioSemanaFake,
  rotinasCozinhaFake,
  CardapioDia,
} from './data'

function formatDateBrDiaSemana(iso: string) {
  const d = new Date(iso)
  return d
    .toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    })
    .replace('-feira', '')
    .replace(/\b./, (c) => c.toUpperCase())
}

export default function CozinhaPage() {
  const user = mockCurrentUser
  const isCozinha =
    user.role === 'COZINHA' ||
    user.role === 'LIDER_FACILITIES' ||
    user.role === 'SUPER_ADMIN'

  // pra v1 vamos deixar o form só conceitual; nada é salvo ainda
  const cardapioHoje: CardapioDia = cardapioHojeFake
  const cardapioSemana: CardapioDia[] = cardapioSemanaFake

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Cozinha – Cardápio & Rotinas
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/10 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
          Alimentar também é cuidar
        </p>
        <p className="mt-1 text-[11px] text-amber-100/90">
          Aqui ficam o cardápio do dia, o planejamento da semana e as rotinas de limpeza
          da cozinha. Tudo pensado pra deixar a casa organizada e o almoço mais leve.
        </p>
      </section>

      {/* Cardápio de hoje */}
      <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-xs text-emerald-50 backdrop-blur">
        <p className="text-[11px] font-semibold text-emerald-50">
          Cardápio de hoje – {formatDateBrDiaSemana(cardapioHoje.dataISO)}
        </p>
        <div className="mt-2 space-y-1 text-[11px]">
          <p>
            <span className="font-semibold">Prato principal: </span>
            {cardapioHoje.prato}
          </p>
          {cardapioHoje.acompanhamentos && (
            <p>
              <span className="font-semibold">Acompanhamentos: </span>
              {cardapioHoje.acompanhamentos}
            </p>
          )}
          {cardapioHoje.sobremesa && (
            <p>
              <span className="font-semibold">Sobremesa: </span>
              {cardapioHoje.sobremesa}
            </p>
          )}
          {cardapioHoje.observacoes && (
            <p className="mt-1 text-[11px] text-emerald-100/80">
              <span className="font-semibold">Observações: </span>
              {cardapioHoje.observacoes}
            </p>
          )}
        </div>
        {!isCozinha && (
          <p className="mt-2 text-[10px] text-emerald-100/70">
            * Qualquer dúvida sobre o cardápio, fale com a cozinha ou com Gente e Cultura.
          </p>
        )}
      </section>

      {/* Cardápio da semana – leitura pra todos, edição só pra cozinha na v2 */}
      <section className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/6 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[11px] font-semibold text-slate-50">
          Planejamento da semana
        </p>
        <p className="text-[11px] text-slate-200/80">
          Essa visão ajuda o time a se programar, entender variedade e restrições
          alimentares ao longo da semana.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          {cardapioSemana.map((dia) => (
            <div
              key={dia.dataISO}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-2 text-[11px]"
            >
              <p className="font-semibold text-slate-50">
                {formatDateBrDiaSemana(dia.dataISO)}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Prato: </span>
                {dia.prato}
              </p>
              {dia.acompanhamentos && (
                <p>
                  <span className="font-semibold">Acomp.: </span>
                  {dia.acompanhamentos}
                </p>
              )}
              {dia.sobremesa && (
                <p>
                  <span className="font-semibold">Sobremesa: </span>
                  {dia.sobremesa}
                </p>
              )}
              {dia.observacoes && (
                <p className="mt-1 text-[10px] text-slate-200/80">
                  Obs: {dia.observacoes}
                </p>
              )}
            </div>
          ))}
        </div>

        {isCozinha && (
          <p className="mt-2 text-[10px] text-amber-200/80">
            Na próxima versão, essa área vai ter um formulário pra você atualizar o
            cardápio direto do app. Por enquanto é só leitura, usando dados de teste.
          </p>
        )}
      </section>

      {/* Rotinas de limpeza da cozinha */}
      <section className="mb-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/6 p-3 text-xs text-slate-100 backdrop-blur">
        <p className="text-[11px] font-semibold text-slate-50">
          Rotinas de limpeza da cozinha
        </p>
        <p className="text-[11px] text-slate-200/80">
          São as combinações mínimas pra manter a cozinha organizada, segura e pronta
          pro próximo dia.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          {rotinasCozinhaFake.map((rotina) => (
            <div
              key={rotina.id}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-2 text-[11px]"
            >
              <p className="font-semibold text-slate-50">{rotina.titulo}</p>
              <p className="mt-1 text-slate-100/85">{rotina.descricao}</p>
              <span className="mt-1 inline-flex rounded-full bg-white/10 px-2 py-[2px] text-[10px] text-slate-100/80">
                {rotina.tipo === 'DIARIA' ? 'Rotina diária' : 'Rotina semanal'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}