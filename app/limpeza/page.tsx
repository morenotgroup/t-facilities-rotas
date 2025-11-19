// app/limpeza/page.tsx
import Link from 'next/link'

export default function LimpezaPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Limpeza – Rota do dia</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Nesta tela, o time de limpeza vai ver apenas a rota do dia, com as salas e
        check-ins de limpeza.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Em breve vamos substituir este texto por:
        <ul className="mt-1 list-disc pl-4">
          <li>Lista de ambientes da rota de hoje;</li>
          <li>Botão para registrar limpeza de cada sala;</li>
          <li>Status visual de concluído/pendente.</li>
        </ul>
      </div>
    </div>
  )
}
