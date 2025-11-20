// app/limpeza/data.ts

export type StatusLimpeza = 'LIMPO' | 'PENDENTE' | 'EM_ANDAMENTO'

export type Ambiente = {
  id: string
  nome: string
  andar?: string
  bloco?: string
  tipo?: string
  slug: string
  fotoUrl?: string
}

export type ItemRota = {
  id: string
  ordem: number
  prioridade: 'Alta' | 'Média' | 'Baixa'
  checklist?: string
  ambienteId: string
}

export type RotaDia = {
  id: string
  dataISO: string
  diaSemana: number // 1=Seg ... 7=Dom
  turno: 'Manhã' | 'Tarde'
  colaboradorNome: string
  colaboradorEmail: string
  itens: ItemRota[]
}

// ---- AMBIENTES DA CASA (FAKE) ----

export const ambientesLimpeza: Ambiente[] = [
  {
    id: 'amb-1',
    nome: 'Recepção',
    andar: 'Térreo',
    bloco: 'Sede',
    tipo: 'Recepção',
    slug: 'recepcao-sede',
    fotoUrl: undefined,
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
  {
    id: 'amb-4',
    nome: 'Banheiro Social Térreo',
    andar: 'Térreo',
    bloco: 'Sede',
    tipo: 'Banheiro',
    slug: 'banheiro-social-terreo',
  },
]

// ---- ROTAS DIÁRIAS (FAKE) ----

// helper pra gerar ISO de hoje (é só pra fins de exibição)
const hoje = new Date()
const hojeISO = hoje.toISOString()
const diaSemana = hoje.getDay() === 0 ? 7 : hoje.getDay() // 1=Seg ... 7=Dom

export const rotasDiaFake: RotaDia[] = [
  {
    id: 'rota-giulia-manha',
    dataISO: hojeISO,
    diaSemana,
    turno: 'Manhã',
    colaboradorNome: 'Giulia Costa',
    colaboradorEmail: 'giulia@tgroup.com.br',
    itens: [
      {
        id: 'item-1',
        ordem: 1,
        prioridade: 'Alta',
        checklist: 'Varredura completa, balcão, maçanetas, lixeira',
        ambienteId: 'amb-1',
      },
      {
        id: 'item-2',
        ordem: 2,
        prioridade: 'Média',
        checklist: 'Mesas, cadeiras, pó em superfícies',
        ambienteId: 'amb-2',
      },
    ],
  },
  {
    id: 'rota-mateus-manha',
    dataISO: hojeISO,
    diaSemana,
    turno: 'Manhã',
    colaboradorNome: 'Mateus',
    colaboradorEmail: 'mateus@tgroup.com.br',
    itens: [
      {
        id: 'item-3',
        ordem: 1,
        prioridade: 'Alta',
        checklist: 'Chão, mesas externas, lixo e área da churrasqueira',
        ambienteId: 'amb-3',
      },
      {
        id: 'item-4',
        ordem: 2,
        prioridade: 'Alta',
        checklist: 'Pias, vaso, espelhos, reposição de papel e sabonete',
        ambienteId: 'amb-4',
      },
    ],
  },
  {
    id: 'rota-moreno-teste',
    dataISO: hojeISO,
    diaSemana,
    turno: 'Manhã',
    colaboradorNome: 'Moreno (teste)',
    colaboradorEmail: 'gc@agenciataj.com',
    itens: [
      {
        id: 'item-5',
        ordem: 1,
        prioridade: 'Alta',
        checklist: 'Recepção completa',
        ambienteId: 'amb-1',
      },
      {
        id: 'item-6',
        ordem: 2,
        prioridade: 'Média',
        checklist: 'Sala GC completa',
        ambienteId: 'amb-2',
      },
      {
        id: 'item-7',
        ordem: 3,
        prioridade: 'Alta',
        checklist: 'Backyard e área externa',
        ambienteId: 'amb-3',
      },
    ],
  },
]

// ---- FUNÇÕES AUXILIARES ----

export function getRotaDoDiaPorEmail(email: string): RotaDia | undefined {
  return rotasDiaFake.find(
    (r) => r.colaboradorEmail.toLowerCase() === email.toLowerCase(),
  )
}

export function getTodasRotasDoDia(): RotaDia[] {
  return rotasDiaFake
}

export function getAmbienteById(id: string): Ambiente | undefined {
  return ambientesLimpeza.find((a) => a.id === id)
}
