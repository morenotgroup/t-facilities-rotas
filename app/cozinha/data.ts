// app/cozinha/data.ts
export type CardapioDia = {
  dataISO: string
  prato: string
  acompanhamentos?: string
  sobremesa?: string
  observacoes?: string
}

export const cardapioFake: CardapioDia = {
  dataISO: new Date().toISOString(),
  prato: 'Arroz, feijão, frango grelhado',
  acompanhamentos: 'Salada verde, legumes refogados',
  sobremesa: 'Gelatina',
  observacoes: 'Contém carne e lactose.',
}

export const rotinasCozinha = [
  {
    titulo: 'Rotina diária – Antes do almoço',
    descricao:
      'Verificar fogão, bancadas e pias; garantir que não haja louça acumulada; checar geladeira.',
  },
  {
    titulo: 'Rotina diária – Depois do almoço',
    descricao:
      'Lavar todas as panelas e utensílios usados, limpar fogão, passar pano úmido no chão da área da cozinha.',
  },
  {
    titulo: 'Rotina semanal – Sexta-feira',
    descricao:
      'Limpeza profunda de geladeira, forno e armários. Verificar validade dos alimentos.',
  },
]
