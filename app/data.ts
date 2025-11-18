// app/data.ts

export type Ambiente = {
  id: string
  nome: string
  andar?: string
  bloco?: string
  tipo?: string
  slug: string
}

export type ItemRota = {
  id: string
  ordem: number
  prioridade: 'Alta' | 'Média' | 'Baixa'
  checklist?: string
  ambienteId: string
}

export type Rota = {
  id: string
  dataISO: string
  turno: 'Manhã' | 'Tarde' | 'Noite'
  colaboradorEmail: string
  colaboradorNome: string
  obsGeral?: string
  itens: ItemRota[]
}

export const ambientes: Ambiente[] = [
  {
    id: 'amb-1',
    nome: 'Recepção',
    andar: 'Térreo',
    bloco: 'Sede',
    tipo: 'Recepção',
    slug: 'recepcao-sede',
  },
  {
    id: 'amb-2',
    nome: 'Sala GC',
    andar: '1º andar',
    bloco: 'Sede',
    tipo: 'Escritório',
    slug: 'sala-gc',
  },
  {
    id: 'amb-3',
    nome: 'Backyard 209',
    andar: 'Fundos',
    bloco: 'Sede',
    tipo: 'Área externa',
    slug: 'backyard-209',
  },
]

const hojeISO = new Date().toISOString()

export const rotas: Rota[] = [
  {
    id: 'rota-moreno',
    dataISO: hojeISO,
    turno: 'Manhã',
    colaboradorEmail: 'gc@agenciataj.com',
    colaboradorNome: 'Moreno (teste)',
    obsGeral: 'Rota de testes para o app.',
    itens: [
      {
        id: 'item-1',
        ordem: 1,
        prioridade: 'Alta',
        checklist: 'Varredura, superfícies, lixeira, maçanetas',
        ambienteId: 'amb-1',
      },
      {
        id: 'item-2',
        ordem: 2,
        prioridade: 'Média',
        checklist: 'Mesa, cadeiras, lixeira, pó',
        ambienteId: 'amb-2',
      },
      {
        id: 'item-3',
        ordem: 3,
        prioridade: 'Alta',
        checklist: 'Chão, mesas externas, lixo',
        ambienteId: 'amb-3',
      },
    ],
  },
]

// Histórico de limpeza fake
export const ultimoStatusPorAmbiente: Record<
  string,
  {
    dataHoraISO: string
    responsavel: string
    status: 'LIMPO' | 'PENDENTE' | 'EM_ANDAMENTO'
    observacoes?: string
  }
> = {
  'amb-1': {
    dataHoraISO: hojeISO,
    responsavel: 'Angélica Costa',
    status: 'LIMPO',
    observacoes: 'Tudo ok na recepção.',
  },
  'amb-2': {
    dataHoraISO: hojeISO,
    responsavel: 'Giulia Costa',
    status: 'PENDENTE',
    observacoes: 'Aguardando retirada de caixas.',
  },
  'amb-3': {
    dataHoraISO: hojeISO,
    responsavel: 'Moreno (teste)',
    status: 'LIMPO',
  },
}
