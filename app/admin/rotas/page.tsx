// app/admin/rotas/page.tsx
import Link from 'next/link'

export default function AdminRotasPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Administração – Rotas de limpeza
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Aqui o líder de Facilities vai definir rotas por dia da semana e equilibrar a
        quantidade de ambientes por colaborador.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Em breve:
        <ul className="mt-1 list-disc pl-4">
          <li>Cadastro de rota por dia (segunda a sexta);</li>
          <li>Lista de ambientes com ordem e prioridade;</li>
          <li>Indicador de quantas salas cada pessoa tem em cada dia.</li>
        </ul>
      </div>
    </div>
  )
}
