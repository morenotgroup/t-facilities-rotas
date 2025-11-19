// app/guia/page.tsx
import Link from 'next/link'

export default function GuiaPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Guia de Facilities</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Aqui vão ficar os manuais, PDFs e orientações de limpeza, cozinha e uso da casa.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Por enquanto esta tela é só um rascunho visual. Em breve vamos listar os documentos
        reais do guia de Facilities.
      </div>
    </div>
  )
}
