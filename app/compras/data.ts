// app/compras/data.ts

export type CategoriaCompra = 'LIMPEZA' | 'COZINHA'
export type StatusPedido = 'ABERTO' | 'EM_COMPRA' | 'CONCLUIDO'

export type ItemPedido = {
  id: string
  nome: string
  quantidade?: string
  urgencia?: 'Alta' | 'Média' | 'Baixa'
}

export type PedidoCompra = {
  id: string
  categoria: CategoriaCompra
  criadoPor: string
  criadoPorEmail: string
  criadoEmISO: string
  status: StatusPedido
  itens: ItemPedido[]
  obsGeral?: string
}

// MOCK inicial – só pra tela não ficar vazia
export const pedidosFake: PedidoCompra[] = [
  {
    id: 'ped-1',
    categoria: 'LIMPEZA',
    criadoPor: 'Giulia',
    criadoPorEmail: 'giulia@tgroup.com.br',
    criadoEmISO: new Date().toISOString(),
    status: 'ABERTO',
    itens: [
      {
        id: 'item-1',
        nome: 'Detergente neutro',
        quantidade: '5 unidades',
        urgencia: 'Alta',
      },
      {
        id: 'item-2',
        nome: 'Pano de chão',
        quantidade: '10 unidades',
        urgencia: 'Média',
      },
    ],
    obsGeral: 'Estoque deve acabar até quarta-feira.',
  },
  {
    id: 'ped-2',
    categoria: 'COZINHA',
    criadoPor: 'Adriana',
    criadoPorEmail: 'adriana@tgroup.com.br',
    criadoEmISO: new Date().toISOString(),
    status: 'EM_COMPRA',
    itens: [
      {
        id: 'item-3',
        nome: 'Arroz 5kg',
        quantidade: '3 sacos',
        urgencia: 'Média',
      },
    ],
    obsGeral: 'Compra junto com outros itens do mercado.',
  },
]