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
  ativo: boolean
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
    fotoUrl: '',
    ativo: true,
  },
  {
    id: 'amb-2',
    nome: 'Sala GC',
    andar: '1º andar',
    bloco: 'Sede',
    tipo: 'Escritório',
    slug: 'sala-gc',
    frequenciaPadrao: '2x_dia',
    fotoUrl: '',
    ativo: true,
  },
  {
    id: 'amb-3',
    nome: 'Backyard 209',
    andar: 'Fundos',
    bloco: 'Sede',
    tipo: 'Área externa',
    slug: 'backyard-209',
    frequenciaPadrao: '1x_dia',
    fotoUrl: '',
    ativo: true,
  },
  {
    id: 'amb-4',
    nome: 'Banheiro Social Térreo',
    andar: 'Térreo',
    bloco: 'Sede',
    tipo: 'Banheiro',
    slug: 'banheiro-social-terreo',
    frequenciaPadrao: '3x_dia',
    fotoUrl: '',
    ativo: true,
  },
]

export function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}