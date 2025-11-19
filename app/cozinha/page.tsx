// app/cozinha/page.tsx
import Link from 'next/link'

export default function CozinhaPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Cozinha – Cardápio & Rotinas</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Aqui a Adriana vai cadastrar o cardápio do dia e da semana, além das rotinas de
        limpeza da cozinha.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Em breve:
        <ul className="mt-1 list-disc pl-4">
          <li>Formulário para o cardápio de hoje e da semana;</li>
          <li>Blocos de texto com as rotinas de limpeza por horário e dia;</li>
          <li>Visual simples pensado para uso direto no celular da cozinha.</li>
        </ul>
      </div>
    </div>
  )
}
