// app/admin/rotas/data.ts

export type DiaSemana = 1 | 2 | 3 | 4 | 5 // seg a sex

export type RotaModelo = {
  id: string
  diaSemana: DiaSemana
  colaboradorNome: string
  colaboradorEmail: string
  turno: 'Manhã' | 'Tarde'
  ambientes: {
    idAmbiente: string
    nomeAmbiente: string
    ordem: number
    prioridade: 'Alta' | 'Média' | 'Baixa'
  }[]
}

export const rotasModeloFake: RotaModelo[] = [
  {
    id: 'seg-giulia-manha',
    diaSemana: 1,
    colaboradorNome: 'Giulia Costa',
    colaboradorEmail: 'giulia@tgroup.com.br',
    turno: 'Manhã',
    ambientes: [
      {
        idAmbiente: 'amb-1',
        nomeAmbiente: 'Recepção',
        ordem: 1,
        prioridade: 'Alta',
      },
      {
        idAmbiente: 'amb-2',
        nomeAmbiente: 'Sala GC',
        ordem: 2,
        prioridade: 'Média',
      },
    ],
  },
  {
    id: 'seg-mateus-manha',
    diaSemana: 1,
    colaboradorNome: 'Mateus',
    colaboradorEmail: 'mateus@tgroup.com.br',
    turno: 'Manhã',
    ambientes: [
      {
        idAmbiente: 'amb-3',
        nomeAmbiente: 'Backyard 209',
        ordem: 1,
        prioridade: 'Alta',
      },
      {
        idAmbiente: 'amb-4',
        nomeAmbiente: 'Banheiro Social Térreo',
        ordem: 2,
        prioridade: 'Alta',
      },
    ],
  },
  {
    id: 'ter-giulia-manha',
    diaSemana: 2,
    colaboradorNome: 'Giulia Costa',
    colaboradorEmail: 'giulia@tgroup.com.br',
    turno: 'Manhã',
    ambientes: [
      {
        idAmbiente: 'amb-2',
        nomeAmbiente: 'Sala GC',
        ordem: 1,
        prioridade: 'Alta',
      },
      {
        idAmbiente: 'amb-4',
        nomeAmbiente: 'Banheiro Social Térreo',
        ordem: 2,
        prioridade: 'Média',
      },
    ],
  },
]