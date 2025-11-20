// app/cozinha/data.ts

export type CardapioDia = {
  dataISO: string
  prato: string
  acompanhamentos?: string
  sobremesa?: string
  observacoes?: string
}

export type RotinaCozinha = {
  id: string
  titulo: string
  descricao: string
  tipo: 'DIARIA' | 'SEMANAL'
}

const hoje = new Date()
const hojeISO = hoje.toISOString()

export const cardapioHojeFake: CardapioDia = {
  dataISO: hojeISO,
  prato: 'Arroz, feijão, frango grelhado',
  acompanhamentos: 'Salada verde, legumes refogados',
  sobremesa: 'Gelatina',
  observacoes: 'Contém carne e lactose.',
}

export const cardapioSemanaFake: CardapioDia[] = [
  cardapioHojeFake,
  {
    dataISO: new Date(hoje.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    prato: 'Macarrão ao sugo com carne moída',
    acompanhamentos: 'Salada de folhas, legumes salteados',
    sobremesa: 'Fruta da estação',
    observacoes: 'Contém glúten.',
  },
  {
    dataISO: new Date(hoje.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    prato: 'Strogonoff de frango',
    acompanhamentos: 'Arroz branco, batata palha, salada',
    sobremesa: 'Pudim',
    observacoes: 'Contém lactose.',
  },
]

export const rotinasCozinhaFake: RotinaCozinha[] = [
  {
    id: 'rot-1',
    titulo: 'Rotina diária – Antes do almoço',
    descricao:
      'Verificar fogão, bancadas, pias e geladeira; garantir que não haja louça acumulada; conferir se há sabão e papel toalha.',
    tipo: 'DIARIA',
  },
  {
    id: 'rot-2',
    titulo: 'Rotina diária – Depois do almoço',
    descricao:
      'Lavar todas as panelas e utensílios, limpar fogão, passar pano úmido no chão e conferir lixeira da cozinha.',
    tipo: 'DIARIA',
  },
  {
    id: 'rot-3',
    titulo: 'Rotina semanal – Sexta-feira',
    descricao:
      'Limpeza profunda da geladeira (por dentro e por fora), forno e micro-ondas; organizar armários e descartar alimentos vencidos.',
    tipo: 'SEMANAL',
  },
]