// app/guia/page.tsx
import Link from 'next/link'
import { documentosGuia, CategoriaGuia, TipoDocumento } from './data'

const labelsCategoria: Record<CategoriaGuia, string> = {
  LIMPEZA: 'Limpeza',
  COZINHA: 'Cozinha',
  GERAL: 'Geral da casa',
}

const corCategoria: Record<CategoriaGuia, string> = {
  LIMPEZA: 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40',
  COZINHA: 'bg-amber-500/20 text-amber-100 border-amber-400/40',
  GERAL: 'bg-sky-500/20 text-sky-100 border-sky-400/40',
}

const labelTipo: Record<TipoDocumento, string> = {
  PDF: 'PDF',
  VIDEO: 'Vídeo',
  LINK: 'Link',
}

const iconeTipo: Record<TipoDocumento, string> = {
  PDF: '📄',
  VIDEO: '🎥',
  LINK: '🔗',
}

export default function GuiaPage() {
  // Se quiser agrupar por categoria:
  const categorias: CategoriaGuia[] = ['LIMPEZA', 'COZINHA', 'GERAL']

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Guia de Facilities</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Esse espaço centraliza os materiais que ajudam o time de Facilities a cuidar da
        casa do T Group: manuais, checklists, vídeos e orientações rápidas.
      </p>

      <div className="mt-1 flex flex-col gap-4 pb-3">
        {categorias.map((categoria) => {
          const docsDaCategoria = documentosGuia.filter(
            (doc) => doc.categoria === categoria,
          )
          if (docsDaCategoria.length === 0) return null

          return (
            <section key={categoria} className="flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200/80">
                {labelsCategoria[categoria]}
              </p>

              <div className="flex flex-col gap-2">
                {docsDaCategoria.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100 backdrop-blur-md transition hover:border-amber-300/70 hover:bg-white/10 hover:shadow-lg"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400/90 text-lg shadow">
                      <span>{iconeTipo[doc.tipo]}</span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-semibold text-white">{doc.titulo}</p>
                      <p className="mt-1 text-[11px] text-slate-100/85">
                        {doc.descricao}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${corCategoria[doc.categoria]}`}
                        >
                          {labelsCategoria[doc.categoria]}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] text-slate-100/90">
                          {iconeTipo[doc.tipo]} {labelTipo[doc.tipo]}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-200/80 group-hover:text-amber-100">
                      Abrir
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}