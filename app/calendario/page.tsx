// app/calendario/page.tsx
import Link from 'next/link'

const HR_OPS_CALENDAR_URL = 'https://exemplo-sua-url-do-calendario.com' // depois você troca

export default function CalendarioPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Calendário do mês</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        O calendário de ações do T Group fica centralizado na plataforma HR Ops / Intranet.
      </p>

      <a
        href={HR_OPS_CALENDAR_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center justify-center rounded-2xl border border-amber-300/60 bg-amber-400/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-md"
      >
        Abrir calendário do mês
      </a>
    </div>
  )
}
