// app/compras/data.ts
export type StatusPedido = 'ABERTO' | 'EM_COMPRA' | 'CONCLUIDO'

export type PedidoCompra = {
  id: string
  categoria: 'LIMPEZA' | 'COZINHA'
  criadoPor: string
  criadoEmISO: string
  status: StatusPedido
  itens: { nome: string; quantidade?: string; urgencia?: 'Alta' | 'Média' | 'Baixa' }[]
}

export const pedidosFake: PedidoCompra[] = [
  {
    id: 'ped-1',
    categoria: 'LIMPEZA',
    criadoPor: 'Giulia',
    criadoEmISO: new Date().toISOString(),
    status: 'ABERTO',
    itens: [
      { nome: 'Detergente neutro', quantidade: '5 unidades', urgencia: 'Alta' },
      { nome: 'Pano de chão', quantidade: '10 unidades', urgencia: 'Média' },
    ],
  },
  {
    id: 'ped-2',
    categoria: 'COZINHA',
    criadoPor: 'Adriana',
    criadoEmISO: new Date().toISOString(),
    status: 'EM_COMPRA',
    itens: [{ nome: 'Arroz 5kg', quantidade: '3 sacos', urgencia: 'Média' }],
  },
]
