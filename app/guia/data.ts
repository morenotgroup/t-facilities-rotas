// app/guia/data.ts
export type DocumentoGuia = {
  id: string
  titulo: string
  descricao: string
  categoria: 'LIMPEZA' | 'COZINHA' | 'GERAL'
  url: string
  tipo: 'PDF' | 'VIDEO' | 'LINK'
}

export const documentosGuia: DocumentoGuia[] = [
  {
    id: 'doc-1',
    titulo: 'Manual de Limpeza – Banheiros',
    descricao: 'Passo a passo para limpeza completa dos banheiros da sede.',
    categoria: 'LIMPEZA',
    url: 'https://drive.google.com/SEU_LINK_AQUI',
    tipo: 'PDF',
  },
  {
    id: 'doc-2',
    titulo: 'Boas práticas na cozinha',
    descricao: 'Dicas de higiene, armazenamento e segurança na cozinha.',
    categoria: 'COZINHA',
    url: 'https://drive.google.com/OUTRO_LINK',
    tipo: 'PDF',
  },
  {
    id: 'doc-3',
    titulo: 'Vídeo – Tour pela casa T Group',
    descricao: 'Vídeo com visão geral dos espaços e regras de uso.',
    categoria: 'GERAL',
    url: 'https://www.youtube.com/SEU_VIDEO',
    tipo: 'VIDEO',
  },
]
