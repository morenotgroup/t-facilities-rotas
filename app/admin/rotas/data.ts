// app/admin/rotas/data.ts
export type RotaModelo = {
  id: string
  diaSemana: number // 1 a 5 (seg a sex)
  colaboradorNome: string
  colaboradorEmail: string
  turno: 'Manhã' | 'Tarde'
  ambientes: { idAmbiente: string; nomeAmbiente: string; ordem: number }[]
}

export const rotasModeloFake: RotaModelo[] = [
  {
    id: 'rota-seg-giulia',
    diaSemana: 1,
    colaboradorNome: 'Giulia',
    colaboradorEmail: 'giulia@tgroup.com.br',
    turno: 'Manhã',
    ambientes: [
      { idAmbiente: 'amb-1', nomeAmbiente: 'Recepção', ordem: 1 },
      { idAmbiente: 'amb-2', nomeAmbiente: 'Sala GC', ordem: 2 },
    ],
  },
  {
    id: 'rota-seg-mateus',
    diaSemana: 1,
    colaboradorNome: 'Mateus',
    colaboradorEmail: 'mateus@tgroup.com.br',
    turno: 'Manhã',
    ambientes: [{ idAmbiente: 'amb-3', nomeAmbiente: 'Backyard 209', ordem: 1 }],
  },
]
