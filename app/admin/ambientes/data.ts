// app/admin/ambientes/data.ts
export type Ambiente = {
  id: string
  nome: string
  andar?: string
  bloco?: string
  tipo?: string
  slug: string
  frequenciaPadrao?: string
  fotoUrl?: string
}

export const ambientesFake: Ambiente[] = [
  {
    id: 'amb-1',
    nome: 'Recepção',
    andar: 'Térreo',
    bloco: 'Sede',
    tipo: 'Recepção',
    slug: 'recepcao-sede',
    frequenciaPadrao: '3x_dia',
  },
  {
    id: 'amb-2',
    nome: 'Sala GC',
    andar: '1º andar',
    bloco: 'Sede',
    tipo: 'Escritório',
    slug: 'sala-gc',
    frequenciaPadrao: '2x_dia',
  },
]
