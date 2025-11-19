// app/admin/ambientes/page.tsx
import Link from 'next/link'

export default function AdminAmbientesPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">
          Administração – Ambientes da casa
        </p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Nesta área, o líder de Facilities e o super admin vão cadastrar as salas e espaços
        da sede do T Group.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Futuramente:
        <ul className="mt-1 list-disc pl-4">
          <li>Lista de todos os ambientes cadastrados;</li>
          <li>Formulário para criar/editar um ambiente;</li>
          <li>Slug para QR Code e foto de referência.</li>
        </ul>
      </div>
    </div>
  )
}