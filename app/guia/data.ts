// app/guia/data.ts

export type CategoriaGuia = 'LIMPEZA' | 'COZINHA' | 'GERAL'
export type TipoDocumento = 'PDF' | 'VIDEO' | 'LINK'

export type DocumentoGuia = {
  id: string
  titulo: string
  descricao: string
  categoria: CategoriaGuia
  url: string          // link do Drive, YouTube, etc.
  tipo: TipoDocumento  // controla o ícone/label
}

// ⚠️ MOCK – aqui você cadastra os materiais que já existem.
// Depois isso vira tabela no banco.
export const documentosGuia: DocumentoGuia[] = [
  {
    id: 'doc-1',
    titulo: 'Manual de Limpeza – Banheiros',
    descricao: 'Passo a passo para limpeza completa dos banheiros da sede.',
    categoria: 'LIMPEZA',
    url: 'https://drive.google.com/seu_pdf_banheiros',
    tipo: 'PDF',
  },
  {
    id: 'doc-2',
    titulo: 'Manual de Limpeza – Salas e escritórios',
    descricao: 'Orientações gerais para salas de trabalho, mesas e equipamentos.',
    categoria: 'LIMPEZA',
    url: 'https://drive.google.com/seu_pdf_salas',
    tipo: 'PDF',
  },
  {
    id: 'doc-3',
    titulo: 'Boas práticas na cozinha',
    descricao: 'Dicas de higiene, armazenamento e segurança na cozinha do T Group.',
    categoria: 'COZINHA',
    url: 'https://drive.google.com/seu_pdf_cozinha',
    tipo: 'PDF',
  },
  {
    id: 'doc-4',
    titulo: 'Vídeo – Tour pela casa T Group',
    descricao: 'Vídeo com visão geral dos espaços e regras de uso da casa.',
    categoria: 'GERAL',
    url: 'https://www.youtube.com/seu_video',
    tipo: 'VIDEO',
  },
  {
    id: 'doc-5',
    titulo: 'Checklist de abertura e fechamento da casa',
    descricao: 'Lista simples do que deve ser verificado ao abrir e fechar a sede.',
    categoria: 'GERAL',
    url: 'https://drive.google.com/seu_pdf_checklist',
    tipo: 'PDF',
  },
]